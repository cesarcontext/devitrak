import React from "react";
import { Link } from "react-router-dom";
import { useStytchSession } from "@stytch/stytch-react";
import { useSelector } from "react-redux";
import { Navbar } from "../../components/ui/Navbar";
import { NavbarBottom } from "../../components/ui/NavbarBottom";
import { TotalOrder } from "../../helper/TotalOrder";
import "../../style/pages/RequestDevices.css";

export const RequestDevices = () => {
  const session = useStytchSession();
  const { users } = useSelector((state) => state.contactInfo);

  return (
    <div className="general-container">
      <Navbar />
      {users.email !== "" ? (
        <div className="container-request-device-section">
          <div>
            <h4>Your total order</h4>
          </div>
          <div className="container-request-current-order">
            <div className="container-request-current-order-display">
              <p>
                {TotalOrder().device}{" "}
                {TotalOrder().device > 1 ? "Devices" : "Devices"}
              </p>
              <p>${TotalOrder().device * 200} deposit</p>
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

              {users.id !== "" || session ? (
                <Link to="/checkout">
                  <button className="btn" id="btn-rquest-more-device">
                    <p>REQUEST MORE DEVICES</p>
                  </button>
                </Link>
              ) : (
                <Link to="/">
                  <button className="btn" id="btn-rquest-more-device">
                    <p>REQUEST MORE DEVICES</p>
                  </button>
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
            <div className="link-help-router">
              <Link to="/more_info/how_to_use_the_receiver">
                <span>USING THE RECEIVERS</span>
              </Link>
            </div>
            <div className="link-help-router">
              <Link to="/more_info/request_support_during_event">
                <span>REQUESTING RECEIVERS</span>
              </Link>
            </div>
            <div className="link-help-router">
              <Link to="/more_info/how_to_return_the_devices">
                <span>RETURNING RECEIVERS</span>
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div
            style={{
              width: "80%",
              border: "solid 1px #212529",
              margin: "0 auto",
              backgroundColor: "white",
              borderRadius: "15px",
              marginTop: "5vh",
            }}
          >
            <h4>You are logout.</h4>
            <Link to="/">
              <span>Please click this link to start your log in process</span>{" "}
            </Link>
          </div>
        </>
      )}
      <NavbarBottom />
    </div>
  );
};
