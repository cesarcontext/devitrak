import { Grid } from "@mui/material";
import SupportMainPage from "../support/SupportMainPage";
import ConsumerInfo from "./ConsumerInfo";
import CurrentOrder from "./CurrentOrder";
import OrderHistory from "./OrderHistory";
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
      <ConsumerInfo />
      {/* <CurrentOrder /> */}
      <OrderHistory />
      <SupportMainPage />
    </Grid>
  );
};

export default Profile;
