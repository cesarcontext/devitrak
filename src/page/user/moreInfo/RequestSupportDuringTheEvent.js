import React from "react";
import { Link } from "react-router-dom";

import { NavbarBottom } from "../../../components/ui/NavbarBottom";
import { Navbar } from "../../../components/ui/Navbar";

export const RequestSupportDuringTheEvent = () => {
  return (
    <div className="general-container">
      <Navbar />
      <div className="container-more-info-how-to-use">
        <div className="container-more-info-how-to-use-title">
          <Link to="/more_info">
            <p>
              <span>
                <i className="bi bi-chevron-left"></i>
                BACK TO ALL ARTICLES{" "}
              </span>
            </p>
          </Link>
        </div>
        <div className="container-info-cards">
          <div className="container-info-cards-body">
            <h5 className="card-title">How to request receivers</h5>
            <div className="card-body">
              <p className="card-text">
                Scan QR code from poster, which will take you to the page:
                https://app.devitrak.net/
                <br />
                Fill out your contact information, payment information, and
                number of devices needed.
                <br />
                You will get an email confirmation once the deposit transaction
                has gone through.
                <br />
                Go to towards the ContextGlobal staff, which will now provide
                you with the number of devices requested.
                <br />
                <strong>
                  Replacing damaged device, please take the device to context
                  global desk and provide the reason of why the device needs to
                  be replaced.
                </strong>
              </p>
            </div>
          </div>
        </div>
        <div className="container-help-links">
          <div className="container-help-link-body">
            <div className="help-links-title">
              <span>OTHER QUESTIONS</span>
            </div>
            <div className="help-links-body">
              <Link to="/more_info/how_to_use_the_receiver">
                <span>HOW TO USE THE RECEIVER</span>
              </Link>
            </div>
            <div className="help-links-body">
              <Link to="/more_info/how_to_return_the_devices">
                <span>HOW TO RETURN THE DEVICES</span>
              </Link>
            </div>
          </div>
        </div>
        <div className="div-bottom-space"></div>
      </div>
      <NavbarBottom />
    </div>
  );
};
