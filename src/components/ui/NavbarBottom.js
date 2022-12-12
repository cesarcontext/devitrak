import React from "react"; //, { useState, useCallback }
import { useSelector } from "react-redux";
import { Link } from "react-router-dom"; //, Navigate
import "../../style/component/ui/NavbarBottom.css";

export const NavbarBottom = () => {
  const { pointerEventStatus } = useSelector(state => state.ui)
  return (
    <div className="navbar-container">
      <nav className="navbar-fixed">
        <Link
          style={{ pointerEvents: `${pointerEventStatus}` }}
          to="/request_devices"
        >
          <div className="icon-span">
            <i className="bi bi-headset"></i>
            <span>REQUEST DEVICES</span>
          </div>
        </Link>
        <Link
          style={{ pointerEvents: `${pointerEventStatus}` }}
          to="/more_info"
        >
          <div className="icon-span">
            <i className="bi bi-info-circle"></i>
            <span>MORE INFO</span>
          </div>
        </Link>
        <Link
          style={{ pointerEvents: `${pointerEventStatus}` }}
          to="/event_schedule"
        >
          <div className="icon-span">
            <i className="bi bi-calendar2-event"></i>
            <span>EVENT SCHEDULED</span>
          </div>
        </Link>
        <Link
          style={{ pointerEvents: `${pointerEventStatus}` }}
          to="/my_profile"
        >
          <div className="icon-span">
            <i className="bi bi-person"></i>
            <span>MY PROFILE</span>
          </div>
        </Link>
       
      </nav>
    </div>
  );
};
