import React from "react";
import { Link } from "react-router-dom";

export const MoreInfo = () => {
  return (
    <div
      style={{
        width: "50%",
        margin: "auto",
        height: "calc(100% - 18vh)",
        marginBottom: "16vh",
      }}
    >
      <div>
        <h5>More Information</h5>
        <br />
        <span>
          In this page you will find more information and frequently asked
          questions.
        </span>
      </div>
      <div
        style={{
          border: "solid 1px blue",
          borderRadius: "15px",
          margin: "5%",
          height: "",
          padding: "15px",
        }}
      >
        <Link to="/how_to_use_the_receiver">
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
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>
          </div>
        </Link>
      </div>
      <div
        style={{
          border: "solid 1px blue",
          borderRadius: "15px",
          margin: "5%",
          height: "",
          padding: "15px",
        }}
      >
        <Link to="/how_to_return_the_devices">
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
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>
          </div>
        </Link>
      </div>
      <div
        style={{
          border: "solid 1px blue",
          borderRadius: "15px",
          margin: "5%",
          height: "",
          padding: "15px",
        }}
      >
        <Link to="/request_support_during_event">
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
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>
          </div>
        </Link>
      </div>
      <div
        style={{
          border: "solid 1px blue",
          borderRadius: "15px",
          margin: "5%",
          height: "",
          padding: "15px",
        }}
      >
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
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>
          </div>
        </Link>
      </div>
      <div
        style={{
          border: "solid 1px blue",
          borderRadius: "15px",
          margin: "5%",
          height: "",
          padding: "15px",
        }}
      >
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
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};
