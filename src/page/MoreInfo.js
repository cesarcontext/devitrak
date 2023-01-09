import React from "react";
import { Link } from "react-router-dom";
import { Navbar } from "../components/ui/Navbar";
import { NavbarBottom } from "../components/ui/NavbarBottom";
import "../style/pages/moreInfo/MoreInfo.css";
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
                <h6>How to use the recierver</h6>

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
                <h6>How to return the devices</h6>

                <i className="bi bi-arrow-right-circle"></i>
              </div>
              <div className="container-text-body">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
              </div>
            </div>
          </Link>
        </div>
        <div className="container-link-info">
          <Link to="request_support_during_event">
            <div>
              <div className="container-title-icon-more-info">
                <h6>Request support during event</h6>

                <i className="bi bi-arrow-right-circle"></i>
              </div>
              <div className="container-text-body">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
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
