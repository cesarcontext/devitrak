import { Icon } from "@iconify/react";
import {
  // Button,
  InputLabel,
  OutlinedInput,
  Typography,
  Grid,
  InputAdornment,
} from "@mui/material";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useQuery } from "@tanstack/react-query";
import "./ConsumerInitialForm.css";
import { useRef, useState } from "react";
import { devitrackApi } from "../../devitrakApi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { onAddConsumerInfo } from "../../store/slides/consumerSlide";
import { onAddCustomerStripeInfo } from "../../store/slides/stripeSlide";
import { nanoid } from "@reduxjs/toolkit";
import { Button } from "antd";
import IndicatorProgressBottom from "../../components/indicatorBottom/IndicatorProgressBottom";
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

const loadingStatus = {
  idle: false,
  error: false,
  loading: true,
  success: false,
};
const ConsumerInitialForm = () => {
  const [loadingState, setLoadingState] = useState(loadingStatus.idle);
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
  });
  const [contactPhoneNumber, setContactPhoneNumber] = useState("");
  const [groupName, setGroupName] = useState("");
  const { choice, company, contactInfo } = useSelector((state) => state.event);
  const emailSentRef = useRef(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const listOfConsumersQuery = useQuery({
    queryKey: ["listOfConsumers"],
    queryFn: () => devitrackApi.get("/auth/users"),
  });

  if (listOfConsumersQuery.data) {
    const checkIfConsumerExists = () => {
      const check = listOfConsumersQuery?.data?.data?.users?.find(
        (consumer) => consumer.email === watch("email")
      );
      return check;
    };
    checkIfConsumerExists();
    const submitEmailToLoginForExistingConsumer = async () => {
      emailSentRef.current = true;
      setLoadingState(loadingStatus.loading);
      const parametersNeededToLoginLink = {
        consumer: checkIfConsumerExists(),
        link: `https://app.devitrak.net/authentication?uis=${nanoid(
          250
        )}&event=${encodeURI(choice)}&ssn=${nanoid(120)}&company=${encodeURI(
          company
        )}&uid=${checkIfConsumerExists().id}&hus=${nanoid(50)}&pmm=${nanoid(
          30
        )}`,
        contactInfo: contactInfo.email,
      };
      const respo = await devitrackApi.post(
        "/nodemailer/login-existing-consumer",
        parametersNeededToLoginLink
      );
      if (respo) {
        setLoadingState(loadingStatus.success);
      }
    };

    const submitNewConsumerInfo = async (data) => {
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
          navigate("/device-selection");
        }
      }
    };
    const resetForm = () => {
      emailSentRef.current = false;
      return setValue("email", "");
    };
    return (
      <>
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
              xs={10}
            >
              <form
                style={{
                  width: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                  // textAlign: "left",
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
                  <Typography
                    color={"var(--gray-900, #101828)"}
                    textAlign={"center"}
                    /* Display xs/Semibold */
                    fontFamily={"Inter"}
                    fontSize={"24px"}
                    fontStyle={"normal"}
                    fontWeight={600}
                    lineHeight={"32px"}
                  >
                    Request devices
                  </Typography>
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
                  <Typography
                    color={"var(--gray-600, #475467"}
                    textAlign={"center"}
                    /* Display xs/Semibold */
                    fontFamily={"Inter"}
                    fontSize={"16px"}
                    fontStyle={"normal"}
                    fontWeight={500}
                    lineHeight={"24px"}
                  >
                    Fill out the form to request devices.
                  </Typography>
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
                      Email
                    </Typography>
                  </InputLabel>
                  <OutlinedInput
                    disabled={emailSentRef.current}
                    endAdornment={
                      <InputAdornment position="end">
                        {emailSentRef.current === true && (
                          <Icon icon="mdi:checkbox-outline" color="#66c61c" />
                        )}
                      </InputAdornment>
                    }
                    {...register("email", { require: true })}
                    type="email"
                    aria-invalid={errors.email ? true : false}
                    style={{
                      borderRadius: "12px",
                      border: `${errors.email && "solid 1px #004EEB"}`,
                      margin: "0.1rem auto 1rem",
                    }}
                    placeholder="Enter your email"
                    fullWidth
                  />
                  {errors.email && (
                    <Typography
                      textTransform={"none"}
                      textAlign={"left"}
                      fontFamily={"Inter"}
                      fontSize={"14px"}
                      fontStyle={"normal"}
                      fontWeight={500}
                      lineHeight={"20px"}
                      color={"#ff6363"}
                    >
                      **{errors?.email?.message}
                    </Typography>
                  )}
                </Grid>
                {checkIfConsumerExists() && (
                  <Typography
                    color={"var(--gray-600, #475467)"}
                    /* Text sm/Regular */
                    fontFamily={"Inter"}
                    fontSize={"14px"}
                    fontStyle={"normal"}
                    fontWeight={400}
                    lineHeight={"20px"}
                  >
                    Welcome back, {checkIfConsumerExists().name}! Your email is
                    already in the system. Continue by sending an email to your
                    inbox that contains a link for you to log in.
                  </Typography>
                )}
                {checkIfConsumerExists() && (
                  <>
                    <Grid item xs={12} margin={"1rem 0"}>
                      <Button
                        loading={loadingState}
                        onClick={() => submitEmailToLoginForExistingConsumer()}
                        style={{
                          display: "flex",
                          padding: "12px 20px",
                          justifyContent: "center",
                          alignItems: "center",
                          gap: "8px",
                          alignSelf: "stretch",
                          borderRadius: "8px",
                          border: `${
                            emailSentRef.current === true
                              ? "1px solid var(--gray-300, #D0D5DD)"
                              : "1px solid var(--blue-dark-600, #155EEF)"
                          }`,
                          background: `${
                            emailSentRef.current === true
                              ? "var(--base-white, #FFF)"
                              : "var(--blue-dark-600, #155EEF)"
                          }`,
                          boxShadow: "0px 1px 2px 0px rgba(16, 24, 40, 0.05)",
                          width: "100%",
                        }}
                      >
                        <Typography
                          textTransform={"none"}
                          fontFamily={"Inter"}
                          fontSize={"16px"}
                          fontStyle={"normal"}
                          fontWeight={600}
                          lineHeight={"24px"}
                          color={`${
                            emailSentRef.current === true
                              ? "var(--gray-700, #344054)"
                              : "var(--base-white, #FFF)"
                          }`}
                        >
                          {emailSentRef.current === true
                            ? "Send email again"
                            : "Send login email"}
                        </Typography>
                      </Button>
                    </Grid>
                    <Grid
                      display={"flex"}
                      justifyContent={"center"}
                      alignItems={"center"}
                      item
                      xs={12}
                      margin={"1rem 0"}
                    >
                      <Button
                        onClick={() => resetForm()}
                        style={{
                          display: "flex",
                          padding: "12px 20px",
                          justifyContent: "center",
                          alignItems: "center",
                          gap: "8px",
                          alignSelf: "stretch",
                          borderRadius: "8px",
                          border: "transparent",
                          background: "transparent",
                          width: "100%",
                        }}
                      >
                        <Typography
                          textTransform={"none"}
                          fontFamily={"Inter"}
                          fontSize={"16px"}
                          fontStyle={"normal"}
                          fontWeight={600}
                          lineHeight={"24px"}
                          color={"var(--blue-dark-700, #004EEB)"}
                        >
                          <Icon
                            icon="icon-park-outline:return"
                            width={20}
                            height={20}
                            color="var(--blue-dark-700, #004EEB)"
                          />
                          &nbsp;Start over
                        </Typography>
                      </Button>
                    </Grid>
                  </>
                )}

                {!checkIfConsumerExists() && (
                  <>
                    <Grid
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
                          First name
                        </Typography>
                      </InputLabel>
                      <OutlinedInput
                        {...register("firstName")}
                        aria-invalid={errors.firstName ? true : false}
                        style={{
                          borderRadius: "12px",
                          border: `${errors.firstName && "solid 1px #004EEB"}`,
                          margin: "0.1rem auto 1rem",
                          display: "flex",
                          justifyContent: "flex-start",
                        }}
                        placeholder="Enter your first name"
                        fullWidth
                      />
                      {errors.firstName && (
                        <Typography
                          textTransform={"none"}
                          textAlign={"left"}
                          fontFamily={"Inter"}
                          fontSize={"14px"}
                          fontStyle={"normal"}
                          fontWeight={500}
                          lineHeight={"20px"}
                          color={"#ff6363"}
                        >
                          **{errors?.firstName?.message}
                        </Typography>
                      )}
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
                      <InputLabel
                        style={{ marginBottom: "3px", width: "100%" }}
                      >
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
                        {...register("lastName")}
                        aria-invalid={errors.lastName ? true : false}
                        style={{
                          borderRadius: "12px",
                          border: `${errors.lastName && "solid 1px #004EEB"}`,
                          margin: "0.1rem auto 1rem",
                          display: "flex",
                          justifyContent: "flex-start",
                        }}
                        placeholder="Enter your last name"
                        fullWidth
                      />
                      {errors.lastName && (
                        <Typography
                          textTransform={"none"}
                          textAlign={"left"}
                          fontFamily={"Inter"}
                          fontSize={"14px"}
                          fontStyle={"normal"}
                          fontWeight={500}
                          lineHeight={"20px"}
                          color={"#ff6363"}
                        >
                          **{errors?.lastName?.message}
                        </Typography>
                      )}
                    </Grid>
                    <Grid
                      display={"flex"}
                      flexDirection={"column"}
                      alignItems={"center"}
                      justifyContent={"center"}
                      item
                      xs={12}
                    >
                      <InputLabel
                        style={{ marginBottom: "3px", width: "100%" }}
                      >
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
                        className="phone-input-form"
                        countrySelectProps={{ unicodeFlags: true }}
                        defaultCountry="US"
                        placeholder="Enter your phone number"
                        value={contactPhoneNumber}
                        onChange={setContactPhoneNumber}
                      />
                      <Typography
                        textTransform={"none"}
                        textAlign={"left"}
                        fontFamily={"Inter"}
                        fontSize={"14px"}
                        fontStyle={"normal"}
                        fontWeight={400}
                        lineHeight={"20px"}
                        color={"var(--gray-700, #344054)"}
                      >
                        {contactPhoneNumber}
                      </Typography>
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
                      <InputLabel
                        style={{ marginBottom: "3px", width: "100%" }}
                      >
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
                          Group name
                        </Typography>
                      </InputLabel>
                      <OutlinedInput
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
                      <Button
                        htmlType="submit"
                        style={{
                          display: "flex",
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
                        <Typography
                          textTransform={"none"}
                          fontFamily={"Inter"}
                          fontSize={"16px"}
                          fontStyle={"normal"}
                          fontWeight={600}
                          lineHeight={"24px"}
                          color={"var(--base-white, #FFF)"}
                        >
                          Continue
                        </Typography>
                      </Button>
                    </Grid>{" "}
                  </>
                )}
              </form>
            </Grid>{" "}
          </Grid>
        </Grid>
        <Grid
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
          marginBottom={2}
          item
          xs={12}
        >
          <IndicatorProgressBottom current={50} />
        </Grid>{" "}
      </>
    );
  }
};

export default ConsumerInitialForm;