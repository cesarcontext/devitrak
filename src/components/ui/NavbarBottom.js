import React from "react"; //, { useState, useCallback }
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom"; //, Navigate
import { useStytchSession, useStytch } from "@stytch/stytch-react";
import Swal from "sweetalert2";
import { useContactInfoStore } from "../../hooks/useContactInfoStore";
import { onAddNewContact } from "../../store/slices/contactInfoSlice";
import { reset } from '../../store/slices/deviceSlice'
import { onUserPrivacyPolicyResponse } from '../../store/slices/privacyPolicyUserResponseSlice'
import "../../style/component/ui/NavbarBottom.css";

export const NavbarBottom = () => {
  const session = useStytchSession();
  const client = useStytch();
  const { users } = useContactInfoStore();
  const newUser = users.email;
  const dispatch = useDispatch();
  const handleLogout = async () => {
    if (session) {
      await client.session.revoke();
    }
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
    dispatch(
      onAddNewContact({
        id: "",
        groupName: "",
        name: "",
        email: "",
        phoneNumber: "",
        status: "",
      })
    );
    dispatch(onUserPrivacyPolicyResponse(false))
    dispatch( reset())
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
            // flexDirection: "column",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          {" "}
          <Link to="/">
            <div className="btn-logout-section">
              {(session && (
                <button className="btn-logout" onClick={handleLogout}>
                  <i className="bi bi-toggle-off lx"></i>
                </button>
              )) ||
                (newUser && (
                  <button className="btn-logout" onClick={handleLogout}>
                    <i className="bi bi-toggle-off lx"></i>
                  </button>
                ))}
            </div>
          </Link>
        </div>
      </nav>
    </div>
  );
};
