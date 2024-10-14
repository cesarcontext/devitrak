import { Grid, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { devitrackApi } from "../../devitrakApi";
import { onAddTransactionHistory } from "../../store/slides/stripeSlide";
import "./Profile.css";
import isOlderThanOneYear from "../../components/utils/checkDateInReferenceOfToday";
import AutoSizer from "react-virtualized-auto-sizer";
import { FixedSizeList as List } from "react-window";
import Loading from "../../components/animations/Loading";
import { Divider } from "antd";

const OrderHistory = () => {
  const [tableResult, setTableResult] = useState([]);
  const [dataToHistoryRecord, setDataToHistoryRecord] = useState([]);
  const { consumer } = useSelector((state) => state.consumer);
  const renderTimeRef = useRef(true);
  const dispatch = useDispatch();
  const todayRef = new Date();
  todayRef.setFullYear(todayRef.getFullYear() - 1);
  const transactionQuery = useQuery({
    queryKey: ["listOfTransactions"],
    queryFn: () =>
      devitrackApi.post("/transaction/transaction", {
        "consumerInfo.email": consumer.email,
        created_at: { $gte: new Date(todayRef).getTime() },
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
            const substractingInfo = String(data.paymentIntent).split(":");
            const renderingAmount = substractingInfo[1].split("_");
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
          date: value.date,
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

  useEffect(() => {
    const controller = new AbortController();
    filterData();
    return () => {
      controller.abort();
    };
  }, [transactionQuery.data]);

  const rowRenderer = ({ index, style }) => {
    const item = tableResult[index];
    let dateFormat = "";
    if (item.date) {
      const date = item.date.split(":");
      dateFormat = `${date[0]}:${[date[1]]}`;
    }
    return (
      <div
        key={item.id}
        className={index % 2 ? "ListItemOdd" : "ListItemEven"}
        style={{
          ...style,
          width: "100%",
          height: "auto",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <p
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              border: "solid 0.01",
            }}
          >
            {item.paymentIntent}
          </p>
          <p
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              border: "solid 0.01",
            }}
          >
            <strong>${item.amount}</strong>
          </p>
        </div>
        <p
          style={{
            width: "100%",
            textAlign: "left",
          }}
        >
          Date: {item.date && dateFormat}
        </p>
        <br/>
      </div>
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
      <Grid
        display={"flex"}
        justifyContent={"flex-start"}
        alignItems={"center"}
        margin={"0 auto 1rem"}
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
        {transactionQuery.isLoading ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              margin: "auto",
            }}
          >
            <Loading />
          </div>
        ) : (
          <div style={{ flex: "1 1 auto", width: 280, height: 250 }}>
            <AutoSizer>
              {({ scaledWidth, scaledHeight }) => (
                <List
                  height={scaledHeight}
                  itemCount={tableResult.length}
                  itemSize={50}
                  width={scaledWidth}
                >
                  {rowRenderer}
                </List>
              )}
            </AutoSizer>
          </div>
        )}{" "}
      </Grid>
    </Grid>
  );
};

export default OrderHistory;
