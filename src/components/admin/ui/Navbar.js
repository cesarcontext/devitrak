import React from "react";
import { NavLink } from "react-router-dom";
import { useAdminStore } from "../../../hooks/useAdminStore";
import "./navbar.css";

export const Navbar = () => {
  const { user, startLogout } = useAdminStore();
  const pathname = window.location.pathname;
  const logout = () => {
    startLogout();
  };
  return (
    <nav className="navbar-admin">
      {" "}
      <NavLink to="/">
        <div className="logo-main">
          <h4>Devitrack</h4>
        </div>
      </NavLink>
      <div className="body-central">
        <NavLink to="/home">
          <div
            className={`${
              pathname === "/home" ? "active-tab-admin-navbar" : ""
            } option-item`}
          >
            <h4>Home</h4>
          </div>
        </NavLink>
        <NavLink to="/device-database">
          <div
            className={`${
              pathname === "/device-database" ? "active-tab-admin-navbar" : ""
            } option-item`}
          >
            <h4>Device Database</h4>
          </div>
        </NavLink>

        <NavLink to="/attendees">
          <div
            className={`${
              pathname === "/device-attendees" ? "active-tab-admin-navbar" : ""
            } option-item`}
          >
            <h4>Users</h4>
          </div>
        </NavLink>
        <NavLink to="/settings">
          <div
            className={`${
              pathname === "/settings" ? "active-tab-admin-navbar" : ""
            } option-item`}
          >
            <h4>Settings</h4>
          </div>
        </NavLink>
      </div>
      <div className="profile-section-nav">
        <NavLink to="/profile">
          <div className={`option-item`}>
            <h4 style={{ paddingRight: "10px" }}>{user.name}</h4>
          </div>
        </NavLink>
        <button
          className="btn btn-delete"
          style={{ width: "15vw", borderRadius: "25px" }}
          onClick={logout}
        >
          <i style={{ fontSize: "20px" }} className="bi bi-box-arrow-left" />
        </button>
      </div>
    </nav>
  );
};
