import React, { useState } from "react";
import { AttendeesInfo } from "../../components/admin/Attendees/AttendeesInfo";
import { PaymentIntentTemplate } from "../../components/admin/Attendees/PaymentIntentTemplate";
import { Navbar } from "../../components/admin/ui/Navbar";

export const Attendees = () => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div>
      <div>
        <Navbar />
        {/* <h2>Users</h2> */}
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
          <div style={{ display: "flex",justifyContent:"center",alignItems: "center", width: "70%", marginLeft: "16rem" }}>
            {" "}
            <PaymentIntentTemplate searchTerm={searchTerm } />
          </div>
        </div>
      </div>
    </div>
  );
};
