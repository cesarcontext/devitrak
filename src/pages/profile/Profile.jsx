import {
  Button,
  Grid,
  InputAdornment,
  OutlinedInput,
  Typography,
} from "@mui/material";
import { Divider } from "antd";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { onAddConsumerInfo } from "../../store/slides/consumerSlide";
import "./Profile.css";
import { useNavigate } from "react-router-dom";
import { onResetConsumerInfo } from "../../store/slides/consumerSlide";
import { onHardReset } from "../../store/slides/deviceSlides";
import { onResetCustomerStripeInfo } from "../../store/slides/stripeSlide";
import { onResetArticleInfo } from "../../store/slides/articleHandlerSlide";
import { useMutation } from "@tanstack/react-query";
import { devitrackApi } from "../../devitrakApi";
const Profile = () => {
  const { consumer } = useSelector((state) => state.consumer);
  const [editSection, setEditSection] = useState(true);
  const navigate = useNavigate();
  const { register, watch } = useForm({
    defaultValues: {
      name: `${consumer ? consumer.name : "Your name"}`,
      lastName: `${consumer ? consumer.lastName : "Your last name"}`,
      email: `${consumer ? consumer.email : "Your email"}`,
      phoneNumber: `${consumer ? consumer.phoneNumber : "Your phone number"}`,
    },
  });
  const dispatch = useDispatch();
  const updateProfileDataMutation = useMutation({
    mutationFn: (newProfile) => devitrackApi.patch(`/auth/${consumer.id}`, newProfile),
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
    );   setEditSection(true);
  };

  const handleLogout = async () => {
    dispatch(onResetArticleInfo());
    dispatch(onResetConsumerInfo());
    dispatch(onHardReset());
    dispatch(onResetCustomerStripeInfo());
    navigate("/");
  };
  return (
    <Grid container>
      <Grid
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
        margin={"1rem auto 0rem"}
        item
        xs={10}
      >
        <Grid
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          item
          xs={12}
        >
          <img
            style={{
              width: "100%",
              height: "100%",
            }}
            src="https://th.bing.com/th/id/OIP.dpx3ctpnvWHcci_hHTGsFQHaHa?pid=ImgDet&rs=1"
            alt="profile-placeholder-img"
          />
        </Grid>

        {editSection ? (
          <OutlinedInput
            disabled={editSection}
            value={`${consumer ? consumer.name : "Your name"}, ${
              consumer ? consumer.lastName : "Your last"
            }`}
            style={{
              borderRadius: "12px",
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
                  Name:
                </Typography>
              </InputAdornment>
            }
            fullWidth
          />
        ) : (
          <>
            <OutlinedInput
              {...register("name")}
              style={{
                borderRadius: "12px",
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
          </>
        )}

        <OutlinedInput
          disabled={editSection}
          {...register("email")}
          style={{
            borderRadius: "12px",
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
          disabled={editSection}
          {...register("phoneNumber")}
          style={{
            borderRadius: "12px",
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
      </Grid>
      <Grid
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
        margin={"0rem auto"}
        item
        xs={10}
      >
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
            // background: "var(--blue-dark-600, #155EEF)",
            boxShadow: "0px 1px 2px 0px rgba(16, 24, 40, 0.05)",
            width: "100%",
          }}
          onClick={() =>
            editSection ? setEditSection(false) : handleSaveEdit()
          }
        >
          <Typography
            textTransform={"none"}
            fontFamily={"Inter"}
            fontSize={"18px"}
            fontStyle={"normal"}
            fontWeight={600}
            lineHeight={"20px"}
            color={"var(--blue-dark-600, #155EEF"}
          >
            {editSection ? "Edit" : "Save"}
          </Typography>
        </Button>
      </Grid>
      <Grid
        display={"flex"}
        // flexDirection={"column"}
        justifyContent={"center"}
        alignItems={"center"}
        margin={"1rem auto"}
        item
        xs={10}
      >
        <Button
          style={{
            display: "flex",
            padding: "12px 20px",
            justifyContent: "center",
            alignItems: "center",
            gap: "8px",
            borderRadius: "8px",
            border: "1px solid red",
            // background: "red",
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
      <Divider />
      <Grid
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
        margin={"1rem auto 15rem"}
        item
        xs={10}
      >
        <OutlinedInput
          disabled
          value={"Pending devices to be returned"}
          name="consumer.name"
          style={{
            borderRadius: "12px",
            margin: "0.1rem auto 1rem",
            textOverflow: "ellipsis",
          }}
          endAdornment={
            <InputAdornment style={{ display: "flex", alignItems: "center" }}>
              <Button
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
                onClick={() => console.log("clicked")}
              >
                <Typography
                  textTransform={"none"}
                  fontFamily={"Inter"}
                  fontSize={"14px"}
                  fontStyle={"normal"}
                  fontWeight={500}
                  lineHeight={"20px"}
                  color={"var(--base-white, #FFF)"}
                >
                  View{" "}
                </Typography>
              </Button>
            </InputAdornment>
          }
          fullWidth
        />
      </Grid>
    </Grid>
  );
};

export default Profile;
