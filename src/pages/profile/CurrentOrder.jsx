import { Icon } from "@iconify/react";
import { Grid, Typography } from "@mui/material";
import { Avatar, QRCode } from "antd";
import { useSelector } from "react-redux";
import FormatCurrentOrder from "./FormatCurrentOrder";
import "./Profile.css";

const CurrentOrder = () => {
  const { transactionsHistory } = useSelector((state) => state.stripe);
  const _ = require("lodash");
  const sortTransactionHistory = () => {
    const groupingByDeposit = _.groupBy(transactionsHistory, "deposit");
    if (groupingByDeposit.hasOwnProperty("deposit")) {
      return groupingByDeposit["deposit"][0];
    } else if (groupingByDeposit.hasOwnProperty("no-deposit")) {
      return groupingByDeposit["no-deposit"][0];
    }
  };
  sortTransactionHistory();
  const renderIcon = () => {
    return (
      <Avatar
        style={{
          background: "8px solid var(--blue-dark-50, #EFF4FF)",
          border: "var(--blue-dark-100, #D1E0FF)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Icon
          icon="mingcute:information-line"
          color="#155EEF"
          style={{
            width: "24px",
            height: "24px",
            flexShrink: "0",
          }}
        />
      </Avatar>
    );
  };

  return (
    <Grid
      container
      display={"flex"}
      flexDirection={"column"}
      alignItems={"center"}
      margin={"0.5rem auto 1.5rem"}
    >
      <Typography
        textTransform={"none"}
        fontFamily={"Inter"}
        fontSize={"24px"}
        fontStyle={"normal"}
        fontWeight={600}
        lineHeight={"32px"}
        color={"var(--gray-900, #101828)"}
      >
        Current order
      </Typography>
      <Grid
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
        alignSelf={"stretch"}
        margin={"0.5rem auto 1.5rem"}
        style={{
          padding: "20px 0px 0px",
          gap: "12px",
          background: "var(--blue-dark-25, #F5F8FF)",
          borderRadius: "12px",
          width: "100%",
        }}
        item
        xs={10}
      >
        <Grid
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}
          style={{
            width: "85%",
          }}
          item
          xs={12}
        >
          <Grid
            display={"flex"}
            justifyContent={"flex-start"}
            alignItems={"center"}
            id="icon"
            item
            xs={4}
          >
            {renderIcon()}
          </Grid>
          <Grid
            display={"flex"}
            justifyContent={"flex-end"}
            alignItems={"center"}
            id="qr code"
            item
            xs={8}
          >
            <QRCode
              bgColor="#fff"
              errorLevel="H"
              size={90}
              value={
                sortTransactionHistory().paymentIntent ??
                sortTransactionHistory().id
              }
              icon="https://i.ibb.co/kKktFyw/maskable-icon.png"
              iconSize={18}
            />
          </Grid>
        </Grid>

        {transactionsHistory.length > 0 ? (
          <Grid display={"flex"} alignItems={"center"} item xs={12}>
            <FormatCurrentOrder info={transactionsHistory[0]} />
          </Grid>
        ) : (
          <Grid
            display={"flex"}
            flexDirection={"column"}
            alignItems={"center"}
            item
            xs={12}
          >
            <Typography
              textTransform={"none"}
              fontFamily={"Inter"}
              textAlign={"left"}
              fontSize={"18px"}
              fontStyle={"normal"}
              fontWeight={600}
              lineHeight={"28px"}
              color={"var(--gray-900, #101828)"}
              width={"100%"}
            >
              No active order
            </Typography>
            <Typography
              textTransform={"none"}
              fontFamily={"Inter"}
              textAlign={"left"}
              fontSize={"14px"}
              fontStyle={"normal"}
              fontWeight={400}
              lineHeight={"20px"}
              color={"var(--gray-600, #475467)"}
              width={"100%"}
            >
              You have no active order at this time.
            </Typography>
          </Grid>
        )}
      </Grid>
    </Grid>
  );
};

export default CurrentOrder;
