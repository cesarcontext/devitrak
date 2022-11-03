import React from "react";
import { Link } from "react-router-dom";
import ReactPlayer from "react-player";
import { NavbarBottom } from "../../components/ui/NavbarBottom";
import { Navbar } from "../../components/ui/Navbar";
import "../../style/pages/moreInfo/HowToReturnTheDevices.css";


export const HowToReturnTheDevices = () => {
  return (
    <>
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
        <div className="container-more-info-how-to-use-video">
          <div className="video-how-to-use">
            <ReactPlayer
              url="https://www.youtube.com/watch?v=9kvR_5KCEh4"
              controls={true}
              muted
              light={true}
              width="100%"
              height="100%"
            />
          </div>
        </div>
        <div className="container-info-cards">
          <div className="container-info-cards-body">
            <h5 className="card-title">How to return the receiver</h5>
            <div className="card-body">
              <p className="card-text">
                Some quick example text to build on the card title and make up
                the bulk of the card's content.Some quick example text to build
                on the card title and make up the bulk of the card's content.
              </p>
            </div>
          </div>
          <div className="container-info-cards-body">
            <div className="card-body">
              <h5 className="card-title">Card title</h5>
              <p className="card-text">
                Some quick example text to build on the card title and make up
                the bulk of the card's content.Some quick example text to build
                on the card title and make up the bulk of the card's content.
              </p>
            </div>
          </div>
          <div className="container-info-cards-body">
            <div className="card-body">
              <h5 className="card-title">Card title</h5>
              <p className="card-text">
                Some quick example text to build on the card title and make up
                the bulk of the card's content.Some quick example text to build
                on the card title and make up the bulk of the card's content.
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
                <span>HOW TO REQUEST SUPPORT DURING THE EVENT</span>
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
    </>
  );
};
