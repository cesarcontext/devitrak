import React, { useState } from "react";
import { AttendeesInfo } from "../../components/admin/Attendees.js/AttendeesInfo";
import { PaymentIntentTemplate } from "../../components/admin/Attendees.js/PaymentIntentTemplate";
// import { ReceiversDetailsAssignation } from "../../components/admin/Attendees.js/ReceiversDetailsAssignation";
import { Navbar } from "../../components/admin/ui/Navbar";

export const Attendees = () => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div>
      <div>
        <Navbar />
        <h2>Users</h2>
        <div>
          <div className="search-div">
            <div>
              <h4>Search</h4>
            </div>
            <div className="search-input">
              <input
                name="value"
                onChange={(e) => setSearchTerm(e.target.value)}
                value={searchTerm}
                placeholder="Search by email!"
              />
            </div>
          </div>
          <div>
            {" "}
            <AttendeesInfo searchTerm={ searchTerm } />
          </div>
          {/* <div>
            <ReceiversDetailsAssignation />
          </div> */}
          <div style={{ display: "flex", width: "100%", margin: "2% auto" }}>
            {" "}
            <PaymentIntentTemplate searchTerm={searchTerm } />
          </div>
        </div>
      </div>
    </div>
  );
};