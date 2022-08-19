import React from "react";
import { Link } from "react-router-dom";
import ReactPlayer from "react-player";

export const RequestSupportDuringTheEvent = () => {
  return (
    <div
      style={{
        width: "40%",
        height: "90vh",
        margin: "auto",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        alignItems: "center",
        textAlign: "start",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          marginTop: "3%"
        }}
      >
        <Link to="/more_info">
          <p>
            <span>
              <i className="bi bi-chevron-left"></i>
              BACK TO ALL ARTICLES{" "}
            </span>
          </p>
        </Link>
      </div>
      <div>
        <div>
          <ReactPlayer
            url="https://www.youtube.com/watch?v=9kvR_5KCEh4"
            controls={true}
            muted
            light={true}
          />
        </div>
      </div>
      <div
        style={{
          width: "75%",
          // height: "35vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
        }}
      >
        <div
          style={{
            margin: "20px 0",
          }}
        >
          <h5 className="card-title">
            How to request support during the event
          </h5>
          <div className="card-body">
            <p className="card-text">
              Some quick example text to build on the card title and make up the
              bulk of the card's content.Some quick example text to build on the
              card title and make up the bulk of the card's content.
            </p>
          </div>
        </div>
        <div
          style={{
            margin: "20px 0",
          }}
        >
          <div className="card-body">
            <h5 className="card-title">Card title</h5>
            <p className="card-text">
              Some quick example text to build on the card title and make up the
              bulk of the card's content.Some quick example text to build on the
              card title and make up the bulk of the card's content.
            </p>
          </div>
        </div>
        <div
          style={{
            margin: "20px 0",
          }}
        >
          <div className="card-body">
            <h5 className="card-title">Card title</h5>
            <p className="card-text">
              Some quick example text to build on the card title and make up the
              bulk of the card's content.Some quick example text to build on the
              card title and make up the bulk of the card's content.
            </p>
          </div>
        </div>
      </div>
      <div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            AlignItems: "center",
            margin: "5%",
            width: "100%",
            textAlign: "center",
          }}
        >
          <div
            style={{
              margin: "5px 0",
            }}
          >
              <span>OTHER QUESTIONS</span>
          </div>
          <div
            style={{
              margin: "5px 0",
            }}
          >
            <Link to="/how_to_use_the_receiver">
              <span>HOW TO USE THE RECEIVERS</span>
            </Link>
          </div>
          <div
            style={{
              margin: "10px 0",
            }}
          >
            <Link to="/how_to_return_the_devices">
              <span>HOW TO RETURN THE DEVICES</span>
            </Link>
          </div>
        </div>
      </div>
      <div
        style={{
          color: "transparent",
          height: "16vh",
        }}
      ></div>
    </div>
  );
};
