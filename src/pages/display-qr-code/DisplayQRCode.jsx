import { Grid, Typography } from "@mui/material";
import { nanoid } from "@reduxjs/toolkit";
import { Avatar, Divider, List, QRCode } from "antd";
import { useCallback, useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { devitrackApi } from "../../devitrakApi";
import { onAddPaymentIntent } from "../../store/slides/stripeSlide";
import _ from "lodash";
const DisplayQRCode = () => {
  const { consumer } = useSelector((state) => state.consumer);
  const { currentOrder } = useSelector((state) => state.deviceHandler);
  const { choice } = useSelector((state) => state.event);
  const { company } = useSelector((state) => state.company);
  const [qrCodeValue, setQrCodeValue] = useState(undefined);
  const paymentIntentValueRef = useRef(null);
  const nanoGenerated = useRef(false);
  const storingRef = useRef(true);
  const transactionRef = useRef(true);
  const count = useRef(0);
  const propsToPass = useRef({
    paymentIntentGenerated: "pi_" + nanoid(12),
    clientSecretGenerated: `_client_secret=${nanoid(12)}`,
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const payment_intent = new URLSearchParams(window.location.search).get(
    "payment_intent"
  );
  const clientSecret = new URLSearchParams(window.location.search).get(
    "payment_intent_client_secret"
  );
  const formattingConsumerInfo = () => {
    const template = {
      ...consumer,
      uid: formattingConsumerInfo().uid,
    };
    return template;
  };
  const foundTotalDeviceNumber = () => {
    const number = currentOrder?.map((total) => parseInt(total.deviceNeeded));
    return number.reduce((accumulator, current) => accumulator + current, 0);
  };

  useEffect(() => {
    const controller = new AbortController();
    foundTotalDeviceNumber();
    return () => {
      controller.abort();
    };
  }, []);

  const storeStripePaymentIntent = useCallback(async () => {
    const stripeTransactionProfile = {
      paymentIntent: payment_intent,
      clientSecret: clientSecret,
      device: foundTotalDeviceNumber(),
      user: formattingConsumerInfo().uid,
      provider: company.company_name,
      eventSelected: choice,
      company: company.id,
    };
    await devitrackApi.post(
      "/stripe/stripe-transaction",
      stripeTransactionProfile
    );
  }, []);

  const generatePaymentIntentForNoDepositRequired = useCallback(async () => {
    const stripeTransactionProfile = {
      paymentIntent: propsToPass.current.paymentIntentGenerated,
      clientSecret: propsToPass.current.clientSecretGenerated,
      device: foundTotalDeviceNumber(),
      user: formattingConsumerInfo().uid,
      provider: company.company_name,
      eventSelected: choice,
      company: company.id,
    };
    await devitrackApi.post(
      "/stripe/stripe-transaction-no-regular-user",
      stripeTransactionProfile
    );
  }, []);

  const generateTransactionInfoDetail = useCallback(async () => {
    if (transactionRef.current) {
      const transactionProfile = {
        paymentIntent: propsToPass.current.paymentIntentGenerated,
        clientSecret: propsToPass.current.clientSecretGenerated,
        device: currentOrder[0],
        consumerInfo: consumer,
        provider: company.company_name,
        eventSelected: choice,
        date: new Date(),
        company: company.id,
      };
      await devitrackApi.post("/stripe/save-transaction", transactionProfile);
      return (transactionRef.current = false);
    }
  }, []);

  const generator = useCallback(async () => {
    if (nanoGenerated.current === false) {
      setQrCodeValue(propsToPass.current.paymentIntentGenerated);
      paymentIntentValueRef.current =
        propsToPass.current.paymentIntentGenerated;
      if (count.current === 0) {
        generatePaymentIntentForNoDepositRequired();
        generateTransactionInfoDetail();
        count.current = 1;
      }
      return (nanoGenerated.current = true);
    }
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    if (payment_intent && clientSecret) {
      if (storingRef.current) {
        propsToPass.current = {
          paymentIntentGenerated: payment_intent,
          clientSecretGenerated: clientSecret,
        };
        storeStripePaymentIntent();
        generateTransactionInfoDetail(propsToPass);
        setQrCodeValue(payment_intent);
        storingRef.current = false;
      }
    } else {
      generator();
    }

    return () => {
      controller.abort();
    };
  }, []);

  const checkAndRemove = async () => {
    const savedStripeTransactions = await devitrackApi.get("/admin/users");
    const savedTransactions = await devitrackApi.post(
      "/transaction/transaction",
      {
        eventSelected: choice,
      }
    );
    const groupingStripeTransactionByEvent = _.groupBy(
      savedStripeTransactions.data.stripeTransactions,
      "eventSelected"
    );
    const refDataStripeTransaction = Object.values(
      groupingStripeTransactionByEvent[choice]
    );
    const groupingTransactionByEvent = _.groupBy(
      savedTransactions.data.list,
      "eventSelected"
    );

    const detectingStripePaymentIntentDuplicated = {};
    for (let data of refDataStripeTransaction) {
      if (!detectingStripePaymentIntentDuplicated[data.paymentIntent]) {
        detectingStripePaymentIntentDuplicated[data.paymentIntent] = 1;
      } else {
        await devitrackApi.delete(`/stripe/remove-duplicate/${data.id}`);
      }
    }
    const refDataTransaction = Object.values(
      groupingTransactionByEvent[choice]
    );
    const detectingTransactionDuplicated = {};
    for (let data of refDataTransaction) {
      if (!detectingTransactionDuplicated[data.paymentIntent]) {
        detectingTransactionDuplicated[data.paymentIntent] = 1;
      } else {
        await devitrackApi.delete(`/stripe/removing/${data.id}`);
      }
    }
  };
  checkAndRemove();

  const automaticNavigation = () => {
    setTimeout(() => {
      dispatch(onAddPaymentIntent(undefined));
      return navigate("/device", { replace: true });
    }, 2000);
    return null;
  };

  return (
    <Grid
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"center"}
      alignItems={"center"}
      container
    >
      <Grid marginY={5} item xs={12}>
        <Typography
          textTransform={"none"}
          color={"var(--gray-900, #101828)"}
          textAlign={"center"}
          /* Display xs/Semibold */
          fontFamily={"Inter"}
          fontSize={"18px"}
          fontStyle={"normal"}
          fontWeight={400}
          lineHeight={"24px"}
          style={{
            textWrap: "balance",
          }}
        >
          We are taking you to the current order page for more information.
          {automaticNavigation()}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <QRCode
          bgColor="#fff"
          errorLevel="H"
          value={
            qrCodeValue ? qrCodeValue.paymentIntent : "https://devitrak.com"
          }
          icon="https://i.ibb.co/kKktFyw/maskable-icon.png"
        />
      </Grid>
      <Grid margin={"1rem auto"} item xs={12}>
        <Typography
          textTransform={"none"}
          color={"var(--gray-900, #101828)"}
          textAlign={"left"}
          /* Display xs/Semibold */
          fontFamily={"Inter"}
          fontSize={"24px"}
          fontStyle={"normal"}
          fontWeight={600}
          lineHeight={"32px"}
        >
          Order completed
        </Typography>
      </Grid>
      <Grid marginX={"auto"} item xs={12}>
        {" "}
        <Typography
          textTransform={"none"}
          color={"var(--gray-900, #101828)"}
          textAlign={"center"}
          /* Display xs/Semibold */
          fontFamily={"Inter"}
          fontSize={"14px"}
          fontStyle={"normal"}
          fontWeight={400}
          lineHeight={"20px"}
          padding={"auto"}
          style={{
            textWrap: "balance",
            width: "80%",
            margin: "0 auto",
          }}
        >
          Please proceed to go to the pick up location to collect your{" "}
          {foundTotalDeviceNumber() > 1 ? "devices" : "device"}. Show this qr
          code to staff to find your order.
        </Typography>
      </Grid>

      <Divider />
      <List
        style={{
          width: "90%",
        }}
        itemLayout="horizontal"
        dataSource={currentOrder}
        renderItem={(item) => (
          <List.Item
            actions={[<p key="list-loadmore-more">{item.deviceNeeded}</p>]}
          >
            <List.Item.Meta
              avatar={<Avatar src={"../../assets/devitrak_logo.svg"} />}
              title={
                <div>
                  <p>
                    {foundTotalDeviceNumber() > 1 ? "Devices" : "Device"}{" "}
                    required
                  </p>
                </div>
              }
            />
          </List.Item>
        )}
      />
      <Grid item xs={12}></Grid>
    </Grid>
  );
};

export default DisplayQRCode;
// const check = await savedStripeTransactions.data.stripeTransactions.filter(
//   (transaction) =>
//     transaction.paymentIntent === propsToPass.paymentIntentGenerated
// );
// const checkTransactions = await savedTransactions.data.list.filter(
//   (transaction) =>
//     transaction.paymentIntent === propsToPass.paymentIntentGenerated
// );
// if (check.length > 1 && checkTransactions.length > 1) {
//   setQrCodeValue(check.at(0));
//   devitrackApi.delete(`/stripe/remove-duplicate/${check.at(0).id}`);
//   devitrackApi.delete(
//     `/transaction/remove-duplicate-transaction/${
//       checkTransactions.at(0).id
//     }`
//   );
// }
