import { Grid, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import Logo from "../../assets/devitrak_logo.svg";
import DevitrakName from "../../assets/Layer_1.svg";
import "./UpperBanner.css";
const UpperBanner = () => {
  const listPageNotAllowForNavigation = ["/"];
  const { eventInfoDetail } = useSelector((state) => state.event);
  const location = useLocation()
  return (
    <Grid
      key={location.key}
      container
      display={
        listPageNotAllowForNavigation.some(element => element === location.pathname) ? "none" : "flex"
      }
      justifyContent={"space-around"}
      alignItems={"center"}
      alignSelf={"stretch"}
      gap={2}
    >
      <Grid item xs={6}>
        {eventInfoDetail.logo && (
          <img
            className="img-logo-banner"
            src={eventInfoDetail?.logo}
            alt="dynamic-logo-placeholder"
          />
        )}
      </Grid>
      <Grid
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"flex-end"}
        item
        xs={4}
      >
        <Grid display={"flex"} alignItems={"center"} item xs={12}>
          <Typography
            color={"var(--gray-600, #475467)"}
            fontSize={"9px"}
            fontFamily={"Inter"}
            fontStyle={"normal"}
            fontWeight={500}
            lineHeight={"9px"}
          >
            Power by
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <img src={Logo} alt="devitrak-logo" />
          <img src={DevitrakName} alt="devitrak-name" />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default UpperBanner;
