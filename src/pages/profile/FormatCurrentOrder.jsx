import { Grid, Typography } from "@mui/material";
import { Divider, QRCode } from "antd";
import React from "react";

const FormatCurrentOrder = ({ info }) => {
  const renderDeviceNeeded = () => {
    const { device } = info;
    const result = [];
    let index = 0;
    for (let data of device) {
      result.splice(index, 0, data.deviceNeeded);
      index++;
    }
    return result.reduce((accumulator, current) => accumulator + current, 0);
  };
  return (
    <Grid
      display={"flex"}
      justifyContent={"flex-start"}
      alignItems={"center"}
      style={{
        width: "100%",
        marginLeft: "10%",
      }}
      item
      xs={12}
    >
      <Grid
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"flex-end"}
        alignItems={"center"}
        style={{
          width: "100%",
        }}
        item
        xs={6}
      >
        {" "}
        <Typography
          textTransform={"none"}
          textAlign={"right"}
          fontFamily={"Inter"}
          fontSize={"16px"}
          fontStyle={"normal"}
          fontWeight={500}
          lineHeight={"20px"}
          color={"var(--gray-900, #101828)"}
        >
          {info.paymentIntent}
        </Typography>
        <br />
        <Typography
          textTransform={"none"}
          textAlign={"right"}
          fontFamily={"Inter"}
          fontSize={"16px"}
          fontStyle={"normal"}
          fontWeight={400}
          lineHeight={"20px"}
          color={"var(--gray-900, #101828)"}
        >
          Devices:{renderDeviceNeeded()}
        </Typography>
      </Grid>
      <Grid
        display={"flex"}
        justifyContent={"flex-end"}
        alignItems={"center"}
        
        item
        xs={6}
      >
        <QRCode size={100} value={info.paymentIntent} />
      </Grid>
      <Divider />
    </Grid>
  );
};

export default FormatCurrentOrder;
