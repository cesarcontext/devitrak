import { Icon } from "@iconify/react";
import { Grid, InputAdornment, InputLabel, OutlinedInput } from "@mui/material";
import { notification } from "antd";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import "react-phone-number-input/style.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import IndicatorProgressBottom from "../../components/indicatorBottom/IndicatorProgressBottom";
import { checkArray } from "../../components/utils/checkArray";
import { devitrackApi } from "../../devitrakApi";
import "./ConsumerInitialForm.css";

const ExistingConsumerForm = ({ props, setConsumerInfoFound }) => {
  const [loadingState, setLoadingState] = useState(false);
  const consumerInfoFound = checkArray(props);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();
  const { contactInfo, event } = useSelector(
    (state) => state.event
  );
  const { company } = useSelector(state => state.company)
  const emailSentRef = useRef(false);
  const navigate = useNavigate();
  const [api, contextHolder] = notification.useNotification();
  const openNotificationWithIcon = (type, msg, dspt) => {
    api[type]({
      message: msg,
      description: dspt,
    });
  };
  useEffect(() => {
    const controller = new AbortController();
    if (consumerInfoFound.email) {
      setValue("email", `${consumerInfoFound.email}`);
    }
    return () => {
      controller.abort();
    };
  }, [consumerInfoFound.email, Array.isArray(props)]);

  const submitEmailToLoginForExistingConsumer = async () => {
    emailSentRef.current = true;
    setLoadingState(true);
    try {
      if (event.eventInfoDetail.merchant) {
        return navigate(
          `/authentication/${event.id}/${company.id}/${consumerInfoFound.id}`
        );
      } else {
        const parametersNeededToLoginLink = {
          consumer: consumerInfoFound,
          link: `https://app.devitrak.net/authentication/${event.id}/${company.id}/${consumerInfoFound.id}`,
          contactInfo: contactInfo.email,
          company: event.company,
        };
        const respo = await devitrackApi.post(
          "/nodemailer/login-existing-consumer",
          parametersNeededToLoginLink
        );
        if (respo) {
          openNotificationWithIcon(
            "success",
            "Email sent!",
            "We sent an email to login to event."
          );
          return setLoadingState(false);
        }
      }
    } catch (error) {
      console.log("error", error)
      openNotificationWithIcon(
        "error",
        "Something went wrong.",
        "Please try later."
      );
      setLoadingState(false);
    }
  };

  const resettingFields = () => {
    setValue("email", "");
    setConsumerInfoFound([]);
    return;
  };
  const resetForm = () => {
    emailSentRef.current = false;
    return resettingFields();
  };

  const renderButtonTitle = () => {
    if (event.eventInfoDetail.merchant) {
      return "Next step";
    } else {
      if (emailSentRef.current) {
        return "Send email again";
      }
      return "Send login email";
    }
  };
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
              onSubmit={handleSubmit(submitEmailToLoginForExistingConsumer)}
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
                    /* Display xs/Semibold */
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
                  disabled
                  endAdornment={
                    <InputAdornment position="end">
                      {emailSentRef.current && (
                        <Icon icon="mdi:checkbox-outline" color="#66c61c" />
                      )}
                      {!emailSentRef.current && (
                        <button
                          type="reset"
                          onClick={() => resetForm()}
                          style={{
                            margin: 0,
                            padding: 0,
                            outline: "none",
                            border: "transparent",
                            backgroundColor: "transparent",
                          }}
                        >
                          X
                        </button>
                      )}
                    </InputAdornment>
                  }
                  {...register("email")}
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
              <p
                style={{
                  color: "var(--gray-600, #475467)",
                  /* Text sm/Regular */
                  fontFamily: "Inter",
                  fontSize: "14px",
                  fontStyle: "normal",
                  fontWeight: 400,
                  lineHeight: "20px",
                }}
              >
                Welcome back,{" "}
                <span style={{ textTransform: "capitalize" }}>
                  {consumerInfoFound.name}
                </span>{" "}
                ! Your email is already in the system. Continue by sending an
                email to your inbox that contains a link for you to log in.
              </p>
              <Grid item xs={12} margin={"1rem 0"}>
                <button
                  type="submit"
                  loading={loadingState}
                  style={{
                    display: "flex",
                    padding: "12px 20px",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "8px",
                    alignSelf: "stretch",
                    borderRadius: "8px",
                    border: `${
                      emailSentRef.current
                        ? "1px solid var(--gray-300, #D0D5DD)"
                        : "1px solid var(--blue-dark-600, #155EEF)"
                    }`,
                    background: `${
                      emailSentRef.current
                        ? "var(--base-white, #FFF)"
                        : "var(--blue-dark-600, #155EEF)"
                    }`,
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
                      color: `${
                        emailSentRef.current
                          ? "var(--gray-700, #344054)"
                          : "var(--base-white, #FFF)"
                      }`,
                      margin: 0,
                    }}
                  >
                    {renderButtonTitle()}
                  </p>
                </button>
              </Grid>
              <Grid
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
                item
                xs={12}
                margin={"1rem 0"}
              >
                <button
                  type="reset"
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
                  <p
                    style={{
                      textTransform: "none",
                      fontFamily: "Inter",
                      fontSize: "16px",
                      fontStyle: "normal",
                      fontWeight: 600,
                      lineHeight: "24px",
                      color: "var(--blue-dark-700, #004EEB)",
                      margin: 0,
                    }}
                  >
                    <Icon
                      icon="icon-park-outline:return"
                      width={20}
                      height={20}
                      color="var(--blue-dark-700, #004EEB)"
                    />
                    &nbsp;Start over
                  </p>
                </button>
              </Grid>
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

export default ExistingConsumerForm;
