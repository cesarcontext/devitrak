import { Grid, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { Table } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import { devitrackApi } from "../../devitrakApi";
import "./Profile.css";
const OrderHistory = () => {
  const { consumer } = useSelector((state) => state.consumer);
  const { event } = useSelector((state) => state.event);
  const transactionQuery = useQuery({
    queryKey: ["listOfTransactions"],
    queryFn: () => devitrackApi.get("/stripe/transaction"),
  });
  const columns = [
    {
      title: "Transaction ID",
      dataIndex: "paymentIntent",
      sorter: {
        compare: (a, b) => a.paymentIntent - b.paymentIntent,
      },
    },
    {
      title: "Deposit amount",
      dataIndex: "amount",
      align: "right",
      sorter: {
        compare: (a, b) => a.amount - b.amount,
      },
      render:(amount) => (
        <span>
            <Typography>USD ${amount}</Typography>
        </span>
      )
    },
  ];

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

    const filterData = () => {
      const result = [];
      if (findingTransactionPerConsumerPerEvent()) {
        for (let data of findingTransactionPerConsumerPerEvent()) {
          result.unshift({
            paymentIntent: data.paymentIntent,
            amount: 0,
          });
        }
      }
      return result;
    };
    filterData();
    return (
      <Grid
        container
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
        margin={"0.5rem auto 1.5rem"}
      >
        <Grid
          display={"flex"}
          justifyContent={"flex-start"}
          alignItems={"center"}
          item
          xs={10}
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
            Order history
          </Typography>
        </Grid>

        <Grid
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          item
          xs={10}
        >
          <Table
            pagination={{
              position: ["bottomCenter"],
            }}
            columns={columns}
            dataSource={filterData()}
            onChange={""}
          />
        </Grid>
      </Grid>
    );
  }
};

export default OrderHistory;
