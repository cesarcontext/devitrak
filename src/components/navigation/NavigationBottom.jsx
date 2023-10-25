import { Icon } from "@iconify/react";
import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";

const NavigationBottom = () => {
  const listPageNotAllowForNavigation = [
    "/initial-form",
    "/deviceSelection",
    "/payment",
    "/",
  ];
  const pathRef =useMemo(() => (window.location.pathname), [window.location.pathname])
  const navigate = useNavigate();

  return (
    <BottomNavigation
      id="bottonNavigation"
      sx={{
        background: "var(--blue-dark-800, #0040c1)",
        color: "#fff",
        display: `${
          listPageNotAllowForNavigation.includes(pathRef) ? "none" : "flex"
        }`,
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "stretch",
        gap: "24px",
        minHeight: "15svh",
        minHeight: "15dvh",
        padding: "0px 15px 30px",
        borderRadius: "12px 12px 0 0",
      }}
      showLabels
    >
      <BottomNavigationAction
        sx={{
          background: `${
            pathRef === "/device"
              ? "var(--blue-dark-700, #004EEB)"
              : "var(--blue-dark-800, #0040c1)"
          }`,
          borderRadius: `${pathRef === "/device" ? "12px" : "0"}`,
          aspectRatio: "1/3",
          height: "60%",
          color: "#fff",
        }}
        onClick={() => navigate("/device")}
        label="Current"
        icon={<Icon icon="ep:headset" width="30" height="30" />}
      />
      <BottomNavigationAction
        sx={{
          background: `${
            pathRef === "/information"
              ? "var(--blue-dark-700, #004EEB)"
              : "var(--blue-dark-800, #0040c1)"
          }`,
          borderRadius: `${pathRef === "/information" ? "12px" : "0"}`,
          aspectRatio: "1/3",
          height: "60%",
          color: "#fff",
        }}
        onClick={() => navigate("/information")}
        label="More info"
        icon={<Icon icon="mdi-light:information" width="30" height="30" />}
      />
      <BottomNavigationAction
        sx={{
          background: `${
            pathRef === "/profile"
              ? "var(--blue-dark-700, #004EEB)"
              : "var(--blue-dark-800, #0040c1)"
          }`,
          borderRadius: `${pathRef === "/profile" ? "12px" : "0"}`,
          aspectRatio: "1/3",
          height: "60%",
          color: "#fff",
        }}
        onClick={() => navigate("/profile")}
        label="My profile"
        icon={<Icon icon="octicon:person-24" width="30" height="30" />}
      />
    </BottomNavigation>
    // </Paper>
  );
};

export default NavigationBottom;
