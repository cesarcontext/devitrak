import React from "react";
import { NavbarBottom } from "../components/ui/NavbarBottom";

export const EventScheduled = () => {
  return (
    <>
      <div
        className="event-schedule-container"
        style={{
          marginTop: "5%",
        }}
      >
        <div>
          <h2>Event Schedule</h2>
        </div>
        <div>
          <p>
            <span>Interpretation will be available in the following rooms</span>
          </p>
        </div>
        <div>
          <div>
            <img
              src={require("../image/event-scheduled-img.jpg")}
              alt="event-scheduled"
            />
          </div>
        </div>
        <div>
          <div>
            <h2>Expo Hall 3rd Floor</h2>
          </div>
          <div>
            <div>
              <p>Room 301-A</p>
            </div>
            <div>
              <p>Room 301-B</p>
            </div>
            <div>
              <p>Room 30</p>
            </div>
          </div>
          <div>
            <h4>New Hall 2nd Floor</h4>
          </div>
          <div>
            <div>
              <p>Room 220</p>
            </div>
          </div>
        </div>
      </div>
      <NavbarBottom />
    </>
  );
};
