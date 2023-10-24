import { useMutation, useQuery } from "@tanstack/react-query";
import { devitrackApi } from "../../devitrakApi";
import { onAddConsumerInfo } from "../../store/slides/consumerSlide";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  onAddContactInfo,
  onAddDeviceSetup,
  onAddEventData,
  onAddEventInfoDetail,
  onAddEventStaff,
  onAddSubscriptionInfo,
  onSelectCompany,
  onSelectEvent,
} from "../../store/slides/eventSlide";
import { Grid, Typography } from "@mui/material";
import { onAddCustomerStripeInfo } from "../../store/slides/stripeSlide";
import { useRef } from "react";

const AuthenticationLogin = () => {
  const { event, company, uid } = useParams();
  const consumerId = uid;
  const _ = require("lodash");
  const refUpdate = useRef(false);
  const { consumer } = useSelector((state) => state.consumer);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const listOfConsumersQuery = useQuery({
    queryKey: ["listOfConsumers"],
    queryFn: () => devitrackApi.get("/auth/users"),
  });
  const listOfEventsQuery = useQuery({
    queryKey: ["events"],
    queryFn: () => devitrackApi.get("/event/event-list"),
  });
  const stripeCustomersQuery = useQuery({
    queryKey: ["stripeCustomers"],
    queryFn: () => devitrackApi.get("/stripe/customers"),
  });
  const updatingConsumerInfoMutation = useMutation({
    mutationFn: (consumerProfile) =>
      devitrackApi.patch(`/auth/${consumerProfile.id}`, consumerProfile),
  });

  if (
    listOfConsumersQuery.data &&
    listOfEventsQuery.data &&
    stripeCustomersQuery.data
  ) {
    const foundEventInfo = async () => {
      const groupingByEvents = await _.groupBy(
        listOfEventsQuery.data.data.list,
        "eventInfoDetail.eventName"
      );

      const foundData = await groupingByEvents[event].at(-1);
      if (foundData) {
        dispatch(onAddEventData(foundData));
        dispatch(onAddEventInfoDetail(foundData.eventInfoDetail));
        dispatch(onAddEventStaff(foundData.staff));
        dispatch(onSelectEvent(foundData.eventInfoDetail.eventName));
        dispatch(onSelectCompany(foundData.company));
        dispatch(onAddDeviceSetup(foundData.deviceSetup));
        dispatch(onAddContactInfo(foundData.contactInfo));
        dispatch(onAddSubscriptionInfo(foundData.subscription));
        return foundData;
      }
    };
    foundEventInfo();

    const checkIfConsumerExists = async () => {
      const groupingByConsumers = await _.groupBy(
        listOfConsumersQuery.data.data.users,
        "id"
      );
      const foundConsumerInfo = await groupingByConsumers[consumerId];
      if (foundConsumerInfo) {
        dispatch(onAddConsumerInfo(foundConsumerInfo.at(-1)));
        refUpdate.current = true;
        return foundConsumerInfo;
      }
    };
    checkIfConsumerExists();

    const foundStripeConsumerAccountInfo = async () => {
      const groupingByStripeAccount = _.groupBy(
        stripeCustomersQuery.data.data.stripeCustomerSaved,
        "email"
      );
      if (groupingByStripeAccount) {
        if (groupingByStripeAccount.hasOwnProperty(consumer.email)) {
          return dispatch(
            onAddCustomerStripeInfo(
              groupingByStripeAccount[consumer.email].at(-1)
            )
          );
        }
        const newStripeCust = {
          name: `${consumer.name} ${consumer.lastName}`,
          email: consumer.email,
          phone: consumer.phoneNumber,
        };
        const respCreateStripeCustomer = await devitrackApi.post(
          "/stripe/customer",
          newStripeCust
        );
        if (respCreateStripeCustomer) {
          return dispatch(
            onAddCustomerStripeInfo({
              ...respCreateStripeCustomer,
              name: newStripeCust.name,
              email: newStripeCust.email,
              phone: newStripeCust.phone,
              stripeid: respCreateStripeCustomer.stripeid,
            })
          );
        }
      }
    };
    foundStripeConsumerAccountInfo();
    const checkUpdateConsumerEventsListInfo = async () => {
      if (consumer && refUpdate.current) {
        const { provider, eventSelected } = consumer;
        const attendedEvents = {};
        const providerPerEvents = {};
        for (let data of provider) {
          if (!providerPerEvents[data]) {
            providerPerEvents[data] = data;
          }
        }
        for (let data of eventSelected) {
          if (!attendedEvents[data]) {
            attendedEvents[data] = data;
          }
        }

        if (!attendedEvents.hasOwnProperty(event)) {
          updatingConsumerInfoMutation.mutate({
            id: consumer.id,
            eventSelected: [...consumer.eventSelected, event],
          });
          dispatch(
            onAddConsumerInfo({
              ...consumer,
              eventSelected: [...consumer.eventSelected, event],
            })
          );
        }
        if (!providerPerEvents.hasOwnProperty(event)) {
          updatingConsumerInfoMutation.mutate({
            id: consumer.id,
            provider: [...consumer.provider, company],
          });
          dispatch(
            onAddConsumerInfo({
              ...consumer,
              provider: [...consumer.provider, company],
            })
          );
        }
        refUpdate.current = false;
        return navigate("/deviceSelection");
      }
    };

    checkUpdateConsumerEventsListInfo();
    // if (consumer) {
    //   const updateConsumerInfoEventAndCompany = async () => {
    //     const checkCompany = consumer.provider.some(
    //       (provider) => provider === company
    //     );
    //     const checkEvent = consumer.eventSelected.some(
    //       (item) => item === event
    //     );
    //     if (checkCompany && checkEvent) {
    //       return navigate("/deviceSelection");
    //     } else if (!checkCompany && checkEvent) {
    //       updatingConsumerInfoMutation.mutate({
    //         id: checkIfConsumerExists().id,
    //         provider: [...consumer.provider, company],
    //       });
    //       dispatch(
    //         onAddConsumerInfo({
    //           ...consumer,
    //           provider: [...consumer.provider, company],
    //         })
    //       );
    //       return navigate("/deviceSelection");
    //     } else if (!checkEvent && checkCompany) {
    //       updatingConsumerInfoMutation.mutate({
    //         id: consumer.id,
    //         eventSelected: [...consumer.eventSelected, event],
    //       });
    //       dispatch(
    //         onAddConsumerInfo({
    //           ...consumer,
    //           eventSelected: [...consumer.eventSelected, event],
    //         })
    //       );
    //       return navigate("/deviceSelection");
    //     } else if (!checkEvent && !checkCompany) {
    //       updatingConsumerInfoMutation.mutate({
    //         id: consumer.id,
    //         eventSelected: [...consumer.eventSelected, event],
    //         provider: [...consumer.provider, company],
    //       });
    //       dispatch(
    //         onAddConsumerInfo({
    //           ...consumer,
    //           eventSelected: [...consumer.eventSelected, event],
    //           provider: [...consumer.provider, company],
    //         })
    //       );
    //       return navigate("/deviceSelection");
    //     }
    //   };
    // updateConsumerInfoEventAndCompany();
    if (listOfConsumersQuery.isLoading || listOfConsumersQuery.isFetching) {
      return (
        <Grid container>
          <Grid
            display={"flex"}
            flexDirection={"column"}
            alignItems={"center"}
            alignSelf={"stretch"}
            justifyContent={"center"}
            item
            xs={12}
            margin={"15rem 0"}
          >
            {" "}
            <Typography
              color={"var(--gray-900, #101828)"}
              textAlign={"center"}
              /* Display xs/Semibold */
              fontFamily={"Inter"}
              fontSize={"24px"}
              fontStyle={"normal"}
              fontWeight={600}
              lineHeight={"32px"}
              style={{
                textWrap: "balance",
              }}
            >
              Please give us a moment while we&apos;re authenticating your
              account.
            </Typography>
          </Grid>
        </Grid>
      );
    }
  }
  // }
};

export default AuthenticationLogin;
