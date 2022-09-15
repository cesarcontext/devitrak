import React, { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { useStytchSession, useStytch } from "@stytch/stytch-react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useContactInfoStore } from "../hooks/useContactInfoStore";

import "./navbar-bottom.css";

export const NavbarBottom = () => {
  const session = useStytchSession();
  const client = useStytch();
  const navigate = useNavigate();

  const { users } = useContactInfoStore();

  const user = session?.authentication_factors[0].email_factor.email_address;

  const handleLogout = async () => {
    
    await client.session.revoke();
    
    Swal.fire({
      title: `Your session is finished`,
      confirmButtonColor: "rgb(30, 115, 190)",
      showClass: {
        popup: "animate__animated animate__fadeInDown",
      },
      hideClass: {
        popup: "animate__animated animate__fadeOutUp",
      },
    });
    localStorage.clear();
    navigate("/");
  };

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
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
          }}
        >
          {" "}
            <div>{session ? user : users[0].email}</div>
            <div>
              {session || users[0].email ? (
                <button onClick={handleLogout}>Logout</button>
              ) : ""}
            </div>
        </div>
      </nav>
    </div>
  );
};
