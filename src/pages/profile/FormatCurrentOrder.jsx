import { Grid, Typography } from "@mui/material";
import React from "react";

const FormatCurrentOrder = ({ info }) => {
  return (
    <Grid
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"flex-end"}
      alignItems={"center"}
      style={{
        width: "100%",
        padding: "20px",
      }}
      item
      xs={12}
    >
      {info.charges.data[0].receipt_url ? (
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
          {info.id}
          {/* <a href={`${info.charges.data[0].receipt_url}`} target="_blank">
            {info.id}
          </a> */}
        </Typography>
      ) : (
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
      )}{" "}
      {/* <br />
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
          Devices:
        </Typography> */}
    </Grid>
  );
};

export default FormatCurrentOrder;
