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
      <NavLink to="/admin">
        <div className="logo-main">
          <h4>Devitrack</h4>
        </div>
      </NavLink>
      <div className="body-central">
        {/* <NavLink to="/admin/events">
          <div className={`${pathname === "/admin/events" ? "active-tab-admin-navbar" : ""} nav-item`}>
            <h4>Events</h4>
          </div>
        </NavLink> */}
        <NavLink to="/admin/device-database">
          <div
            className={`${
              pathname === "/admin/device-database" ? "active-tab-admin-navbar" : ""
            } option-item`}
          >
            <h4>Device Database</h4>
          </div>
        </NavLink>
        <NavLink to="/admin/attendees">
          <div
            className={`${
              pathname === "/admin/device-attendees" ? "active-tab-admin-navbar" : ""
            } option-item`}
          >
            <h4>Users</h4>
          </div>
        </NavLink>
        {/* <NavLink to="/admin/articles">
          <div className={`${pathname === "/admin/articles" ? "active-tab-admin-navbar" : ""} `}>
            <h4>
              Articles
            </h4>
          </div>
        </NavLink> */}
        <NavLink to="/admin/settings">
          <div
            className={`${
              pathname === "/admin/settings" ? "active-tab-admin-navbar" : ""
            } option-item`}
          >
            <h4>Settings</h4>
          </div>
        </NavLink>
      </div>
      <div className="profile-section-nav">
        <NavLink to="/admin/profile">
          <div
            className={`${
              pathname === "/admin/profile" ? "active-tab-admin-navbar" : ""
            } option-item`}
          >
            <h4>{user.name}</h4>
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
