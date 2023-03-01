import React from "react";
import { Link } from "react-router-dom";
import { Navbar } from "../../components/ui/Navbar";
import { NavbarBottom } from "../../components/ui/NavbarBottom";
import "../../style/pages/moreInfo/MoreInfo.css";
export const MoreInfo = () => {
  return (
    <div className="general-container">
      <Navbar />
      <div className="container-more-info">
        <div className="more-info-title">
          <h5
            style={{
              color: "var(--main-colorsfading-horizon)",
            }}
          >
            More Information
          </h5>
          <span>
            In this page you will find more information and frequently asked
            questions.
          </span>
        </div>
        <div className="container-link-info">
          <Link to="how_to_use_the_receiver">
            <div>
              <div className="container-title-icon-more-info">
                <h6>How to use the receivers</h6>

                <i className="bi bi-arrow-right-circle"></i>
              </div>
              <div className="container-text-body">
                <p>
                  The receiver only works when an earphone is connected and the
                  receiver switches to stand-by state. Push shortly
                </p>
              </div>
            </div>
          </Link>
        </div>
        <div className="container-link-info">
          <Link to="how_to_return_the_devices">
            <div>
              <div className="container-title-icon-more-info">
                <h6>How to request receivers</h6>

                <i className="bi bi-arrow-right-circle"></i>
              </div>
              <div className="container-text-body">
                <p>
                  Scan QR code from poster, which will take you to the page:
                  https://app.devitrak.net/. Fill out your contact information,
                  payment information, and number of devices needed.
                </p>
              </div>
            </div>
          </Link>
        </div>
        <div className="container-link-info">
          <Link to="request_support_during_event">
            <div>
              <div className="container-title-icon-more-info">
                <h6>How to return receivers</h6>

                <i className="bi bi-arrow-right-circle"></i>
              </div>
              <div className="container-text-body">
                <p>
                  When the conference is finished you must go back to
                  ContextGlobal desk and return all devices. The deposit will be
                  released after all devices are returned.
                </p>
              </div>
            </div>
          </Link>
        </div>
        <div
          style={{
            color: "transparent",
            height: "16vh",
          }}
        ></div>
      </div>
      <NavbarBottom />
    </div>
  );
};
