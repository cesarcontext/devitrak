import { yupResolver } from "@hookform/resolvers/yup";
import { Icon } from "@iconify/react";
import {
  Grid,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Typography,
} from "@mui/material";
import { Button, notification } from "antd";
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
  const { register, handleSubmit, watch } = useForm({
    resolver: yupResolver(schema),
  });
  const [contactPhoneNumber, setContactPhoneNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isErrorMessage, setIsErrorMessage] = useState(null);
  const { event } = useSelector((state) => state.event);
  const { company } = useSelector((state) => state.company);
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
    //https://9dsiqsqjtk.execute-api.us-east-1.amazonaws.com/prod/devitrak/consumers/check-existing-consumer/
    const emailValue = watch("email");
    console.log(emailValue);
    const formatProps = {
      props: { email: emailValue },
      collection: "users",
    };

    const awsResponse = await fetch(
      "https://lxcly5fbd5.execute-api.us-east-1.amazonaws.com/dev/check-consumer",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formatProps),
      }
    );

    const data = await awsResponse.json();
    // const checking = await devitrackApi.post("/auth/user-query", {
    //   email: watch("email"),
    // });
  
    if (data.statusCode === 200) {
      console.log(data)
      const body = JSON.parse(data.body);
      return setConsumerInfoFound([
        { ...body[0], id: body[0]._id ?? body[0].id },
      ]);
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    checkIfConsumerExists();
    return () => {
      controller.abort();
    };
  }, [isValidEmail(watch("email")) && watch("firstName").length > 0]);

  const emailConfirmationForNewConsumer = async (props) => {
    const parametersNeededToLoginLink = {
      consumer: {
        name: props.name,
        lastName: props.lastName,
        email: props.email,
      },
      link: `https://app.devitrak.net/authentication/${event.id}/${company.id}/${props.uid}`,
      contactInfo: event.contactInfo.email,
      event: event.eventInfoDetail.eventName,
      company: company.company_name,
    };
    await devitrackApi.post(
      "/nodemailer/confirmation-account",
      parametersNeededToLoginLink
    );
  };
  const submitNewConsumerInfo = async (data) => {
    try {
      setIsLoading(true);
      emailSentRef.current = true;
      // const newConsumerProfile = {
      //   consumer: {
      //     name: data.firstName,
      //     lastName: data.lastName,
      //     email: data.email,
      //     phoneNumber: contactPhoneNumber,
      //     privacyPolicy: true,
      //     category: "Regular",
      //     provider: [company.company_name],
      //     eventSelected: [event.eventInfoDetail.eventName],
      //     company_providers: [company.id],
      //     event_providers: [event.id],
      //     group: data.groupName,
      //   },
      //   collection: "users",
      // };

      const newConsumerProfile = {
        name: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phoneNumber: contactPhoneNumber,
        privacyPolicy: true,
        category: "Regular",
        provider: [company.company_name],
        eventSelected: [event.eventInfoDetail.eventName],
        company_providers: [company.id],
        event_providers: [event.id],
        group: [data.groupName],
      };

      const respNewConsumer = await devitrackApi.post(
        "/auth/new",
        newConsumerProfile
      );
      if (respNewConsumer.data) {
        const newStripeCustomerProfile = {
          name: `${data.firstName} ${data.lastName}`,
          email: data.email,
          phoneNumber: contactPhoneNumber,
        };
        await devitrackApi.post("/db_consumer/new_consumer", {
          first_name: data.firstName,
          last_name: data.lastName,
          email: data.email,
          phone_number: contactPhoneNumber,
        });
        dispatch(
          onAddConsumerInfo({
            ...newConsumerProfile,
            id: respNewConsumer.data.uid ?? respNewConsumer.data.id,
            ...newConsumerProfile,
            id: respNewConsumer.data.uid ?? respNewConsumer.data.id,
            sqlInfo: {},
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
            emailConfirmationForNewConsumer(consumerInfoParsed);
            return openNotificationWithIcon(
              "success",
              "Account created successfully!",
              "We're taking you to the next step."
            );
          } else {
            openNotificationWithIcon(
              "success",
              "Account created successfully!",
              "We sent an email to confirm and login."
            );
          }
          setIsLoading(false);
          return navigate("/device");
        }
      }
    } catch (error) {
      setIsLoading(false);
      setIsErrorMessage(error.message);
    }
  };

  const styleTypography = {
    textTransform: "none",
    textAlign: "left",
    fontFamily: "Inter",
    fontSize: "14px",
    fontStyle: "normal",
    fontWeight: 500,
    lineHeight: "20px",
    color: "var(--gray-700, #344054)",
  };
  const structuring = [
    {
      title: "Email",
      feature: "email",
      type: "email",
      placeholder: "Enter your email",
      ifPhone: false,
      ifQuestionMark: false,
      questionMark: "",
    },
    {
      title: "First name",
      feature: "firstName",
      type: "text",
      placeholder: "Enter your first name",
      ifPhone: false,
      ifQuestionMark: false,
      questionMark: "",
    },
    {
      title: "Last name",
      feature: "lastName",
      type: "text",
      placeholder: "Enter your first name",
      ifPhone: false,
      ifQuestionMark: false,
      questionMark: "",
    },
    {
      title: "Phone number",
      feature: "phone",
      type: "email",
      placeholder: "Enter your email",
      ifPhone: true,
    },
    {
      title: "Group name",
      feature: "groupName",
      type: "text",
      placeholder: "Enter your group name",
      ifPhone: false,
      ifQuestionMark: true,
      questionMark: '("Unknown" applicable)',
    },
  ];
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
                    ...styleTypography,
                    color: "var(--gray-600, #475467",
                    textAlign: "center",
                    fontSize: "16px",
                    fontWeight: 500,
                    lineHeight: "24px",
                  }}
                >
                  Fill out the form to request devices.
                </p>
              </Grid>
              {structuring.map((item) => {
                if (item.ifPhone) {
                  return (
                    <Grid
                      key={item.title}
                      display={"flex"}
                      flexDirection={"column"}
                      alignItems={"center"}
                      justifyContent={"center"}
                      item
                      xs={12}
                      margin={"1rem 0"}
                    >
                      <InputLabel
                        style={{ marginBottom: "3px", width: "100%" }}
                      >
                        <Typography style={styleTypography}>
                          {item.title}
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
                        style={{
                          margin: "0.1rem auto 1rem",
                          backgroundColor: "var(--basewhite)",
                        }}
                      />
                      <p
                        style={{
                          ...styleTypography,
                          fontWeight: 400,
                          margin: "0.2rem auto 0",
                        }}
                      >
                        {contactPhoneNumber}
                      </p>
                    </Grid>
                  );
                } else {
                  return (
                    <Grid
                      key={item.title}
                      display={"flex"}
                      flexDirection={"column"}
                      alignItems={"center"}
                      justifyContent={"center"}
                      item
                      xs={12}
                      margin={"1rem 0"}
                    >
                      <InputLabel
                        style={{ marginBottom: "3px", width: "100%" }}
                      >
                        <Typography style={styleTypography}>
                          {item.title}{" "}
                          {item.ifQuestionMark && item.questionMark}
                        </Typography>
                      </InputLabel>
                      <OutlinedInput
                        required
                        disabled={emailSentRef.current}
                        type={item.type}
                        endAdornment={
                          <InputAdornment position="end">
                            {emailSentRef.current && (
                              <Icon
                                icon="mdi:checkbox-outline"
                                color="#66c61c"
                              />
                            )}
                          </InputAdornment>
                        }
                        {...register(`${item.feature}`)}
                        style={{
                          borderRadius: "12px",
                          margin: "0.1rem auto 1rem",
                          display: "flex",
                          justifyContent: "flex-start",
                        }}
                        placeholder={`${item.placeholder}`}
                        fullWidth
                      />
                    </Grid>
                  );
                }
              })}
              <Grid item xs={12} margin={"1rem 0"}>
                <Button
                  loading={isLoading}
                  htmlType="submit"
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
                </Button>
              </Grid>{" "}
              {isErrorMessage && <p>{isErrorMessage}</p>}
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
