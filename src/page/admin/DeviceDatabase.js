import React, { useState } from "react";
import { DisplayDataReceiversActivity } from "../../components/admin/DeviceDatabaseSection/DisplayDataReceiversActivity";
import { DisplayDataReceiversStatus } from "../../components/admin/DeviceDatabaseSection/DisplayDataReceiversStatus";
import { ReceiverStock } from "../../components/admin/DeviceDatabaseSection/ReceiverStock";
import { Navbar } from "../../components/admin/ui/Navbar";
import "../../style/component/admin/DeviceDatabase.css";

export const DeviceDatabase = () => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
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
            <i
              onClick={() => setSearchTerm("")}
              id="icon-delete-searchTerm"
              className="bi bi-x"
            />
          </div>
        </div>
        <ReceiverStock searchTerm={searchTerm} />
      </div>
      <div
        className="container-graphic"
      >
        <DisplayDataReceiversActivity />
        <DisplayDataReceiversStatus />
      </div>
    </div>
  );
};
