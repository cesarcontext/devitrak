// import { Icon } from "@iconify/react";
import {
  BottomNavigation,
  BottomNavigationAction
} from "@mui/material";
import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import DeviceIcon from "../icons/DeviceIcon";
import InfoIcon from "../icons/InfoIcon";
import ProfileIcon from "../icons/ProfileIcon";

const NavigationBottom = () => {
  const [value, setValue] = useState("recents");
  const location = useLocation();
  const listPageNotAllowForNavigation = [
    "/initial-form",
    "/deviceSelection",
    "/payment",
    "/",
  ];
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      {!listPageNotAllowForNavigation.some(
        (element) => element === location.pathname
      ) && (
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
          value={value}
          onChange={handleChange}
          showLabels
        >
          <NavLink
            to={"/device"}
            style={({ isActive }) => {
              return {
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                alignItems: "center",
                background: isActive
                  ? "var(--blue-dark-700, #004EEB)"
                  : "var(--blue-dark-800, #0040c1)",
                padding: "8px 12px",
                margin: "20px 0 0",
                borderRadius: `${isActive ? "12px" : "0"}`,
                alignSelf: "stretch",
                height: "10dvh",
                color: "#fff",
                textDecoration: "none",
              };
            }}
          >
            <BottomNavigationAction
              label="Devices"
              value={"devices"}
              icon={<DeviceIcon />}
              showLabel
              style={{ color: "var(--whitebase)" }}
            />
          </NavLink>
          <NavLink
            to={"/information"}
            style={({ isActive }) => {
              return {
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                alignItems: "center",
                background: isActive
                  ? "var(--blue-dark-700, #004EEB)"
                  : "var(--blue-dark-800, #0040c1)",
                padding: "8px 12px",
                margin: "20px 0 0",
                borderRadius: `${isActive ? "12px" : "0"}`,
                alignSelf: "stretch",
                height: "10dvh",
                color: "#fff",
                textDecoration: "none",
              };
            }}
          >
            <BottomNavigationAction
              label="More info"
              value={"more info"}
              icon={<InfoIcon />}
              showLabel
              style={{ color: "var(--whitebase)" }}
            />
          </NavLink>

          <NavLink
            to={"/profile"}
            style={({ isActive }) => {
              return {
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                alignItems: "center",
                background: isActive
                  ? "var(--blue-dark-700, #004EEB)"
                  : "var(--blue-dark-800, #0040c1)",
                padding: "8px 12px",
                margin: "20px 0 0",
                borderRadius: `${isActive ? "12px" : "0"}`,
                alignSelf: "stretch",
                height: "10dvh",
                color: "#fff",
                textDecoration: "none",
              };
            }}
          >
            <BottomNavigationAction
              label="Profile"
              value={"profile"}
              icon={<ProfileIcon />}
              showLabel
              style={{ color: "var(--whitebase)" }}
            />
          </NavLink>
        </BottomNavigation>
      )}
    </>
  );
};

export default NavigationBottom;