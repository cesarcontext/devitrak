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
import { useCallback, useEffect, useRef } from "react";
import _ from "lodash";
import { checkArray } from "../../components/utils/checkArray";
import { onAddCompanyInfo } from "../../store/slides/companySlide";
const AuthenticationLogin = () => {
  const { event, company, uid } = useParams();
  const refUpdate = useRef(false);
  const { consumer } = useSelector((state) => state.consumer);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const listOfConsumersQuery = useQuery({
    queryKey: ["listOfConsumers"],
    queryFn: () =>
      devitrackApi.post("/auth/user-query", {
        _id: uid,
      }),
    enabled: false,
    refetchOnMount: false,
  });
  const listOfEventsQuery = useQuery({
    queryKey: ["events"],
    queryFn: () =>
      devitrackApi.post("/event/event-list", {
        _id: event,
      }),
    enabled: false,
    refetchOnMount: false,
  });
  const stripeCustomersQuery = useQuery({
    queryKey: ["stripeCustomers"],
    queryFn: () => devitrackApi.get("/stripe/customers"),
    enabled: false,
    refetchOnMount: false,
  });

  const companyEventQuery = useQuery({
    queryKey: ["companyInfoEvent"],
    queryFn: () =>
      devitrackApi.post("/company/search-company", {
        _id: company,
      }),
    refetchOnMount: false,
  });

  const updatingConsumerInfoMutation = useMutation({
    mutationFn: (consumerProfile) =>
      devitrackApi.patch(`/auth/${consumerProfile.id}`, consumerProfile),
  });

  useEffect(() => {
    const controller = new AbortController();
    listOfConsumersQuery.refetch();
    listOfEventsQuery.refetch();
    stripeCustomersQuery.refetch();
    companyEventQuery.refetch();
    return () => {
      controller.abort();
    };
  }, []);

  if (
    listOfConsumersQuery.data &&
    listOfEventsQuery.data &&
    stripeCustomersQuery.data &&
    companyEventQuery.data
  ) {
    const foundEventInfo = async () => {
      const foundData = checkArray(listOfEventsQuery.data.data.list);
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
      return null;
    };
    foundEventInfo();

    const checkIfConsumerExists = async () => {
      const foundConsumerInfo = checkArray(
        listOfConsumersQuery.data.data.users
      );
      if (foundConsumerInfo) {
        dispatch(onAddConsumerInfo(foundConsumerInfo));
        refUpdate.current = true;
        return foundConsumerInfo;
      }
      return null;
    };
    checkIfConsumerExists();

    const foundStripeConsumerAccountInfo = async () => {
      if (stripeCustomersQuery.data) {
        const stripeCustomerInfo = checkArray(
          stripeCustomersQuery.data.data.stripeCustomerSaved
        );
        if (stripeCustomerInfo) {
          return dispatch(onAddCustomerStripeInfo(stripeCustomerInfo));
        } else {
          const newStripeCust = {
            name: `${consumer.name} ${consumer.lastName}`,
            email: consumer.email,
            phone: `${consumer.phoneNumber}`,
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
      }
    };
    foundStripeConsumerAccountInfo();

    const companyInformation = () => {
      if (companyEventQuery.data) {
        const companyInfo = checkArray(companyEventQuery.data.data.company);
        return dispatch(onAddCompanyInfo(companyInfo));
      }
      return null;
    };
    companyInformation();
    const checkUpdateConsumerEventsListInfo = async () => {
      if (consumer && refUpdate.current) {
        const { provider, eventSelected, company_providers, event_providers } =
          consumer;
        const attendedEvents = new Set();
        const providerPerEvents = new Set();
        const attendedEventProvider = new Set();
        const companyPerProvider = new Set();

        for (let data of provider) {
          providerPerEvents.add(data);
        }
        for (let data of eventSelected) {
          attendedEvents.add(data);
        }
        for (let data of event_providers) {
          attendedEventProvider.add(data);
        }
        for (let data of company_providers) {
          companyPerProvider.add(data);
        }

        if (!attendedEvents.has(checkArray(listOfEventsQuery.data.data.list).eventInfoDetail.eventName)) {
          updatingConsumerInfoMutation.mutate({
            id: consumer.id,
            eventSelected: [
              ...consumer.eventSelected,
              checkArray(listOfEventsQuery.data.data.list).eventInfoDetail.eventName,
            ],
          });
          dispatch(
            onAddConsumerInfo({
              ...consumer,
              eventSelected: [
                ...consumer.eventSelected,
                checkArray(listOfEventsQuery.data.data.list).eventInfoDetail.eventName,
              ],
            })
          );
        }
        if (!providerPerEvents.has(companyInformation().company_name)) {
          updatingConsumerInfoMutation.mutate({
            id: consumer.id,
            provider: [...consumer.provider, companyInformation().company_name],
          });
          dispatch(
            onAddConsumerInfo({
              ...consumer,
              provider: [
                ...consumer.provider,
                companyInformation().company_name,
              ],
            })
          );
        }
        if (!attendedEventProvider.has(event)) {
          updatingConsumerInfoMutation.mutate({
            id: consumer.id,
            event_providers: [...consumer.event_providers, event],
          });
          dispatch(
            onAddConsumerInfo({
              ...consumer,
              event_providers: [...consumer.event_providers, event],
            })
          );
        }
        if (!providerPerEvents.has(company)) {
          updatingConsumerInfoMutation.mutate({
            id: consumer.id,
            company_providers: [...consumer.company_providers, company],
          });
          dispatch(
            onAddConsumerInfo({
              ...consumer,
              company_providers: [...consumer.company_providers, company],
            })
          );
        }

        refUpdate.current = false;
        return navigate("/device");
      }
    };
    checkUpdateConsumerEventsListInfo();

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
