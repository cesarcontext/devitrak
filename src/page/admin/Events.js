import React, { useState } from "react";
import { Navbar } from "../../components/admin/ui/Navbar";
import { LiveEvents } from "../../components/admin/Events/LiveEvents";
import { DeviceInventoryEvents } from "../../components/admin/Events/DeviceInventoryEvents";
import { PastEvents } from "../../components/admin/Events/PastEvents";
import "../../style/pages/admin/events.css";

export const Events = () => {
  const [searchTerm, setSearchTerm] = useState("");
  return (
    <div className="event-container-page">
      <Navbar />
      <div className="search-div">
        <h4>Search</h4>
        <div className="search-input">
          <input
            className="search-input-field"
            name="value"
            onChange={(e) => setSearchTerm(e.target.value)}
            value={searchTerm}
            placeholder="Search"
          />
          {searchTerm !== "" && (
            <i
              onClick={() => setSearchTerm("")}
              id="icon-delete-searchTerm"
              className="bi bi-x"
            />
          )}
        </div>
      </div>
      <section>
        <div className="events-display">
          <LiveEvents />
          <PastEvents /> 
          <DeviceInventoryEvents />
        </div>
      </section>
    </div>
  );
};
