import { nanoid } from "@reduxjs/toolkit";
import { Avatar, Divider, List, QRCode } from "antd";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { devitrackApi } from "../../devitrakApi";
import { Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const DisplayQRCode = () => {
  const { consumer } = useSelector((state) => state.consumer);
  const { currentOrder } = useSelector((state) => state.deviceHandler);
  const { choice, company } = useSelector((state) => state.event);
  const [qrCodeValue, setQrCodeValue] = useState(undefined);
  const paymentIntentValueRef = useRef(null);
  const nanoGenerated = useRef(false);
  const navigate = useNavigate();
  const foundTotalDeviceNumber = () => {
    const number = currentOrder?.map((total) => parseInt(total.deviceNeeded));
    return number.reduce((accumulator, current) => accumulator + current, 0);
  };
  foundTotalDeviceNumber();
  const generatePaymentIntentForNoDepositRequired = useCallback(
    async (props) => {
      const stripeTransactionProfile = {
        paymentIntent: props.paymentIntentGenerated,
        clientSecret: props.clientSecretGenerated,
        device: foundTotalDeviceNumber(),
        user: consumer.id,
        provider: company,
        eventSelected: choice,
      };
      await devitrackApi.post(
        "/stripe/stripe-transaction-no-regular-user",
        stripeTransactionProfile
      );
    },
    []
  );
  const generateTransactionInfoDetail = useCallback(async (props) => {
    const transactionProfile = {
      paymentIntent: props.paymentIntentGenerated,
      clientSecret: props.clientSecretGenerated,
      device: currentOrder,
      consumerInfo: consumer,
      provider: company,
      eventSelected: choice,
      date: new Date(),
    };
    await devitrackApi.post("/stripe/save-transaction", transactionProfile);
  }, []);

  const propsToPass = {
    paymentIntentGenerated: 0,
    clientSecretGenerated: 0,
  };

  useEffect(() => {
    const controller = new AbortController();
    const generator = async () => {
      if (nanoGenerated.current === false) {
        propsToPass.paymentIntentGenerated = "pi_" + nanoid(12);
        propsToPass.clientSecretGenerated = `_client_secret=${nanoid(12)}`;
        nanoGenerated.current = true;
      }
      paymentIntentValueRef.current = propsToPass.paymentIntentGenerated;
      await generatePaymentIntentForNoDepositRequired(propsToPass);
      await generateTransactionInfoDetail(propsToPass);
    };
    generator();
    const checkAndRemove = async () => {
      const savedStripeTransactions = await devitrackApi.get("/admin/users");
      const savedTransactions = await devitrackApi.get("/stripe/transaction");
      const check =
        await savedStripeTransactions.data.stripeTransactions.filter(
          (transaction) =>
            transaction.paymentIntent === propsToPass.paymentIntentGenerated
        );
      const checkTransactions = await savedTransactions.data.list.filter(
        (transaction) =>
          transaction.paymentIntent === propsToPass.paymentIntentGenerated
      );
      if (check.length > 1 && checkTransactions.length > 1) {
        setQrCodeValue(check.at(0));
        devitrackApi.delete(`/stripe/remove-duplicate/${check.at(0).id}`);
        devitrackApi.delete(
          `/transaction/remove-duplicate-transaction/${
            checkTransactions.at(0).id
          }`
        );
      }
    };
    checkAndRemove();

    return () => {
      controller.abort();
    };
  }, []); // eslint-disable-line no-use-before-define
  const automaticNavigation = () => {
    setTimeout(() => {
      navigate("/device", { replace: true });
    }, 3500);
  };

  return (
    <>
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
            errorLevel="H"
            value={
              qrCodeValue ? qrCodeValue.paymentIntent : "https://devitrak.com"
            }
            // icon="../../assets/devitrak_logo.svg"
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
                title={<div>{item.deviceType}</div>}
              />
            </List.Item>
          )}
        />
        <Grid item xs={12}></Grid>
      </Grid>
    </>
  );
};

export default DisplayQRCode;
