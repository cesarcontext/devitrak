import { Icon } from "@iconify/react";
import { Grid, Typography } from "@mui/material";
import { Card, QRCode } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import displayMonth from "./DisplayingMonth";
const OrderFormat = (info) => {
  const { subscription } = useSelector((state) => state.event);
  if (info) {
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
              props === "NO"
                ? "var(--blue-50, #EFF8FF)"
                : "var(--success-50, #ECFDF3)"
            }`,
            width: "fit-content",
          }}
        >
          <Typography
            color={`${
              props === "NO"
                ? "var(--blue-700, #175CD3)"
                : "var(--success-700, #027A48)"
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
              color={`${props === "NO" ? "#2E90FA" : "#12B76A"}`}
            />
            {props === "NO" ? "Completed" : "Active"}
          </Typography>
        </span>
      );
    };

    const sumDevices = () => {
      const { device } = info.info;
      let result = [];
      let index = 0;
      const noDelete = 0;
      for (let data of device) {
        result.splice(index, noDelete, data.deviceNeeded);
        index++;
      }
      return result.reduce((accumulator, current) => accumulator + current, 0);
    };
    const orderDay = new Date();
    return (
      <Card
        title={`${
          info.info.date
            ? `${displayMonth(info.info.date)} ${new Date(
                info.info.date
              ).getDay()}, ${new Date(info.info.date).getFullYear()}`
            : orderDay
        }`}
        extra={verifyStatusOrder("YES")}
        style={{
          width: 300,
          margin: "0.5rem auto 1rem",
        }}
      >
        <Grid container>
          <Grid
            display={"flex"}
            justifyContent={"flex-start"}
            alignItems={"center"}
            item
            xs={10}
          >
            <Typography
              width={"100%"}
              alignSelf={"stretch"}
              color={"var(--gray-900, #101828)"}
              fontSize={"18px"}
              fontFamily={"Inter"}
              fontStyle={"normal"}
              fontWeight={500}
              lineHeight={"28px"}
              textAlign={"left"}
              textTransform={"capitalize"}
            >
              Total devices: {sumDevices()}
            </Typography>
          </Grid>
          <Grid
            display={"flex"}
            justifyContent={"flex-start"}
            alignItems={"center"}
            item
            xs={10}
          >
            <Typography
              width={"100%"}
              alignSelf={"stretch"}
              color={"var(--gray-600, #475467)"}
              fontSize={"16px"}
              fontFamily={"Inter"}
              fontStyle={"normal"}
              fontWeight={400}
              lineHeight={"24px"}
              textAlign={"left"}
              textTransform={"capitalize"}
            >
              Deposit amount: {subscription.id === 1 ? "$0" : null}
            </Typography>
          </Grid>
          <Grid
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            item
            xs={10}
          >
            <Typography
              width={"100%"}
              color={""}
              fontSize={"12px"}
              fontFamily={"Inter"}
              fontStyle={"normal"}
              fontWeight={500}
              lineHeight={"18px"}
              textAlign={"left"}
              textTransform={"capitalize"}
            ></Typography>
          </Grid>
          <Grid
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            margin={"0.5rem auto"}
            item
            xs={10}
          >
            <QRCode errorLevel="H" value={`${info.info.paymentIntent}`} />
          </Grid>
          <Typography
            width={"100%"}
            alignSelf={"stretch"}
            color={"var(--gray-600, #475467)"}
            fontSize={"14px"}
            fontFamily={"Inter"}
            fontStyle={"normal"}
            fontWeight={400}
            lineHeight={"20px"}
            textAlign={"center"}
            textTransform={"capitalize"}
          >
            Order number: {info.info.paymentIntent}
          </Typography>
        </Grid>
      </Card>
    );
  } else {
    return [];
  }
};

export default OrderFormat;
