import { useMutation, useQuery } from "@tanstack/react-query";
import { devitrackApi } from "../../devitrakApi";
import { onAddConsumerInfo } from "../../store/slides/consumerSlide";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
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
  const event = new URLSearchParams(window.location.search).get("event");
  const company = new URLSearchParams(window.location.search).get("company");
  const consumerId = new URLSearchParams(window.location.search).get("uid");
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
  if (listOfConsumersQuery.data) {
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
      const check = listOfConsumersQuery.data.data.users.find(
        (consumer) => consumer.id === consumerId
      );
      return check;
    };
    checkIfConsumerExists();

    const findingStripeCustomer =
      stripeCustomersQuery?.data?.data?.stripeCustomerSaved?.find(
        (customer) => customer.email === checkIfConsumerExists().email
      );
    dispatch(onAddCustomerStripeInfo(findingStripeCustomer));
    const updateConsumerInfoEventAndCompany = () => {
      const checkCompany = checkIfConsumerExists().provider.some(
        (provider) => provider === company
      );
      const checkEvent = checkIfConsumerExists().eventSelected.some(
        (item) => item === event
      );
      if (checkCompany && checkEvent) {
        dispatch(onAddConsumerInfo(checkIfConsumerExists()));
        return navigate("/device-selection");
      }
      if (!checkCompany && checkEvent) {
        updatingConsumerInfoMutation.mutate({
          id: checkIfConsumerExists().id,
          provider: [...checkIfConsumerExists().provider, company],
        });
      }
      if (!checkEvent && checkCompany) {
        updatingConsumerInfoMutation.mutate({
          id: checkIfConsumerExists().id,
          eventSelected: [...checkIfConsumerExists().eventSelected, event],
        });
      }
      if (!checkEvent && !checkCompany) {
        updatingConsumerInfoMutation.mutate({
          id: checkIfConsumerExists().id,
          eventSelected: [...checkIfConsumerExists().eventSelected, event],
          provider: [...checkIfConsumerExists().provider, company],
        });
      }

      return navigate("/device-selection");
    };

    updateConsumerInfoEventAndCompany();
    if (listOfConsumersQuery.isLoading || listOfConsumersQuery.isLoading) {
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
