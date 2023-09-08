import { nanoid } from "@reduxjs/toolkit";
import { Avatar, Divider, List, QRCode } from "antd";
import React, { useCallback, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { devitrackApi } from "../../devitrakApi";
import { Grid, Typography } from "@mui/material";
import { useMutation } from "@tanstack/react-query";

const DisplayQRCode = () => {
  const { consumer } = useSelector((state) => state.consumer);
  const { currentOrder } = useSelector(
    (state) => state.deviceHandler
  );
  const { choice, company, eventInfoDetail } = useSelector(
    (state) => state.event
  );
  const paymentIntentValueRef = useRef(null);
  const savingPaymentIntentRef = useRef(0);

  const savingStripePaymentIntentMutation = useMutation({
    mutationFn: (stripeTransactionProfile) =>
      devitrackApi.post(
        "/stripe/stripe-transaction-no-regular-user",
        stripeTransactionProfile
      ),
  });
  const savingTransactionPaymentIntentMutation = useMutation({
    mutationFn: (transactionProfile) =>
      devitrackApi.post("/stripe/save-transaction", transactionProfile),
  });

  const foundTotalDeviceNumber = () => {
    const number = currentOrder?.map((total) =>
      parseInt(total.deviceNeeded)
    );
    return number.reduce((accumulator, current) => accumulator + current, 0);
  };
  foundTotalDeviceNumber();
  const generatePaymentIntentForNoDepositRequired = useCallback(async () => {
    if (savingPaymentIntentRef.current < 1) {
      const max = 918273645;
      const transactionGenerated = "pi_" + nanoid(12);
      paymentIntentValueRef.current = transactionGenerated;
      const stripeTransactionProfile = {
        paymentIntent: transactionGenerated,
        clientSecret:
          transactionGenerated +
          "_client_secret_" +
          Math.floor(Math.random() * max),
        device: foundTotalDeviceNumber(),
        user: "63c05af38e35e500379b5bdd",
        provider: company,
        eventSelected: choice,
      };
      const transactionProfile = {
        paymentIntent: transactionGenerated,
        clientSecret:
          transactionGenerated +
          "_client_secret_" +
          Math.floor(Math.random() * max),
        device: currentOrder,
        consumerInfo: consumer,
        provider: company,
        eventSelected: choice,
        date: new Date()
      };
      savingTransactionPaymentIntentMutation.mutate(transactionProfile);

      // savingStripePaymentIntentMutation.mutate(stripeTransactionProfile);
      // if (
      //   (savingStripePaymentIntentMutation.isIdle ||
      //     savingStripePaymentIntentMutation.isSuccess) &&
      //   !savingStripePaymentIntentMutation.isError
      // ) {
      //   savingTransactionPaymentIntentMutation.mutate(transactionProfile);
      // }
      savingPaymentIntentRef.current = 1;
    }
  }, []);
  useEffect(() => {
    const controller = new AbortController();
    generatePaymentIntentForNoDepositRequired();
    return () => {
      controller.abort();
    };
  }, []);
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
          {" "}
        </Grid>
        <Grid item xs={12}>
          <QRCode
            errorLevel="H"
            value={
              paymentIntentValueRef.current
                ? paymentIntentValueRef.current
                : "https://devitrak.com"
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
                title={<a href="https://ant.design">{item.deviceType}</a>}
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
