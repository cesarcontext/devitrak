import { Icon } from "@iconify/react";
import { Grid, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { Avatar, Card } from "antd";
import { useSelector } from "react-redux";
import { devitrackApi } from "../../devitrakApi";
import FormatCurrentOrder from "./FormatCurrentOrder";
import "./Profile.css";

const CurrentOrder = () => {
  const { consumer } = useSelector((state) => state.consumer);
  const { event } = useSelector((state) => state.event);

  const transactionQuery = useQuery({
    queryKey: ["listOfTransactions"],
    queryFn: () => devitrackApi.get("/stripe/transaction"),
  });
  if (transactionQuery.data) {
    const findingTransactionPerConsumerPerEvent = () => {
      const checkingPerConsumer = transactionQuery.data.data.list.filter(
        (transaction) =>
          transaction.consumerInfo.email === consumer.email &&
          transaction.eventSelected === event.eventInfoDetail.eventName &&
          transaction.provider === event.company
      );
      return checkingPerConsumer;
    };
    findingTransactionPerConsumerPerEvent();

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
            justifyContent={"flex-start"}
            alignItems={"center"}
            style={{
              width: "100%",
              marginLeft: "10%",
            }}
            item
            xs={12}
          >
            {renderIcon()}
          </Grid>
          <Grid
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            item
            xs={12}
          >
            {findingTransactionPerConsumerPerEvent() ? (
              findingTransactionPerConsumerPerEvent()?.map((order) => {
                return (
                  <div key={order.id}>
                    <FormatCurrentOrder info={order} />
                  </div>
                );
              })
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
      </Grid>
    );
  }
};

export default CurrentOrder;
