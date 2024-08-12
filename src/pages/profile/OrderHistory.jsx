import { Grid, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { Table } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { devitrackApi } from "../../devitrakApi";
import { onAddTransactionHistory } from "../../store/slides/stripeSlide";
import _ from "lodash";
import "./Profile.css";
import isOlderThanOneYear from "../../components/utils/checkDateInReferenceOfToday";
const OrderHistory = () => {
  const [tableResult, setTableResult] = useState([]);
  const [dataToHistoryRecord, setDataToHistoryRecord] = useState([]);
  const { consumer } = useSelector((state) => state.consumer);
  // const { event } = useSelector((state) => state.event);
  const renderTimeRef = useRef(true);
  const dispatch = useDispatch();
  const transactionQuery = useQuery({
    queryKey: ["listOfTransactions"],
    queryFn: () =>
      devitrackApi.post("/transaction/transaction", {
        "consumerInfo.email": consumer.email,
      }),
    refetchOnMount: false,
    enabled: false,
  });
  useEffect(() => {
    const controller = new AbortController();
    transactionQuery.refetch();
    return () => {
      controller.abort();
    };
  }, []);

  const columns = [
    {
      title: "Transaction",
      dataIndex: "paymentIntent",
      key: "paymentIntent",
      sorter: {
        compare: (a, b) => a.paymentIntent - b.paymentIntent,
      },
    },
    {
      title: "Deposit",
      dataIndex: "amount",
      align: "right",
      sorter: {
        compare: (a, b) => a.amount - b.amount,
      },
      render: (amount, record) => (
        <span>
          <Typography>${amount}</Typography>
        </span>
      ),
    },
  ];

  if (transactionQuery.data) {
    const findingTransactionPerConsumerPerEvent = () => {
      if (transactionQuery.data) {
        const result = new Set();
        const data = transactionQuery.data.data.list;
        for (let item of data) {
          if (!isOlderThanOneYear(item.date)) {
            result.add(item);
          }
        }
        return Array.from(result);
      }
      return [];
    };
    findingTransactionPerConsumerPerEvent();
    const renderingTransactionID = ({ paymentId, prefix }) => {
      if (String(paymentId).toLowerCase().includes("cash")) {
        const splitting = String(paymentId).split("**");
        return `${prefix}${splitting.at(-1)}`;
      }
      return paymentId;
    };

    const filterData = async () => {
      try {
        const ref = new Map();
        if (findingTransactionPerConsumerPerEvent().length > 0) {
          for (let data of findingTransactionPerConsumerPerEvent()) {
            if (
              data.paymentIntent.length > 15 &&
              !String(data.paymentIntent).startsWith("pi_cash")
            ) {
              const resp = await devitrackApi.get(
                `/stripe/payment_intents/${data.paymentIntent}`
              );
              if (resp.data) {
                ref.set(resp.data.paymentIntent.id, {
                  ...resp.data.paymentIntent,
                  paymentIntent: resp.data.paymentIntent.id,
                  amount:
                    resp.data.paymentIntent.amount_capturable !== 0
                      ? resp.data.paymentIntent.amount_capturable
                          .toString()
                          .slice(0, -2)
                      : "0",
                  deposit: "deposit",
                });
              }
            } else if (
              data.paymentIntent.length > 15 &&
              String(data.paymentIntent).startsWith("pi_cash")
            ) {
              const substractingInfo = String(data.paymentIntent).split(":")
              const renderingAmount = substractingInfo[1].split("_")
              ref.set(data.paymentIntent, {
                ...data,
                amount: renderingAmount[0].slice(1),
                deposit: "deposit",
              });

            } else {
              ref.set(data.paymentIntent, {
                ...data,
                amount: "0",
                deposit: "no-deposit",
              });
            }
          }
        }
        const addingResult = new Set();
        let addingHistoryResult = [];
        for (let [key, value] of ref.entries()) {
          addingResult.add({
            paymentIntent: renderingTransactionID({
              prefix: "pi_cash_",
              paymentId: key,
            }),
            amount: value.amount,
          });
          setTableResult(Array.from(addingResult).toReversed());
          addingHistoryResult = [...addingHistoryResult, value];
          setDataToHistoryRecord(addingHistoryResult.toReversed());
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
          xs={12}
          sm={12}
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
          xs={12}
          sm={12}
        >
          <Table
            pagination={{
              position: ["bottomCenter"],
            }}
            style={{
              width: "100%",
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
