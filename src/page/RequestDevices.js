import React from "react";
import { Link } from "react-router-dom";

export const RequestDevices = () => {
  const deviceSelected = localStorage.getItem("device");

  return (
    <div
      style={{
        width: "50%",
        height: "60vh",
        margin: "1% auto",
        marginTop: "10%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        alignItems: "center"
      }}
    >
      <div>
        <h4>Your current order</h4>
      </div>
      <div
        style={{
          width: "40%",
          margin: " 3% auto",
          border: "solid 1px #212529",
          borderRadius: "15px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "15px",
          }}
        >
          <p>
            {deviceSelected} {deviceSelected > 1 ? "Devices" : "Devices"}
          </p>
          <p>${deviceSelected * 200} deposit</p>
        </div>
      </div>
      <div style={{
        marginTon: "2%"
      }}>
        <Link to="/my_profile">
          <span>
            VIEW MORE DETAILS IN YOUR ACCOUNT{" "}
            <i className="bi bi-chevron-right"></i>
          </span>
        </Link>
      </div>
      <div>
        <div
          className="request-more-devices-button"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            AlignItems: "center",
            margin: "5%",
            width: "100%"
          }}
        >
          <span>Would you like to request more?</span>
          <Link to="/">
            <button
              style={{
                margin: "15px auto",
                backgroundColor: "rgba(69, 104, 220, 1)",
                color: "#ffff",
                height: "5vh",
                borderRadius: "10px",
                outline: "transparency",
                border: "rgba(69, 104, 220, 1)",
                width: "100%"
              }}
            >
              REQUEST MORE DEVICES
            </button>
          </Link>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          AlignItems: "center",
          margin: "5%",
        }}
      >
        <div
        style={{
          marginTop: "1%",
          marginBottom: "3%"
        }}>
          <Link to="/">
            <span>OTHER RESOURCES</span>
          </Link>
        </div>
        <div
        style={{
          marginBottom: "3%"
        }}>
          <Link to="/how_to_use_the_receiver">
            <span>HOW TO USE THE RECEIVERS</span>
          </Link>
        </div>
        <div
        style={{
          marginBottom: "3%"
        }}>
          <Link to="/request_support_during_event">
            <span>HOW TO REQUEST SUPPORT DURING THE EVENT</span>
          </Link>
        </div>
        <div
        style={{
          marginBottom: "3%"
        }}>
          <Link to="/how_to_return_the_devices">
            <span>HOW TO RETURN THE DEVICES</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
