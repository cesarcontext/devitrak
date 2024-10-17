import { useMutation, useQuery } from "@tanstack/react-query";
import { devitrackApi, devitrackAWSApi } from "../../devitrakApi";
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
import { useEffect, useRef, useState } from "react";
import { checkArray } from "../../components/utils/checkArray";
import { onAddCompanyInfo } from "../../store/slides/companySlide";
import Loading from "../../components/animations/Loading";
const AuthenticationLogin = () => {
  const { event, company, uid } = useParams();
  const refUpdate = useRef(false);
  const { consumer } = useSelector((state) => state.consumer);
  const [consumerInfoRetrieve, setConsumerInfoRetrieve] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const consumerInfoFound = async () => {
    const formatProps = {
      props: { _id: uid },
      collection: "users",
    };
    const checking = await devitrackAWSApi
      .post("/consumers/check-existing-consumer/", JSON.stringify(formatProps))
      .then((data) => data);
    const consumerInfo = await checking.data;
    return consumerInfo;
  };

  const listOfConsumersQuery = useQuery({
    queryKey: ["listOfConsumers"],
    queryFn: () =>
      devitrackApi.post("/auth/user-query", {
        _id: uid,
      }),
    refetchOnMount: false,
  });
  const listOfEventsQuery = useQuery({
    queryKey: ["events"],
    queryFn: () =>
      devitrackApi.post("/event/event-list", {
        _id: event,
      }),
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
    companyEventQuery.refetch();
    consumerInfoFound();
    return () => {
      controller.abort();
    };
  }, []);
  // if (
  //   listOfConsumersQuery.data &&
  //   listOfEventsQuery.data &&
  //   companyEventQuery.data
  // ) {
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

  const checkIfConsumerExists = async () => {
    const foundConsumerInfo = checkArray(
      listOfConsumersQuery?.data?.data?.users
    );
    if (foundConsumerInfo) {
      refUpdate.current = true;
      return setConsumerInfoRetrieve(foundConsumerInfo);
    }
    return null;
  };
  const companyInformation = () => {
    if (companyEventQuery.data) {
      const companyInfo = checkArray(companyEventQuery.data.data.company);
      return dispatch(onAddCompanyInfo(companyInfo));
    }
    return null;
  };

  useEffect(() => {
    const controller = new AbortController();
    foundEventInfo();
    checkIfConsumerExists();
    companyInformation();

    return () => {
      controller.abort();
    };
  }, [
    listOfConsumersQuery.data &&
      listOfEventsQuery.data &&
      companyEventQuery.data,
  ]);

  const foundStripeConsumerAccountInfo = async () => {
    if (consumerInfoFound) {
      const stripeCustomer = await devitrackApi.post("/stripe/customers", {
        email: consumerInfoRetrieve.email,
      });
      if (stripeCustomer.data.ok) {
        const stripeCustomerInfo = checkArray(
          stripeCustomer?.data?.data?.stripeCustomerSaved
        );
        if (stripeCustomerInfo) {
          return dispatch(onAddCustomerStripeInfo(stripeCustomerInfo));
        } else {
          const newStripeCust = {
            name: `${consumerInfoRetrieve.name} ${consumerInfoRetrieve.lastName}`,
            email: consumerInfoRetrieve.email,
            phone: `${consumerInfoRetrieve.phoneNumber}`,
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
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    foundStripeConsumerAccountInfo();
    return () => {
      controller.abort();
    };
  }, [consumerInfoRetrieve]);

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

      if (
        !attendedEvents.has(
          checkArray(listOfEventsQuery.data.data.list).eventInfoDetail.eventName
        )
      ) {
        updatingConsumerInfoMutation.mutate({
          id: consumer.id,
          eventSelected: [
            ...consumer.eventSelected,
            checkArray(listOfEventsQuery.data.data.list).eventInfoDetail
              .eventName,
          ],
        });
        dispatch(
          onAddConsumerInfo({
            ...consumer,
            eventSelected: [
              ...consumer.eventSelected,
              checkArray(listOfEventsQuery.data.data.list).eventInfoDetail
                .eventName,
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
            provider: [...consumer.provider, companyInformation().company_name],
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
    }
  };
  
  useEffect(() => {
    const controller = new AbortController();
    checkUpdateConsumerEventsListInfo();
    setTimeout(() => {
      return navigate("/device");
    }, 3500);
    return () => {
      controller.abort();
    };
  }, [listOfConsumersQuery.data]);

  // if (listOfConsumersQuery.isLoading || listOfConsumersQuery.isFetching) {
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
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            margin: "auto",
            height: "20svh",
            width: "20svh",
          }}
        >
          <Loading />
        </div>
        <Typography
          color={"var(--gray-900, #101828)"}
          textAlign={"center"}
          fontFamily={"Inter"}
          fontSize={"18px"}
          fontStyle={"normal"}
          fontWeight={600}
          lineHeight={"20px"}
          style={{
            textWrap: "balance",
          }}
        >
          Please give us a moment while we&apos;re authenticating your account.
        </Typography>
      </Grid>
    </Grid>
  );
  // }
  // }
};

export default AuthenticationLogin;
