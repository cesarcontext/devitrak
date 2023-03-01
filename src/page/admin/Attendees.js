import React, { useState } from "react";
import { AttendeesInfo } from "../../components/admin/Attendees/AttendeesInfo";
// import { SearchAttendeesByEmail } from "../../components/admin/Attendees/SearchAttendeesByEmail";
import { StripeTransactionHistoryByUser } from "../../components/admin/Attendees/StripeTransactionHistoryByUser";
import { Navbar } from "../../components/admin/ui/Navbar";
import { ResultBySearch } from "../../helper/ResultBySearch";
import "../../style/pages/admin/attendees.css";

export const Attendees = () => {
  const [searchTerm, setSearchTerm] = useState("");
  return (
    <div>
      <div>
        <Navbar />
        <div>
          <div className="search-div">
            <div>
              <h4>Search</h4>
            </div>
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
          <div>{searchTerm === "" && <AttendeesInfo />}</div>
          <div>
            {searchTerm !== "" && <ResultBySearch searchTerm={searchTerm} />}
          </div>
          <div className="d-none">
            {" "}
            <StripeTransactionHistoryByUser searchTerm={searchTerm} />
          </div>
        </div>
      </div>
    </div>
  );
};
