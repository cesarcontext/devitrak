import { Icon } from "@iconify/react";
import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";

const NavigationBottom = () => {
  const pathName = window.location.pathname;
  const navigate = useNavigate();

  return (
    // <Paper
    //   variant="outlined"
    //   sx={{
    //     display: "flex",
    //     padding: "8px 16px",
    //     // height: "15dvh",
    //     flexDirection: "column",
    //     justifyContent: "center",
    //     alignItems: "center",
    //     /* gap: 24px; */
    //     flexShrink: "0",
    //     borderRadius: "20px 20px 0px 0px",
    //     background: "var(--blue-dark-800, #0040c1)",
    //     boxShadow: "0px -4px 4px 0px rgba(0, 0, 0, 0.05)",
    //     aspectRatio: "9/16",
    //   }}
    // >
    <BottomNavigation
      id="bottonNavigation"
      sx={{
        background: "var(--blue-dark-800, #0040c1)",
        color: "#fff",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "stretch",
        gap: "24px",
        minHeight: "15svh",
        minHeight: "15dvh",
        padding:"0px 15px 30px",
        borderRadius:"12px 12px 0 0"
      }}
      showLabels
    >
      <BottomNavigationAction
        sx={{
          background: `${
            pathName === "/device"
              ? "var(--blue-dark-700, #004EEB)"
              : "var(--blue-dark-800, #0040c1)"
          }`,
          borderRadius: `${pathName === "/device" ? "12px" : "0"}`,
          aspectRatio: "1/3",
          height: "60%",
          color: "#fff",
        }}
        onClick={() => navigate("/device")}
        label="Current order"
        icon={<Icon icon="ep:headset" width="30" height="30" />}
      />
      <BottomNavigationAction
        sx={{
          background: `${
            pathName === "/information"
              ? "var(--blue-dark-700, #004EEB)"
              : "var(--blue-dark-800, #0040c1)"
          }`,
          borderRadius: `${pathName === "/information" ? "12px" : "0"}`,
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
            pathName === "/profile"
              ? "var(--blue-dark-700, #004EEB)"
              : "var(--blue-dark-800, #0040c1)"
          }`,
          borderRadius: `${pathName === "/profile" ? "12px" : "0"}`,
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
