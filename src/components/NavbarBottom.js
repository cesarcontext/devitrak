import React from "react";
import { Link } from "react-router-dom";

import "./navbar-bottom.css";

export const NavbarBottom = () => {
  return (
    <div className="navbar-container">
      <nav className="navbar-fixed">
        <Link to="/request_devices">
          <div className="icon-span">
            <i className="bi bi-headset"></i>
            <span>REQUEST DEVICES</span>
          </div>
        </Link>
        <Link to="/more_info">
          <div className="icon-span">
            <i className="bi bi-info-circle"></i>
            <span>MORE INFO</span>
          </div>
        </Link>
        <Link to="/event_schedule">
          <div className="icon-span">
            <i className="bi bi-calendar2-event"></i>
            <span>EVENT SCHEDULED</span>
          </div>
        </Link>
        <Link to="/my_profile">
          <div className="icon-span">
            <i className="bi bi-person"></i>
            <span>MY PROFILE</span>
          </div>
        </Link>
      </nav>
    </div>
  );
};
