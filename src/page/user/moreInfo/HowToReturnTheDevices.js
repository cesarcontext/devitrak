import React from "react";
import { Link } from "react-router-dom";

import { NavbarBottom } from "../../../components/ui/NavbarBottom";
import { Navbar } from "../../../components/ui/Navbar";
import "../../../style/pages/moreInfo/HowToReturnTheDevices.css";

export const HowToReturnTheDevices = () => {
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
            <h5 className="card-title">How to return receivers</h5>
            <div className="card-body">
              <p className="card-text">
                When the conference is finished you must go back to
                ContextGlobal desk and return all devices.
                <br />
                The deposit will be released after all devices are returned.
                <br />
                If you have not returned all devices after 1hr of the conference
                finishing, our staff will attempt to contact you. If we cannot
                contact you after 48 hours, we will charge the credit card on
                file for the missing devices.
                <br />{" "}
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
              <Link to="/more_info/request_support_during_event">
                <span>HOW TO REQUEST RECEIVERS</span>
              </Link>
            </div>
            <div className="help-links-body">
              <Link to="/more_info/how_to_use_the_receiver">
                <span>HOW TO USE THE RECEIVER</span>
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