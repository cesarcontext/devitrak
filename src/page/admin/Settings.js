import React, { useState } from "react";
import { SettingDetailInfo } from "../../components/admin/Setting/SettingDetailInfo";
import { Navbar } from "../../components/admin/ui/Navbar";

export const Settings = () => {
  const [searchTerm, setSearchTerm] = useState("");
  return (
    <div>
      <Navbar />
      {/* <h2>Settings</h2> */}
      <div>
        <div className="search-div">
          <div>
            <h4>Search</h4>
          </div>
          <div id="search-input-setting" className="search-input">
          <input
              className="search-input-field"
                name="value"
                onChange={(e) => setSearchTerm(e.target.value)}
                value={searchTerm}
                placeholder="Search"
              />
              <i onClick={() => setSearchTerm("")} id="icon-delete-searchTerm" className="bi bi-x"/>
          </div>
        </div>
        <div>
          <SettingDetailInfo searchTerm={searchTerm} />
        </div>
      </div>
      <div>
        <div className="container-staff-roles">
          <div className="container-staff-roles-title">
            <h4>Staff Roles Details</h4>
          </div>
          <div className="staff-roles">
            <div className="staff-roles-description">
              <p>
                <strong>Admininstrator</strong> has permissions to edit all
                aspects of the application.
              </p>
            </div>
            <div className="staff-roles-description">
              <p>
                <strong>Approver</strong> has permissions to lorem ipsum dolor
                lorem ipsum dolor.
              </p>
            </div>
            <div className="staff-roles-description">
              <p>
                <strong>Editor</strong> has permissions to lorem ipsum dolor
                lorem ipsum dolor.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
