import { Icon } from "@iconify/react";
import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { PersonProfileIcon } from "../icons/Icons";

const NavigationBottom = () => {
  const location = useLocation()
  const listPageNotAllowForNavigation = [
    "/initial-form",
    "/deviceSelection",
    "/payment",
    "/",
  ];
  const navigate = useNavigate();

  return (
    <>{
      !listPageNotAllowForNavigation.some(element => element === location.pathname) &&
      <BottomNavigation
        id="bottomNavigation"
        style={{
          background: "var(--blue-dark-800, #0040c1)",
          color: "#fff",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          alignSelf: "stretch",
          gap: "24px",
          minHeight: "100%",
          // minHeight: "15dvh",
          padding: "0px 15px 30px",
          borderRadius: "12px 12px 0 0",
        }}
        showLabels
      >
        <BottomNavigationAction
          style={{
            background: `${location.pathname === "/device"
              ? "var(--blue-dark-700, #004EEB)"
              : "var(--blue-dark-800, #0040c1)"
              }`,
            borderRadius: `${location.pathname === "/device" ? "12px" : "0"}`,
            aspectRatio: "1/3",
            height: "60%",
            color: "#fff",
          }}
          onClick={() => navigate("/device")}
          label="Current"
          icon={<Icon icon="ep:headset" width="30" height="30" />}
        />
        <BottomNavigationAction
          style={{
            background: `${location.pathname === "/information"
              ? "var(--blue-dark-700, #004EEB)"
              : "var(--blue-dark-800, #0040c1)"
              }`,
            borderRadius: `${location.pathname === "/information" ? "12px" : "0"}`,
            aspectRatio: "1/3",
            height: "60%",
            color: "#fff",
          }}
          onClick={() => navigate("/information")}
          label="More info"
          icon={<Icon icon="mdi-light:information" width="30" height="30" />}
        />
        <BottomNavigationAction
          style={{
            background: `${location.pathname === "/profile"
              ? "var(--blue-dark-700, #004EEB)"
              : "var(--blue-dark-800, #0040c1)"
              }`,
            borderRadius: `${location.pathname === "/profile" ? "12px" : "0"}`,
            aspectRatio: "1/3",
            height: "60%",
            color: "#fff",
          }}
          onClick={() => navigate("/profile")}
          label="My profile"
          icon={<PersonProfileIcon />}
        />
      </BottomNavigation>
    }</>
  );
};

export default NavigationBottom;
