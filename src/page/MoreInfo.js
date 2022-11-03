import React from "react";
import { Link } from "react-router-dom";
import { Navbar } from "../components/ui/Navbar";
import { NavbarBottom } from "../components/ui/NavbarBottom";
import "../style/pages/moreInfo/MoreInfo.css";
export const MoreInfo = () => {
  return (
    <>
      <Navbar />
      <div className="container-more-info">
        <div className="more-info-title">
          <h5>More Information</h5>
          <span>
            In this page you will find more information and frequently asked
            questions.
          </span>
        </div>
        <div
          className="container-link-info"
          >
          <Link to="how_to_use_the_receiver">
            <div>
              <div
                style={{
                  display: "flex",
                  justifyContent: " space-between",
                  margin: "5px",
                  padding: "15px",
                }}
              >
                <h5>How to use the recierver</h5>

                <i className="bi bi-arrow-right-circle"></i>
              </div>
              <div>
                <p
                  style={{
                    padding: "10px",
                  }}
                >
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
              </div>
            </div>
          </Link>
        </div>
        <div
          className="container-link-info">
          <Link to="how_to_return_the_devices">
            <div>
              <div
                style={{
                  display: "flex",
                  justifyContent: " space-between",
                  margin: "5px",
                  padding: "15px",
                }}
              >
                <h5>How to return the devices</h5>

                <i className="bi bi-arrow-right-circle"></i>
              </div>
              <div>
                <p
                  style={{
                    padding: "10px",
                  }}
                >
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
              </div>
            </div>
          </Link>
        </div>
        <div
          className="container-link-info">
          <Link to="request_support_during_event">
            <div>
              <div
                style={{
                  display: "flex",
                  justifyContent: " space-between",
                  margin: "5px",
                  padding: "15px",
                }}
              >
                <h5>Request support during event</h5>

                <i className="bi bi-arrow-right-circle"></i>
              </div>
              <div>
                <p
                  style={{
                    padding: "10px",
                  }}
                >
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
              </div>
            </div>
          </Link>
        </div>
        <div
          className="container-link-info">
          <Link to="/">
            <div>
              <div
                style={{
                  display: "flex",
                  justifyContent: " space-between",
                  margin: "5px",
                  padding: "15px",
                }}
              >
                <h5>Lorem ipsum dolor sit amet</h5>

                <i className="bi bi-arrow-right-circle"></i>
              </div>
              <div>
                <p
                  style={{
                    padding: "10px",
                  }}
                >
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
              </div>
            </div>
          </Link>
        </div>
        <div
          className="container-link-info">
          <Link to="/">
            <div>
              <div
                style={{
                  display: "flex",
                  justifyContent: " space-between",
                  margin: "5px",
                  padding: "15px",
                }}
              >
                <h5>Lorem ipsum dolor sit amet</h5>

                <i className="bi bi-arrow-right-circle"></i>
              </div>
              <div>
                <p
                  style={{
                    padding: "10px",
                  }}
                >
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
    </>
  );
};
