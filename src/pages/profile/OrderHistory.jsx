import { Grid, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { Table } from "antd";
import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { devitrackApi } from "../../devitrakApi";
import { onAddTransactionHistory } from "../../store/slides/stripeSlide";
import "./Profile.css";
const OrderHistory = () => {
  const [tableResult, setTableResult] = useState([]);
  const [dataToHistoryRecord, setDataToHistoryRecord] = useState([]);
  const { consumer } = useSelector((state) => state.consumer);
  const { event } = useSelector((state) => state.event);
  const renderTimeRef = useRef(true);
  const _ = require("lodash");
  const dispatch = useDispatch();
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
      render: (amount) => (
        <span>
          <Typography>${amount}</Typography>
        </span>
      ),
    },
  ];

  if (transactionQuery.data) {
    const findingTransactionPerConsumerPerEvent = () => {
      const groupingByCompany = _.groupBy(
        transactionQuery.data.data.list,
        "provider"
      );
      const groupingByEvents = _.groupBy(
        groupingByCompany[event.company],
        "eventSelected"
      );
      const groupingByConsumerEmail = _.groupBy(
        groupingByEvents[event.eventInfoDetail.eventName],
        "consumerInfo.email"
      );
      if (groupingByConsumerEmail[consumer.email])
        return groupingByConsumerEmail[consumer.email];
      return [];
    };
    findingTransactionPerConsumerPerEvent();

    const filterData = async () => {
      try {
        const ref = new Map();
        if (findingTransactionPerConsumerPerEvent() && renderTimeRef.current) {
          for (let data of findingTransactionPerConsumerPerEvent()) {
            if (data.paymentIntent.length > 15) {
              const resp = await devitrackApi.get(
                `/stripe/payment_intents/${data.paymentIntent}`
              );
              if (resp.data) {
                ref.set(resp.data.paymentIntent.id, {
                  ...resp.data.paymentIntent,
                  paymentIntent: resp.data.paymentIntent.id,
                  amount: resp.data.paymentIntent.amount_capturable
                    .toString()
                    .slice(0, -2),
                  deposit: "deposit",
                });
              }
            } else {
              ref.set(data.paymentIntent, {
                ...data,
                amount: "0",
                deposit: "no-deposit",
              });
            }
          }
        }
        const addingResult = [];
        const addingHistoryResult = [];
        let index = 0;
        for (let [key, value] of ref.entries()) {
          addingResult.splice(index, 0, {
            paymentIntent: key,
            amount: value.amount,
          });

          setTableResult(addingResult.toReversed());
          addingHistoryResult.splice(index, 0, value);
          setDataToHistoryRecord(addingHistoryResult.toReversed());
          index++;
        }

        renderTimeRef.current = false;
        dispatch(onAddTransactionHistory(dataToHistoryRecord));
      } catch (error) {
        console.log(
          "🚀 ~ file: OrderHistory.jsx:109 ~ filterData ~ error:",
          error
        );
      }
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
            dataSource={tableResult}
            onChange={""}
          />
        </Grid>
      </Grid>
    );
  }
};

export default OrderHistory;
