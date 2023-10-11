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

const AuthenticationLogin = () => {
  const { event, company, uid } = useParams();
  console.log(`${event} - ${company} -${uid}`);
  // const event = new URLSearchParams(window.location.search).get("event");
  // const company = new URLSearchParams(window.location.search).get("company");
  // const consumerId = new URLSearchParams(window.location.search).get("uid");
  const consumerId = uid;
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
  const finding = listOfEventsQuery?.data?.data?.list;
  const foundEventInfo = async () => {
    const foundData = await finding?.find(
      (item) =>
        item.eventInfoDetail.eventName === event && item.company === company
    );
    if (foundData) {
      dispatch(onAddEventData(foundData));
      dispatch(onAddEventInfoDetail(foundData?.eventInfoDetail));
      dispatch(onAddEventStaff(foundData?.staff));
      dispatch(onSelectEvent(foundData?.eventInfoDetail.eventName));
      dispatch(onSelectCompany(foundData?.company));
      dispatch(onAddDeviceSetup(foundData?.deviceSetup));
      dispatch(onAddContactInfo(foundData?.contactInfo));
      dispatch(onAddSubscriptionInfo(foundData?.subscription));
      return foundData;
    }
  };
  foundEventInfo();
  const checkIfConsumerExists = () => {
    const check = listOfConsumersQuery?.data?.data?.users?.find(
      (consumer) => consumer.id === consumerId
    );
    return check;
  };
  checkIfConsumerExists();
  dispatch(onAddConsumerInfo(checkIfConsumerExists()));

  if (consumer) {
    const findingStripeCustomer = async () => {
      const finding =
        await stripeCustomersQuery?.data?.data?.stripeCustomerSaved?.find(
          (customer) => customer.email === consumer.email
        );
      dispatch(onAddCustomerStripeInfo(finding));
    };
    findingStripeCustomer();
    const updateConsumerInfoEventAndCompany = async () => {
      const checkCompany = consumer.provider.some(
        (provider) => provider === company
      );
      const checkEvent = consumer.eventSelected.some((item) => item === event);
      if (checkCompany && checkEvent) {
        return navigate("/deviceSelection");
      } else if (!checkCompany && checkEvent) {
        updatingConsumerInfoMutation.mutate({
          id: checkIfConsumerExists().id,
          provider: [...consumer.provider, company],
        });
        dispatch(
          onAddConsumerInfo({
            ...consumer,
            provider: [...consumer.provider, company],
          })
        );
        return navigate("/deviceSelection");
      } else if (!checkEvent && checkCompany) {
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
        return navigate("/deviceSelection");
      } else if (!checkEvent && !checkCompany) {
        updatingConsumerInfoMutation.mutate({
          id: consumer.id,
          eventSelected: [...consumer.eventSelected, event],
          provider: [...consumer.provider, company],
        });
        dispatch(
          onAddConsumerInfo({
            ...consumer,
            eventSelected: [...consumer.eventSelected, event],
            provider: [...consumer.provider, company],
          })
        );
        return navigate("/deviceSelection");
      }
    };
    updateConsumerInfoEventAndCompany();
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
};

export default AuthenticationLogin;
