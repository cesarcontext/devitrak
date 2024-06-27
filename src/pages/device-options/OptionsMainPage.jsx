import { Button, Grid, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { Empty } from "antd";
import { useCallback, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { devitrackApi } from "../../devitrakApi";
import OrderFormat from "./format/OrderFormat";
import _ from 'lodash'
const OptionsMainPage = () => {
  const { consumer } = useSelector((state) => state.consumer);
  const { choice } = useSelector((state) => state.event);
  const navigate = useNavigate();
  const savedTransactionsQuery = useQuery({
    queryKey: ["transactions"],
    queryFn: () => devitrackApi.post("/transaction/transaction", {
      "consumerInfo.email": consumer.email,
      eventSelected: choice
    }),
    // enabled:false,
    refetchOnMount:false
  });

  useEffect(() => {
    const controller = new AbortController()
  savedTransactionsQuery.refetch()
    return () => {
      controller.abort()
    }
  }, [])
  const findOrderPerConsumer = () => {
    const groupingByCompany = _.groupBy(savedTransactionsQuery?.data?.data?.list, "eventSelected")
  }
  const find = savedTransactionsQuery?.data?.data?.list?.filter(
    (transaction) =>
      transaction?.consumerInfo?.email === consumer?.email &&
      transaction.eventSelected === choice
  );

  const removeDuplicateEntries = useCallback(() => {
    if (find) {
      const duplicates = {};
      for (let data of find) {
        if (!duplicates[data.paymentIntent]) {
          duplicates[data.paymentIntent] = data;
        } else {
          devitrackApi.delete(
            `/transaction/remove-duplicate-transaction/${data.id}`
          );
        }
      }
    }
  }, [find]);
  removeDuplicateEntries();

  const newOrderSubmit = () => {
    if (consumer) {
      return navigate("/deviceSelection");
    } else {
      return navigate("/initial-form");
    }
  };

  return (
    <Grid
      display={"flex"}
      flexDirection={"column"}
      alignItems={"center"}
      margin={"0.5rem auto 4rem"}
      container
    >
      <Grid
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
        margin={"2rem auto 2rem"}
        item
        xs={10}
      >
        <Typography
          color={"var(--gray-900, #101828)"}
          textAlign={"center"}
          /* Display xs/Semibold */
          fontFamily={"Inter"}
          fontSize={"24px"}
          fontStyle={"normal"}
          fontWeight={"600"}
          lineHeight={"32px"}
        >
          Order details
        </Typography>
        <Typography
          color={"var(--gray-600, #475467)"}
          textAlign={"center"}
          /* Display xs/Semibold */
          fontFamily={"Inter"}
          fontSize={"16px"}
          fontStyle={"normal"}
          fontWeight={"400"}
          lineHeight={"24px"}
        >
          View your current orders and request more.
        </Typography>
      </Grid>
      <Grid
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
        margin={"1rem auto 0rem"}
        item
        xs={10}
      >
        {consumer && find ? (
          find?.toReversed().map((item) => {
            return (
              <span key={item.id}>
                <OrderFormat info={item} />
              </span>
            );
          })
        ) : (
          <Empty
            description={
              <Typography
                color={"var(--gray-600, #475467)"}
                textAlign={"center"}
                /* Display xs/Semibold */
                fontFamily={"Inter"}
                fontSize={"16px"}
                fontStyle={"normal"}
                fontWeight={"400"}
                lineHeight={"24px"}
              >
                No order.
              </Typography>
            }
          ></Empty>
        )}
      </Grid>
      <Grid
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
        margin={"1rem auto 0rem"}
        width={"100%"}
        item
        xs={10}
      >
        <Button
          onClick={() => newOrderSubmit()}
          style={{
            display: "flex",
            padding: "12px 20px",
            justifyContent: "center",
            alignItems: "center",
            gap: "8px",
            borderRadius: "8px",
            border: "1px solid var(--blue-dark-600, #155EEF)",
            background: "var(--blue-dark-600, #155EEF)",
            boxShadow: "0px 1px 2px 0px rgba(16, 24, 40, 0.05)",
            width: "100%",
          }}
        >
          <Typography
            textTransform={"none"}
            fontFamily={"Inter"}
            fontSize={"18px"}
            fontStyle={"normal"}
            fontWeight={600}
            lineHeight={"20px"}
            color={"#fff"}
          >
            Create new order
          </Typography>
        </Button>
      </Grid>
    </Grid>
  );
};

export default OptionsMainPage;
