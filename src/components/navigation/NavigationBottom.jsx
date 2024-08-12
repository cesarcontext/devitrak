import { Icon } from "@iconify/react";
import { BottomNavigation } from "@mui/material";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { PersonProfileIcon, ProfileIcon } from "../icons/Icons";

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
        showlabels
      >
        <NavLink
          to={'/device'}
          style={({ isActive }) => {
            return {
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              alignItems: "center",
              background: isActive ? "var(--blue-dark-700, #004EEB)" : "var(--blue-dark-800, #0040c1)",
              padding: "8px 12px",
              margin: "20px 0 0",
              borderRadius: `${isActive ? "12px" : "0"}`,
              alignSelf: "stretch",
              height: "10dvh",
              color: "#fff",
            }
          }}
        ><Icon icon="ep:headset" width="30" height="30" />
          <p style={{ fontSize: "12px", lineHeight: "16px", fontFamily: "Inter", fontStyle: "normal", textDecoration: "none", fontWeight: 400, display: "flex", justifyContent: "center", alignItems: "center" }}>Devices</p></NavLink>
        <NavLink
          to={'/information'}
          style={({ isActive }) => {
            return {
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              alignItems: "center",
              background: isActive ? "var(--blue-dark-700, #004EEB)" : "var(--blue-dark-800, #0040c1)",
              padding: "8px 12px",
              margin: "20px 0 0",
              borderRadius: `${isActive ? "12px" : "0"}`,
              alignSelf: "stretch",
              height: "10dvh",
              color: "#fff",
            }
          }}
        ><Icon icon="mdi-light:information" width="30" height="30" />
          <p style={{ fontSize: "12px", lineHeight: "16px", fontFamily: "Inter", fontStyle: "normal", textDecoration: "none", fontWeight: 400, display: "flex", justifyContent: "center", alignItems: "center" }}>More info</p></NavLink>

        <NavLink
          to={'/profile'}
          style={({ isActive }) => {
            return {
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              alignItems: "center",
              background: isActive ? "var(--blue-dark-700, #004EEB)" : "var(--blue-dark-800, #0040c1)",
              padding: "8px 12px",
              margin: "20px 0 0",
              borderRadius: `${isActive ? "12px" : "0"}`,
              alignSelf: "stretch",
              height: "10dvh",
              color: "#fff",
            }
          }}
        ><ProfileIcon />
          <p style={{ fontSize: "12px", lineHeight: "16px", fontFamily: "Inter", fontStyle: "normal", textDecoration: "none", fontWeight: 400, display: "flex", justifyContent: "center", alignItems: "center" }}>Profile</p>
        </NavLink>
      </BottomNavigation>
    }</>
  );
};

export default NavigationBottom;
