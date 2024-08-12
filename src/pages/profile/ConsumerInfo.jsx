import {
  Button,
  Grid,
  InputAdornment,
  OutlinedInput,
  Typography
} from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import PhoneInput from "react-phone-number-input";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { devitrackApi } from "../../devitrakApi";
import { onResetArticleInfo } from "../../store/slides/articleHandlerSlide";
import {
  onAddConsumerInfo,
  onResetConsumerInfo
} from "../../store/slides/consumerSlide";
import { onHardReset } from "../../store/slides/deviceSlides";
import {
  onAddAmountStripeInfo,
  onAddPaymentIntent,
  onResetCustomerStripeInfo
} from "../../store/slides/stripeSlide";
const ConsumerInfo = () => {
  const { consumer } = useSelector((state) => state.consumer);
  const [editSection, setEditSection] = useState(false);
  const navigate = useNavigate();
  const { register, watch } = useForm({
    defaultValues: {
      name: `${consumer.name ? consumer.name : "Your name"}`,
      lastName: `${consumer.lastName ? consumer.lastName : "Your last name"}`,
      email: `${consumer.email ? consumer.email : "Your email"}`,
      phoneNumber: `${consumer.phoneNumber ? `${consumer.phoneNumber}` : "Your phone number"}`,
    },
  });
  const dispatch = useDispatch();
  const updateProfileDataMutation = useMutation({
    mutationFn: (newProfile) =>
      devitrackApi.patch(`/auth/${consumer.id}`, newProfile),
  });
  const handleSaveEdit = () => {
    const check = {
      name: watch("name"),
      lastName: watch("lastName"),
      email: watch("email"),
      phoneNumber: watch("phoneNumber"),
    };

    updateProfileDataMutation.mutate(check);
    dispatch(
      onAddConsumerInfo({
        ...consumer,
        name: check.name,
        lastName: check.lastName,
        email: check.email,
        phoneNumber: check.phoneNumber,
      })
    );
    setEditSection(false);
  };

  const handleLogout = async () => {
    dispatch(onResetConsumerInfo());
    dispatch(onResetArticleInfo());
    dispatch(onHardReset());
    dispatch(onAddPaymentIntent(undefined));
    dispatch(onAddAmountStripeInfo(0));
    dispatch(onResetCustomerStripeInfo())
    navigate("/");
  };
  return (
    <Grid
      container
      display={"flex"}
      flexDirection={"column"}
      alignItems={"center"}
      margin={"0.5rem auto 1.5rem"}
    >
      <Grid
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
        margin={"1rem auto 0rem"}
        item
          sm={12}
          xs={12}
      >
        <Grid
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          margin={"0.5rem auto 0rem"}
          item
          sm={12}
          xs={12}
        >
          {" "}
          <Typography
            textTransform={"capitalize"}
            textAlign={"left"}
            fontFamily={"Inter"}
            fontSize={"18px"}
            fontStyle={"normal"}
            fontWeight={600}
            lineHeight={"28px"}
            color={"var(--gray-900, #101828)"}
          >
            {`${consumer ? consumer.name : "Your name"}, ${consumer ? consumer.lastName : "Your last"
              }`}
          </Typography>
        </Grid>
        <Grid
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          margin={"0.5rem auto 0rem"}
          item
          sm={12}
          xs={12}
        >
          <Typography
            textTransform={"none"}
            textAlign={"left"}
            fontFamily={"Inter"}
            fontSize={"16px"}
            fontStyle={"normal"}
            fontWeight={400}
            lineHeight={"24px"}
            color={"var(--primary-700, #6941C6)"}
          >
            {consumer ? consumer.group : "No group provided."}
          </Typography>
        </Grid>
        <Grid
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          margin={"0.5rem auto 0rem"}
          item
          sm={12}
          xs={12}
        >
          {" "}
          <Typography
            textTransform={"none"}
            textAlign={"left"}
            fontFamily={"Inter"}
            fontSize={"16px"}
            fontStyle={"normal"}
            fontWeight={400}
            lineHeight={"24px"}
            color={"var(--gray-600, #475467)"}
          >
            {consumer ? consumer.email : "No email provided."}
          </Typography>
        </Grid>
        <Grid
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          margin={"0.5rem auto 0.5rem"}
          item
          sm={12}
          xs={12}
        >
          {" "}
          <Typography
            textTransform={"none"}
            textAlign={"left"}
            fontFamily={"Inter"}
            fontSize={"16px"}
            fontStyle={"normal"}
            fontWeight={400}
            lineHeight={"24px"}
            color={"var(--gray-600, #475467)"}
          >
            <PhoneInput
              disabled
              className="phone-input-form"
              value={consumer.hasOwnProperty(`phoneNumber`) ? `+${consumer.phoneNumber}` : "+10000000000"}
              style={{
                textAlign: "center"
              }}
            />
          </Typography>
        </Grid>
        <OutlinedInput
          {...register("name")}
          style={{
            borderRadius: "12px",
            display: `${editSection ? "" : "none"}`,
            margin: "0.1rem auto 1rem",
          }}
          startAdornment={
            <InputAdornment position="start">
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
                First name:
              </Typography>
            </InputAdornment>
          }
          fullWidth
        />
        <OutlinedInput
          {...register("lastName")}
          style={{
            borderRadius: "12px",
            display: `${editSection ? "" : "none"}`,
            margin: "0.1rem auto 1rem",
          }}
          startAdornment={
            <InputAdornment position="start">
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
                Last name:
              </Typography>
            </InputAdornment>
          }
          fullWidth
        />

        <OutlinedInput
          {...register("email")}
          style={{
            borderRadius: "12px",
            display: `${editSection ? "" : "none"}`,
            margin: "0.1rem auto 1rem",
          }}
          startAdornment={
            <InputAdornment position="start">
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
                Email:
              </Typography>
            </InputAdornment>
          }
          fullWidth
        />
        <OutlinedInput
          {...register("phoneNumber")}
          style={{
            borderRadius: "12px",
            display: `${editSection ? "" : "none"}`,
            margin: "0.1rem auto 1rem",
          }}
          startAdornment={
            <InputAdornment position="start">
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
                Phone:
              </Typography>
            </InputAdornment>
          }
          fullWidth
        />
        <Button
          style={{
            display: `${!editSection ? "none" : "flex"}`,
            padding: "12px 20px",
            justifyContent: "center",
            alignItems: "center",
            gap: "8px",
            borderRadius: "8px",
            border: "1px solid var(--blue-dark-600, #ff3838)",
            background: "var(--blue-dark-600, #ff3838)",
            boxShadow: "0px 1px 2px 0px rgba(16, 24, 40, 0.05)",
            width: "100%",
            margin: "0 0 5px 0"
          }}
          onClick={() => setEditSection(false)}
        >
          <Typography
            textTransform={"none"}
            fontFamily={"Inter"}
            fontSize={"18px"}
            fontStyle={"normal"}
            fontWeight={600}
            lineHeight={"20px"}
            color={"#fff"}
          >
            Cancel
          </Typography>
        </Button>
        <Button
          disabled={consumer ? false : true}
          style={{
            display: "flex",
            padding: "12px 20px",
            justifyContent: "center",
            alignItems: "center",
            gap: "8px",
            borderRadius: "8px",
            border: "1px solid var(--blue-dark-600, #155EEF)",
            background: "var(--blue-dark-600, #155EEF)",
            boxShadow: "0px 1px 2px 0px rgba(16, 24, 40, 0.05)",
            width: "100%",
          }}
          onClick={() =>
            editSection ? handleSaveEdit() : setEditSection(true)
          }
        >
          <Typography
            textTransform={"none"}
            fontFamily={"Inter"}
            fontSize={"18px"}
            fontStyle={"normal"}
            fontWeight={600}
            lineHeight={"20px"}
            color={"#fff"}
          >
            {editSection ? "Save" : "Edit contact information"}
          </Typography>
        </Button>
        <Button
          style={{
            display: `${!editSection ? "flex" : "none"}`,
            padding: "12px 20px",
            justifyContent: "center",
            alignItems: "center",
            gap: "8px",
            borderRadius: "8px",
            border: "1px solid red",
            margin: "0.5rem auto",
            boxShadow: "0px 1px 2px 0px rgba(16, 24, 40, 0.05)",
            width: "100%",
          }}
          onClick={() => handleLogout()}
        >
          <Typography
            textTransform={"none"}
            fontFamily={"Inter"}
            fontSize={"18px"}
            fontStyle={"normal"}
            fontWeight={600}
            lineHeight={"20px"}
            color={"red"}
          >
            Logout
          </Typography>
        </Button>
      </Grid>
    </Grid>
  );
};

export default ConsumerInfo;
