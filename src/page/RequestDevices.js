import React from "react";
import { Link } from "react-router-dom";
import { useStytchSession } from "@stytch/stytch-react";
import { NavbarBottom } from "../components/ui/NavbarBottom";
import { Navbar } from "../components/ui/Navbar";
import { useDeviceCount } from "../hooks/useDeviceCountStore";
import "../style/pages/RequestDevices.css";

export const RequestDevices = () => {
  const session = useStytchSession();
  const status = localStorage.getItem("status");
  console.log(
    "🚀 ~ file: RequestDevices.js ~ line 13 ~ RequestDevices ~ status",
    status
  );
  const { device } = useDeviceCount();

  return (
    <>
      <Navbar />
      <div className="container-request-device-section">
        <div>
          <h4>Your current order</h4>
        </div>
        <div className="container-request-current-order">
          <div
            className="container-request-current-order-display"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "15px",
            }}
          >
            <p>
              {device} {device > 1 ? "Devices" : "Devices"}
            </p>
            <p>${device * 200} deposit</p>
          </div>
        </div>
        <div className="view-more-details-acount">
          <Link to="/my_profile">
            <span>
              VIEW MORE DETAILS IN YOUR ACCOUNT{" "}
              <i className="bi bi-chevron-right"></i>
            </span>
          </Link>
        </div>
        <div>
          <div className="request-more-devices-button">
            <span>Would you like to request more?</span>

            {status === true || session ? (
              <Link to="/checkout">
                <button>REQUEST MORE DEVICES</button>
              </Link>
            ) : (
              <Link to="/">
                <button>REQUEST MORE DEVICES</button>
              </Link>
            )}
          </div>
        </div>

        <div className="request-device-help-links-body">
          <div
            style={{
              marginTop: "1%",
              marginBottom: "3%",
            }}
          >
            <Link to="/more_info">
              <span>OTHER RESOURCES</span>
            </Link>
          </div>
          <div
            style={{
              marginBottom: "3%",
            }}
          >
            <Link to="/more_info/how_to_use_the_receiver">
              <span>HOW TO USE THE RECEIVERS</span>
            </Link>
          </div>
          <div
            style={{
              marginBottom: "3%",
            }}
          >
            <Link to="/more_info/request_support_during_event">
              <span>HOW TO REQUEST SUPPORT DURING THE EVENT</span>
            </Link>
          </div>
          <div
            style={{
              marginBottom: "3%",
            }}
          >
            <Link to="/more_info/how_to_return_the_devices">
              <span>HOW TO RETURN THE DEVICES</span>
            </Link>
          </div>
        </div>
      </div>
      <NavbarBottom />
    </>
  );
};
