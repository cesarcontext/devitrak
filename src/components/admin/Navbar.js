import React from "react";
import { Link, NavLink } from "react-router-dom";
import "./navbar.css";

export const Navbar = () => {
  return (
    <nav className="navbar-admin">
      {" "}
      <NavLink to="/admin">
        <div>
          <h4>User Name</h4>
        </div>
      </NavLink>
      <ul className="nav flex-column" style={{ color: "rgb(255, 255, 255)" }}>
        <NavLink to="/admin">
          <li className="nav-item">
            <a className="nav-link">Home</a>
          </li>
        </NavLink>
        <NavLink to="/admin/users">
          <li className="nav-item">
            <a className="nav-link" href="#">
              Registered Users
            </a>
          </li>
        </NavLink>
        <NavLink to="/admin/payments">
          <li className="nav-item">
            <a className="nav-link" href="#">
              Payment transactions
            </a>
          </li>
        </NavLink>
        <NavLink to="/admin/receivers">
          <li className="nav-item">
            <a className="nav-link">Receivers</a>
          </li>
        </NavLink>
        <NavLink to="/">
          <li className="nav-item">
            <a className="nav-link">Logout</a>
          </li>
        </NavLink>
      </ul>
      <div style={{ height: "33%" }}></div>
    </nav>
  );
};

/**
 * <ul className="nav flex-column">
<Link>  
<li className="nav-item">
    <a className="nav-link active" aria-current="page" href="#">Active</a>
  </li>
  <li className="nav-item">
    <a className="nav-link" href="#">Link</a>
  </li>
  <li className="nav-item">
    <a className="nav-link" href="#">Link</a>
  </li>
  <li className="nav-item">
    <a className="nav-link disabled">Disabled</a>
  </li>
</ul>
 */
