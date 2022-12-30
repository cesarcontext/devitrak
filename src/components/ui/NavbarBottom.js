import React, { useState } from "react"; //, { useState, useCallback }
import { useSelector } from "react-redux";
import { Link } from "react-router-dom"; //, Navigate
import "../../style/component/ui/NavbarBottom.css";

export const NavbarBottom = () => {
  const { pointerEventStatus } = useSelector((state) => state.ui);
  const pathname = window.location.pathname;
  return (
    <div className="navbar-container">
      <nav className="navbar-fixed">
        <Link
          style={{ pointerEvents: `${pointerEventStatus}` }}
          to="/request_devices"
        >
          <div
            id=""
            className={`${
              pathname === "/request_devices" ? "active-tab-navbar" : ""
            } icon-span`}
          >
            <i className="bi bi-headset"></i>
            <span>REQUEST DEVICES</span>
          </div>
        </Link>
        <Link
          style={{ pointerEvents: `${pointerEventStatus}` }}
          to="/more_info"
        >
          <div
            id=""
            className={`${
              pathname === "/more_info" ||
              pathname === "/more_info/how_to_use_the_receiver" ||
              pathname === "/more_info/how_to_return_the_devices" ||
              pathname === "/more_info/request_support_during_event"
                ? "active-tab-navbar"
                : ""
            } icon-span`}
          >
            <i className="bi bi-info-circle"></i>
            <span>MORE INFO</span>
          </div>
        </Link>
        <Link
          style={{ pointerEvents: `${pointerEventStatus}` }}
          to="/event_schedule"
        >
          <div
            className={`${
              pathname === "/event_schedule" ? "active-tab-navbar" : ""
            } icon-span`}
          >
            <i className="bi bi-calendar2-event"></i>
            <span>EVENT SCHEDULED</span>
          </div>
        </Link>
        <Link
          style={{ pointerEvents: `${pointerEventStatus}` }}
          to="/my_profile"
        >
          <div
            id=""
            className={`${
              pathname === "/my_profile" ? "active-tab-navbar" : ""
            } icon-span`}
          >
            <i className="bi bi-person"></i>
            <span>MY PROFILE</span>
          </div>
        </Link>
      </nav>
    </div>
  );
};
