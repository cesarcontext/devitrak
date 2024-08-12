import { Grid } from "@mui/material";
import SupportMainPage from "../support/SupportMainPage";
import ConsumerInfo from "./ConsumerInfo";
import OrderHistory from "./OrderHistory";
import PaymentInformation from "./PaymentInformation";
import "./Profile.css";

const Profile = () => {
  return (
    <Grid
      display={"flex"}
      alignItems={"center"}
      margin={"1rem auto 2rem"}
      flexDirection={"column"}
      container
    >
      <Grid
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"center"}
        alignItems={"center"}
        // margin={"auto"}
        item
        xs={12}
        sm={12}
        md={6}
        lg={4}
      >
        <ConsumerInfo />
        <OrderHistory />
        <PaymentInformation />
        <SupportMainPage />
      </Grid>
      {/* <CurrentOrder /> */}
      {/* <Grid
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        margin={"auto"}
        item
        xs={12}
        sm={12}
        md={6}
        lg={4}
      ></Grid>
      <Grid
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        margin={"auto"}
        item
        xs={12}
        sm={12}
        md={6}
        lg={4}
      ></Grid>
      <Grid
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        margin={"auto"}
        item
        xs={12}
        sm={12}
        md={6}
        lg={4}
      ></Grid> */}
    </Grid>
  );
};

export default Profile;
