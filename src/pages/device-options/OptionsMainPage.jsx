import { Button, Grid, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { Empty } from "antd";
import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AutoSizer from "react-virtualized-auto-sizer";
import { FixedSizeList as List } from "react-window";
import { devitrackApi } from "../../devitrakApi";
import OrderFormat from "./format/OrderFormat";
import { onAddPaymentIntent } from "../../store/slides/stripeSlide";
const OptionsMainPage = () => {
  const { consumer } = useSelector((state) => state.consumer);
  const { event } = useSelector((state) => state.event);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const todayRef = new Date();
  todayRef.setFullYear(todayRef.getFullYear() - 1);
  const savedTransactionsQuery = useQuery({
    queryKey: ["transactions"],
    queryFn: () =>
      devitrackApi.post("/transaction/transaction", {
        "consumerInfo.email": consumer.email,
        eventSelected:event.eventInfoDetail.eventName,  
        // created_at: { $gte: new Date(todayRef).getTime() }, //search by date in range of a year back from today
      }),
    refetchOnMount: false,
  });

  useEffect(() => {
    const controller = new AbortController();
    savedTransactionsQuery.refetch();
    dispatch(onAddPaymentIntent(undefined))
    return () => {
      controller.abort();
    };
  }, []);
  const find = savedTransactionsQuery?.data?.data?.list;
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
  const renderingData = () => {
    if (
      Array.isArray(savedTransactionsQuery?.data?.data?.list) &&
      savedTransactionsQuery?.data?.data?.list.length > 0
    ) {
      return find.toReversed();
    }
    return [];
  };
  const rowRenderer = ({ index, style }) => {
    const item = renderingData()[index];
    return (
      <div key={item.id} style={style}>
        <OrderFormat info={item} />
      </div>
    );
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
        <h1
          style={{
            color: "var(--gray-900, #101828)",
            textAlign: "center",
            fontFamily: "Inter",
            fontSize: "24px",
            fontStyle: "normal",
            fontWeight: "600",
            lineHeight: "32px",
          }}
        >
          Order details
        </h1>
        <h4
          style={{
            color: "var(--gray-600, #475467)",
            textAlign: "center",
            fontFamily: "Inter",
            fontSize: "16px",
            fontStyle: "normal",
            fontWeight: "400",
            lineHeight: "24px",
          }}
        >
          View your current orders and request more.
        </h4>
      </Grid>
      <Grid
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
        margin={"1rem auto 0rem"}
        item
        xs={10}
      >
        {consumer?.email && renderingData()?.length > 0 ? (
          <div style={{ flex: "1 1 auto", width: 300, height: 450 }}>
            <AutoSizer>
              {({ scaledWidth, scaledHeight }) => (
                <List
                  height={scaledHeight}
                  itemCount={renderingData().length}
                  itemSize={450}
                  width={scaledWidth}
                >
                  {rowRenderer}
                </List>
              )}
            </AutoSizer>
          </div>
        ) : (
          <Empty
            description={
              <h1
                style={{
                  color: "var(--gray-600, #475467)",
                  textAlign: "center",
                  /* Display xs/Semibold */
                  fontFamily: "Inter",
                  fontSize: "16px",
                  fontStyle: "normal",
                  fontWeight: "400",
                  lineHeight: "24px",
                }}
              >
                No order.
              </h1>
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
            // gap: "8px",
            borderRadius: "8px",
            border: "1px solid var(--blue-dark-600, #155EEF)",
            background: "var(--blue-dark-600, #155EEF)",
            boxShadow: "0px 1px 2px 0px rgba(16, 24, 40, 0.05)",
            width: "100%",
          }}
        >
          <Typography
            style={{
              textTransform: "none",
              fontFamily: "Inter",
              fontSize: "18px",
              fontStyle: "normal",
              fontWeight: 600,
              lineHeight: "20px",
              color: "#fff",
            }}
          >
            Create new order
          </Typography>
        </Button>
      </Grid>
    </Grid>
  );
};

export default OptionsMainPage;
