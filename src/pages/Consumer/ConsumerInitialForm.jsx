import { yupResolver } from "@hookform/resolvers/yup";
import { Icon } from "@iconify/react";
import {
  Grid,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Typography,
} from "@mui/material";
import { notification } from "antd";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import IndicatorProgressBottom from "../../components/indicatorBottom/IndicatorProgressBottom";
import { isValidEmail } from "../../components/utils/isValidEmail";
import { devitrackApi } from "../../devitrakApi";
import { onAddConsumerInfo } from "../../store/slides/consumerSlide";
import { onAddCustomerStripeInfo } from "../../store/slides/stripeSlide";
import "./ConsumerInitialForm.css";
const schema = yup
  .object({
    firstName: yup.string().required("First name is required"),
    lastName: yup.string().required("Last name is required"),
    email: yup
      .string()
      .email("Email has an invalid format")
      .required("Email is required"),
  })
  .required();

const ConsumerInitialForm = ({ setConsumerInfoFound }) => {
  const emailSentRef = {
    current: false,
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    resolver: yupResolver(schema),
  });
  const [contactPhoneNumber, setContactPhoneNumber] = useState("");
  const [groupName, setGroupName] = useState("");
  const { contactInfo, event } = useSelector(
    (state) => state.event
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [api, contextHolder] = notification.useNotification();
  const openNotificationWithIcon = (type, msg, dspt) => {
    api[type]({
      message: msg,
      description: dspt,
    });
  };
  const checkIfConsumerExists = async () => {
    const checking = await devitrackApi.post("/auth/user-query", {
      email: watch("email"),
    });
    if (checking.data) {
      return setConsumerInfoFound(checking.data.users);
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    checkIfConsumerExists();
    return () => {
      controller.abort();
    };
  }, [isValidEmail(watch("email")), String(watch("email")).length]);

  const emailConfirmationForNewConsumer = async (props) => {
    const parametersNeededToLoginLink = {
      consumer: {
        name: props.name,
        lastName: props.lastName,
        email: props.email,
      },
      link: `https://app.devitrak.net/authentication/${event.id}/${company.id}/${props.uid}`,
      contactInfo: contactInfo.email,
      event: event.eventInfoDetail.eventName,
      company: event.company,
    };
    const respo = await devitrackApi.post(
      "/nodemailer/confirmation-account",
      parametersNeededToLoginLink
    );
    if (respo) return true;
    return false;
  };
  const submitNewConsumerInfo = async (data) => {
    emailSentRef.current = true;
    const newConsumerProfile = {
      name: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phoneNumber: contactPhoneNumber,
      privacyPolicy: true,
      category: "Regular",
      provider: [company],
      eventSelected: [choice],
      group: `${groupName !== "" ? groupName : "No group provided."}`,
    };
    const respNewConsumer = await devitrackApi.post(
      "/auth/new",
      newConsumerProfile
    );
    if (respNewConsumer) {
      const newStripeCustomerProfile = {
        name: `${data.firstName} ${data.lastName}`,
        email: data.email,
        phoneNumber: contactPhoneNumber,
      };
      await devitrackApi.post("/db_consumer/new_consumer", {
        first_name: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phoneNumber: contactPhoneNumber,
      });
      dispatch(
        onAddConsumerInfo({
          ...newConsumerProfile,
          id: respNewConsumer.data.uid,
        })
      );
      const newStripeCustomer = await devitrackApi.post(
        "/stripe/customer",
        newStripeCustomerProfile
      );
      if (newStripeCustomer) {
        dispatch(
          onAddCustomerStripeInfo({
            customerName: newStripeCustomer.data.fullName,
            customerEmail: newStripeCustomer.data.email,
            customerPhone: newStripeCustomer.data.phone,
            stripeID: newStripeCustomer.data.id,
            customerData: newStripeCustomer.data.customer,
          })
        );
        if (!event.eventInfoDetail.merchant) {
          if (emailConfirmationForNewConsumer(respNewConsumer.data)) {
            return openNotificationWithIcon(
              "success",
              "Account created successfully!",
              "We're taking you to the next step."
            );
          }
        } else {
          openNotificationWithIcon(
            "success",
            "Account created successfully!",
            "We sent an email to confirm and login."
          );
          return navigate("/deviceSelect");
        }
      }
    }
  };

  // const resettingFields = () => {
  //   setValue("email", "");
  //   setValue("firstName", "");
  //   setValue("lastName", "");
  //   setContactPhoneNumber("");
  //   setGroupName("");
  //   setConsumerInfoFound([]);
  //   return;
  // };

  return (
    <>
      {contextHolder}
      <Grid
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"center"}
        alignItems={"center"}
        margin={"0 0 2rem"}
        gap={2}
        container
      >
        <Grid
          display={"flex"}
          justifyContent={"center"}
          alignSelf={"stretch"}
          gap={2}
          container
        >
          <Grid
            display={"flex"}
            justifyContent={"center"}
            marginBottom={3}
            item
            xs={11}
            sm={11}
            md={6}
            lg={6}
          >
            <form
              style={{
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
              }}
              onSubmit={handleSubmit(submitNewConsumerInfo)}
              className="form"
            >
              <Grid
                display={"flex"}
                flexDirection={"column"}
                alignItems={"center"}
                alignSelf={"stretch"}
                justifyContent={"center"}
                item
                xs={12}
                margin={"1rem 0"}
              >
                <p
                  style={{
                    color: "var(--gray-900, #101828)",
                    textAlign: "center",
                    fontFamily: "Inter",
                    fontSize: "24px",
                    fontStyle: "normal",
                    fontWeight: 600,
                    lineHeight: "32px",
                  }}
                >
                  Request devices
                </p>
              </Grid>
              <Grid
                display={"flex"}
                flexDirection={"column"}
                alignItems={"center"}
                alignSelf={"stretch"}
                justifyContent={"center"}
                item
                xs={12}
                margin={"1rem 0"}
              >
                <p
                  style={{
                    color: "var(--gray-600, #475467",
                    textAlign: "center",
                    fontFamily: "Inter",
                    fontSize: "16px",
                    fontStyle: "normal",
                    fontWeight: 500,
                    lineHeight: "24px",
                  }}
                >
                  Fill out the form to request devices.
                </p>
              </Grid>
              <Grid
                display={"flex"}
                flexDirection={"column"}
                alignItems={"center"}
                justifyContent={"center"}
                item
                xs={12}
                margin={"1rem 0"}
              >
                <InputLabel style={{ marginBottom: "3px", width: "100%" }}>
                  <p
                    style={{
                      textTransform: "none",
                      textAlign: "left",
                      fontFamily: "Inter",
                      fontSize: "14px",
                      fontStyle: "normal",
                      fontWeight: 500,
                      lineHeight: "20px",
                      color: "var(--gray-700, #344054)",
                    }}
                  >
                    Email
                  </p>
                </InputLabel>
                <OutlinedInput
                  required
                  disabled={emailSentRef.current}
                  endAdornment={
                    <InputAdornment position="end">
                      {emailSentRef.current && (
                        <Icon icon="mdi:checkbox-outline" color="#66c61c" />
                      )}
                    </InputAdornment>
                  }
                  {...register("email", { require: true })}
                  type="email"
                  style={{
                    borderRadius: "12px",
                    border: `${errors.email && "solid 1px #004EEB"}`,
                    margin: "0.1rem auto 1rem",
                  }}
                  placeholder="Enter your email"
                  fullWidth
                />
              </Grid>
              <Grid
                display={"flex"}
                flexDirection={"column"}
                alignItems={"center"}
                justifyContent={"center"}
                item
                xs={12}
                margin={"1rem 0"}
              >
                <InputLabel style={{ marginBottom: "3px", width: "100%" }}>
                  <p
                    style={{
                      textTransform: "none",
                      textAlign: "left",
                      fontFamily: "Inter",
                      fontSize: "14px",
                      fontStyle: "normal",
                      fontWeight: 500,
                      lineHeight: "20px",
                      color: "var(--gray-700, #344054)",
                    }}
                  >
                    First name
                  </p>
                </InputLabel>
                <OutlinedInput
                  required
                  disabled={emailSentRef.current}
                  endAdornment={
                    <InputAdornment position="end">
                      {emailSentRef.current && (
                        <Icon icon="mdi:checkbox-outline" color="#66c61c" />
                      )}
                    </InputAdornment>
                  }
                  {...register("firstName")}
                  style={{
                    borderRadius: "12px",
                    margin: "0.1rem auto 1rem",
                    display: "flex",
                    justifyContent: "flex-start",
                  }}
                  placeholder="Enter your first name"
                  fullWidth
                />
              </Grid>
              <Grid
                display={"flex"}
                flexDirection={"column"}
                alignItems={"center"}
                justifyContent={"center"}
                item
                xs={12}
                margin={"1rem 0"}
              >
                <InputLabel style={{ marginBottom: "3px", width: "100%" }}>
                  <Typography
                    textTransform={"none"}
                    textAlign={"left"}
                    fontFamily={"Inter"}
                    fontSize={"14px"}
                    fontStyle={"normal"}
                    fontWeight={500}
                    lineHeight={"20px"}
                    color={"var(--gray-700, #344054)"}
                  >
                    Last name
                  </Typography>
                </InputLabel>
                <OutlinedInput
                  required
                  disabled={emailSentRef.current}
                  endAdornment={
                    <InputAdornment position="end">
                      {emailSentRef.current && (
                        <Icon icon="mdi:checkbox-outline" color="#66c61c" />
                      )}
                    </InputAdornment>
                  }
                  {...register("lastName")}
                  style={{
                    borderRadius: "12px",
                    margin: "0.1rem auto 1rem",
                    display: "flex",
                    justifyContent: "flex-start",
                  }}
                  placeholder="Enter your last name"
                  fullWidth
                />
              </Grid>
              <Grid
                display={"flex"}
                flexDirection={"column"}
                alignItems={"center"}
                justifyContent={"center"}
                item
                xs={12}
                margin={"1rem 0"}
              >
                <InputLabel style={{ marginBottom: "3px", width: "100%" }}>
                  <Typography
                    textTransform={"none"}
                    textAlign={"left"}
                    fontFamily={"Inter"}
                    fontSize={"14px"}
                    fontStyle={"normal"}
                    fontWeight={500}
                    lineHeight={"20px"}
                    color={"var(--gray-700, #344054)"}
                  >
                    Phone number
                  </Typography>
                </InputLabel>

                <PhoneInput
                  disabled={emailSentRef.current}
                  className="phone-input-form"
                  countrySelectProps={{ unicodeFlags: true }}
                  defaultCountry="US"
                  placeholder="Enter your phone number"
                  value={contactPhoneNumber}
                  onChange={setContactPhoneNumber}
                  style={{ margin: "0.1rem auto 1rem" }}
                />
                <p
                  style={{
                    textTransform: "none",
                    textAlign: "left",
                    fontFamily: "Inter",
                    fontSize: "14px",
                    fontStyle: "normal",
                    fontWeight: 400,
                    lineHeight: "20px",
                    color: "var(--gray-700, #344054)",
                  }}
                >
                  {contactPhoneNumber}
                </p>
              </Grid>
              <Grid
                display={"flex"}
                flexDirection={"column"}
                alignItems={"center"}
                justifyContent={"center"}
                item
                xs={12}
                margin={"1rem 0"}
              >
                <InputLabel style={{ marginBottom: "3px", width: "100%" }}>
                  <p
                    style={{
                      textTransform: "none",
                      textAlign: "left",
                      fontFamily: "Inter",
                      fontSize: "14px",
                      fontStyle: "normal",
                      fontWeight: 500,
                      lineHeight: "20px",
                      color: "var(--gray-700, #344054)",
                    }}
                  >
                    Group name (Optional)
                  </p>
                </InputLabel>
                <OutlinedInput
                  required
                  disabled={emailSentRef.current}
                  endAdornment={
                    <InputAdornment position="end">
                      {emailSentRef.current && (
                        <Icon icon="mdi:checkbox-outline" color="#66c61c" />
                      )}
                    </InputAdornment>
                  }
                  value={groupName}
                  name="groupName"
                  onChange={(e) => setGroupName(e.target.value)}
                  style={{
                    borderRadius: "12px",
                    margin: "0.1rem auto 1rem",
                    display: "flex",
                    justifyContent: "flex-start",
                  }}
                  placeholder="Enter your group name"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} margin={"1rem 0"}>
                <button
                  type="submit"
                  style={{
                    display: `${emailSentRef.current ? "none" : "flex"}`,
                    padding: "12px 20px",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "8px",
                    alignSelf: "stretch",
                    borderRadius: "8px",
                    border: "1px solid var(--blue-dark-600, #155EEF)",
                    background: "var(--blue-dark-600, #155EEF)",
                    boxShadow: "0px 1px 2px 0px rgba(16, 24, 40, 0.05)",
                    width: "100%",
                  }}
                >
                  <p
                    style={{
                      textTransform: "none",
                      fontFamily: "Inter",
                      fontSize: "16px",
                      fontStyle: "normal",
                      fontWeight: 600,
                      lineHeight: "24px",
                      color: "var(--base-white, #FFF)",
                      margin: 0,
                    }}
                  >
                    Continue
                  </p>
                </button>
              </Grid>{" "}
            </form>
          </Grid>{" "}
        </Grid>
      </Grid>
      <Grid
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
        item
        xs={12}
      >
        <IndicatorProgressBottom
          steps={event.eventInfoDetail.merchant ? 3 : 2}
          current={event.eventInfoDetail.merchant ? 35 : 50}
        />
      </Grid>{" "}
    </>
  );
  // }
};

export default ConsumerInitialForm;
