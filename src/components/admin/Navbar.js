import React from "react";
import { Link } from "react-router-dom";
import "./navbar.css";

export const Navbar = () => {
  return (
    <nav
      className="navbar-admin">
      {" "}
      <ul className="nav flex-column" style={{ color: "rgb(255, 255, 255)" }}>
        <Link to="">
          <li className="nav-item">
            <a className="nav-link">Home</a>
          </li>
        </Link>
        <Link to="">
          <li className="nav-item">
            <a className="nav-link active" aria-current="page" href="#">
              User admin name
            </a>
          </li>
        </Link>
        <Link to="">
          <li className="nav-item">
            <a className="nav-link" href="#">
              Registered Users
            </a>
          </li>
        </Link>
        <Link to="">
          <li className="nav-item">
            <a className="nav-link" href="#">
              Users transactions
            </a>
          </li>
        </Link>
        <Link to="">
          <li className="nav-item">
            <a className="nav-link">Receivers</a>
          </li>
        </Link>
        <Link to="">
          <li className="nav-item">
            <a className="nav-link">Disabled</a>
          </li>
        </Link>
      </ul>
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
