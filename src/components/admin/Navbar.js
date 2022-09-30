import React from "react";
import { Navigate, NavLink, useNavigate } from "react-router-dom";
import { useAdminStore } from "../../hooks/useAdminStore";
import "./navbar.css";

export const Navbar = () => {
  const navigate = useNavigate()
  const adminName = localStorage.getItem("admin")
  const logout = () => {
    localStorage.removeItem("token")
   navigate("http://localhost:300/admin/login")
  };
  return (
    <nav className="navbar-admin">
      {" "}
      <NavLink to="/admin">
        <div>
          <h4>Devitrack</h4>
        </div>
      </NavLink>
      <ul
        className="nav"
        style={{
          color: "rgb(255, 255, 255)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <NavLink to="/admin/events">
          <div className="nav-item">
            <p className="nav-link">Events</p>
          </div>
        </NavLink>
        <NavLink to="/admin/device-database">
          <div className="nav-item">
            <p className="nav-link" href="#">
              Device Database
            </p>
          </div>
        </NavLink>
        <NavLink to="/admin/attendees">
          <div className="nav-item">
            <p className="nav-link" href="#">
              Users
            </p>
          </div>
        </NavLink>
        <NavLink to="/admin/articles">
          <div className="nav-item">
            <p className="nav-link" href="#">
              Articles
            </p>
          </div>
        </NavLink>
        <NavLink to="/admin/settings">
          <div className="nav-item">
            <p className="nav-link">Settings</p>
          </div>
        </NavLink>
      </ul>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          padding: "5px",
          width: "10%",
        }}
      >
        <NavLink to="/admin/profile">
          <div>
            <h4>{adminName}</h4>
          </div>
        </NavLink>
        <button style={{ width: "40%", borderRadius: "50%" }} onClick={logout}>
        <i style={{ fontSize: "20px" }} className="bi bi-box-arrow-left" />
        </button>
      </div>
    </nav>
  );
};
