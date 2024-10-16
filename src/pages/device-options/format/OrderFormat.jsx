import { Icon } from "@iconify/react";
import { Grid, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { Card, QRCode } from "antd";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { devitrackApi } from "../../../devitrakApi";
import displayMonth from "./DisplayingMonth";
import { groupBy } from "lodash";
const OrderFormat = (info) => {
  const { choice } = useSelector((state) => state.event);
  const assignedDeviceListQuery = useQuery({
    queryKey: ["assignedDevice"],
    queryFn: () =>
      devitrackApi.post("/receiver/receiver-assigned-list", {
        user: info.info.consumerInfo.email,
        eventSelected: choice,
      }),
    refetchOnMount: false,
  });
  useEffect(() => {
    const controller = new AbortController();
    assignedDeviceListQuery.refetch();
    return () => {
      controller.abort();
    };
  }, []);
  if (info) {
    const renderingTransactionID = (props) => {
      if (String(props).toLowerCase().includes("cash")) {
        const splitting = String(props).split("**");
        return `pi_cash_amount_${splitting.at(-1)}`;
      }
      return props;
    };
    const verifyStatusOrder = (props) => {
      return (
        <span
          style={{
            borderRadius: "16px",
            justifyContent: "center",
            display: "flex",
            padding: "2px 8px",
            alignItems: "center",
            background: `${
              props ? "var(--blue-50, #EFF8FF)" : "var(--success-50, #ECFDF3)"
            }`,
            width: "fit-content",
          }}
        >
          <Typography
            color={`${
              props ? "var(--blue-700, #175CD3)" : "var(--success-700, #027A48)"
            }`}
            fontSize={"12px"}
            fontFamily={"Inter"}
            fontStyle={"normal"}
            fontWeight={500}
            lineHeight={"18px"}
            textAlign={"center"}
            textTransform={"capitalize"}
          >
            <Icon
              icon="tabler:point-filled"
              rotate={3}
              color={`${props ? "#2E90FA" : "#12B76A"}`}
            />
            {props ? "Completed" : "Active"}
          </Typography>
        </span>
      );
    };

    const sumDevices = () => {
      const { device } = info.info;
      let result = [];
      for (let data of device) {
        result = [...result, Number(data.deviceNeeded)];
      }
      return result.reduce((accumulator, current) => accumulator + current, 0);
    };

    const devicesAssignedInOrder = () => {
      if (assignedDeviceListQuery.data) {
        const groupByPaymentIntentByConsumer = groupBy(
          assignedDeviceListQuery.data.data.listOfReceivers,
          "paymentIntent"
        );
        if (groupByPaymentIntentByConsumer[info.info.paymentIntent]) {
          let result = [];
          let index = 0;
          let counting = 1;
          const notDelete = 0;
          for (let data of groupByPaymentIntentByConsumer[
            info.info.paymentIntent
          ]) {
            if (data.device.status === true) {
              result.splice(index, notDelete, counting);
              index++;
            }
          }
          return result.reduce(
            (accumulator, current) => accumulator + current,
            0
          );
        } else {
          return 0;
        }
      }
      return 0;
    };
    const orderDay = new Date();

    const deposit = () => {
      const { device } = info.info;
      if (device[0].deviceNeeded > 0) {
        return device[0].deviceNeeded * device[0].deviceValue;
      } else {
        return device[0].deviceValue;
      }
    };
    return (
      <Card
        title={`${
          info.info.date
            ? `${displayMonth(info.info.date)} ${new Date(
                info.info.date
              ).getDate()}, ${new Date(info.info.date).getFullYear()}
              `
            : orderDay
        }`}
        extra={verifyStatusOrder(info.active)}
        style={{
          width: 300,
          margin: "0.5rem auto 1rem",
        }}
        styles={{
          header: {
            borderBottom: "transparent",
            color: "#6941c6",
          },
        }}
      >
        <Grid container>
          <Grid
            display={"flex"}
            justifyContent={"flex-start"}
            alignItems={"center"}
            margin={"0 0 -15px"}
            item
            xs={10}
          >
            <p
              style={{
                width: "100%",
                alignSelf: "stretch",
                color: "var(--gray-900, #101828)",
                fontSize: "18px",
                fontFamily: "Inter",
                fontStyle: "normal",
                fontWeight: 700,
                lineHeight: "28px",
                textAlign: "left",
                textTransform: "none",
              }}
            >
              Total devices: {sumDevices()}
            </p>
          </Grid>
          <Grid
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
            margin={"0 0 -15px"}
            item
            xs={12}
          >
            <p
              style={{
                width: "100%",
                alignSelf: "stretch",
                color: "var(--gray-600, #475467)",
                fontSize: "16px",
                fontFamily: "Inter",
                fontStyle: "normal",
                fontWeight: 400,
                lineHeight: "24px",
                textAlign: "left",
                textTransform: "none",
              }}
            >
              {sumDevices() > 1 ? "Devices" : "Device"} in use:{" "}
              {devicesAssignedInOrder()}/{sumDevices()}
            </p>
            {devicesAssignedInOrder() > 0 ? (
              <Icon
                icon="fluent:shifts-activity-20-filled"
                width={25}
                color="#ff0000"
              />
            ) : (
              <Icon icon="ei:check" width={30} color="#6ce792" />
            )}
          </Grid>
          <Grid
            display={"flex"}
            justifyContent={"flex-start"}
            alignItems={"center"}
            item
            xs={10}
          >
            <p
              style={{
                width: "100%",
                alignSelf: "stretch",
                color: "var(--gray-600, #475467)",
                fontSize: "16px",
                fontFamily: "Inter",
                fontStyle: "normal",
                fontWeight: 400,
                lineHeight: "24px",
                textAlign: "left",
                textTransform: "none",
              }}
            >
              Deposit amount: ${deposit()}
              {/* {subscription.id === 1 ? "$0" : null} */}
            </p>
          </Grid>
          <Grid
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            margin={"0.5rem auto"}
            item
            xs={10}
          >
            <QRCode
              errorLevel="H"
              value={`${info.info.paymentIntent}`}
              icon="https://devitrakadmindashboardlogotesting.s3.amazonaws.com/maskable_icon_white_background.png"
              iconSize={50}
            />
          </Grid>
          <p
            style={{
              width: "100%",
              alignSelf: "stretch",
              color: "var(--gray-600, #475467)",
              fontSize: "14px",
              fontFamily: "Inter",
              fontStyle: "normal",
              fontWeight: 400,
              lineHeight: "20px",
              textAlign: "center",
              textTransform: "none",
            }}
          >
            Order number: {renderingTransactionID(info.info.paymentIntent)}
          </p>
        </Grid>
      </Card>
    );
  } else {
    return [];
  }
};

export default OrderFormat;
