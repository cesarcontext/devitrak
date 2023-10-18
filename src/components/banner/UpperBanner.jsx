import { Grid, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Logo from "../../assets/devitrak_logo.svg";
import DevitrakName from "../../assets/Layer_1.svg";
import "./UpperBanner.css";
const UpperBanner = () => {
  const listPageNotAllowForNavigation = ["/"];
  const [pathRef, setPathRef] = useState(null);
  const { event } = useSelector((state) => state.event);
  console.log("🚀 ~ file: UpperBanner.jsx:11 ~ UpperBanner ~ event:", event);
  useEffect(() => {
    const controller = new AbortController();
    setPathRef(window.location.pathname);
    return () => {
      controller.abort();
    };
  }, [pathRef]);
  return (
    <Grid
      container
      display={
        listPageNotAllowForNavigation.includes(pathRef) ? "none" : "flex"
      }
      justifyContent={"space-around"}
      alignItems={"center"}
      alignSelf={"stretch"}
      gap={2}
    >
      <Grid item xs={6}>
        <img
          className="img-logo-banner"
          src={event.eventInfoDetail.logo ?? Logo}
          alt="dynamic-logo-placeholder"
        />
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
