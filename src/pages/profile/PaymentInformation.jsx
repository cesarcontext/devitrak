import { Grid, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import CreditCardIcons from "../../components/CreditCardIcons";
import _ from "lodash"
import { useQuery } from "@tanstack/react-query";
import { devitrackApi } from "../../devitrakApi";
const PaymentInformation = () => {
  const { consumer } = useSelector((state) => state.consumer)
  const { event } = useSelector((state) => state.event)
  const checkLastTransactionQuery = useQuery({
    queryKey: ['stripeTransactionPerConsumer'],
    queryFn: () => devitrackApi.post('/transaction/transaction', {
      provider: event.company,
      'eventInfoDetail.eventName': event.eventInfoDetail.eventName,
      'consumerInfo.email': consumer.email
    }),
    refetchOnMount: false
  })
  useEffect(() => {
    const controller = new AbortController()
    checkLastTransactionQuery.refetch()
    return () => {
      controller.abort()
    }
  }, [])
  const { transactionsHistory } = useSelector((state) => state.stripe);
  if (checkLastTransactionQuery.data) {
    let creditCardInfoLastOrder = [];
    const sortTransactionHistory = () => {
      const groupingByDeposit = _.groupBy(transactionsHistory, "deposit");
      if (groupingByDeposit.hasOwnProperty("deposit")) {
        creditCardInfoLastOrder = [groupingByDeposit["deposit"][0]];
      } else {
        creditCardInfoLastOrder = [
          _,
          {
            charges: {
              data: [
                {
                  payment_method_details: {
                    card: {
                      last4: "XXXX",
                      network: "No-Deposit",
                    },
                  },
                },
              ],
            },
          },
        ];
      }
    };
    sortTransactionHistory();
    const lastFourDigits =
      creditCardInfoLastOrder[0]?.charges?.data[0]?.payment_method_details?.card
        ?.last4;
    const creditCardNetwork =
      creditCardInfoLastOrder[0]?.charges?.data[0]?.payment_method_details?.card
        ?.network;
    return (
      <Grid container>
        <Grid
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
          item
          xs={12}
        >
          <Typography
            color={"var(--gray-900, #101828)"}
            textAlign={"center"}
            fontFamily={"Inter"}
            fontSize={"24px"}
            fontStyle={"normal"}
            fontWeight={600}
            lineHeight={"32px"}
          >
            Payment info
          </Typography>
        </Grid>
        <Grid
          display={"flex"}
          alignItems={"center"}
          justifyContent={"space-between"}
          padding={"20px"}
          margin={"auto"}
          style={{
            background: "var(--gray-100, #F2F4F7)",
            border: "1px solid #FFF",
            borderRadius: "20px",
          }}
          item
          xs={10}
        >
          <Grid
            item
            xs={6}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"flex-start"}
          >
            <Typography
              color={"var(--gray-700, #344054)"}
              textAlign={"center"}
              fontFamily={"Intel"}
              fontSize={"12px"}
              fontStyle={"normal"}
              fontWeight={600}
              // lineHeight={"normal"}
              letterSpacing={"2.4px"}
            >
              &#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679; {lastFourDigits}
            </Typography>
          </Grid>
          <Grid
            item
            xs={6}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"flex-end"}
          >
            <Grid
              display={"flex"}
              alignItems={"center"}
              justifyContent={"flex-start"}
              item
              xs={5}
            >
              <Typography
                color={"var(--gray-700, #344054)"}
                textAlign={"center"}
                fontFamily={"Intel"}
                fontSize={"12px"}
                fontStyle={"normal"}
                fontWeight={600}
                // lineHeight={"normal"}
                letterSpacing={"2.4px"}
                textTransform={"capitalize"}
              >
                {creditCardNetwork}
              </Typography>
            </Grid>
            <Grid
              display={"flex"}
              alignItems={"center"}
              justifyContent={"flex-end"}
              item
              xs={5}
            >
              <Typography
                color={"var(--gray-700, #344054)"}
                textAlign={"center"}
                fontFamily={"Intel"}
                fontSize={"12px"}
                fontStyle={"normal"}
                fontWeight={600}
                // lineHeight={"normal"}
                letterSpacing={"2.4px"}
              >
                <CreditCardIcons props={creditCardNetwork} />
                {/* {<CreditCardIcons props={creditCardNetwork} />} */}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }
};

export default PaymentInformation;
