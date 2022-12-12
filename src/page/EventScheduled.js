import React from "react";
import { Navbar } from "../components/ui/Navbar";
import { NavbarBottom } from "../components/ui/NavbarBottom";
import "../style/pages/EventScheduled.css";
export const EventScheduled = () => {
  return (
    <div className="general-container">
      <Navbar />
      <div className="event-schedule-container">
        <div className="container-schedule-event-title">
          <h2>Event Schedule</h2>
        </div>
        <div className="container-schedule-event-text">
          <p>
            <span>Interpretation will be available in the following rooms</span>
          </p>
        </div>
        <div className="container-schedule-event-img">
          <img
            src={require("../image/event-scheduled-img.jpg")}
            alt="event-scheduled"
          />
        </div>
        <div className="container-schedule-event-body">
          <div className="container-schedule-event-body-title">
            <h2>Expo Hall 3rd Floor</h2>
          </div>
          <div className="container-schedule-event-body-description">
            <div className="info-detail-each">
              <p>Room<br/>301-A</p>
            </div>
            <div className="info-detail-each">
              <p>Room<br/>301-B</p>
            </div>
            <div className="info-detail-each">
              <p>Room<br/>30</p>
            </div>
          </div>
          <div className="container-schedule-event-body-title">
            <h4>New Hall 2nd Floor</h4>
          </div>
          <div className="container-schedule-event-body-description">
            <div>
              <p></p>
            </div>
            <div className="info-detail-each">
              <p>Room<br/>220</p>
            </div>
            <div>
              <p></p>
            </div>
          </div>
        </div>
      </div>
      <NavbarBottom />
    </div>
  );
};
