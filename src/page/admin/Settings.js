import React, { useState } from "react";
import { SettingDetailInfo } from "../../components/admin/Setting/SettingDetailInfo";
import { Navbar } from "../../components/admin/ui/Navbar";

export const Settings = () => {
  const [searchTerm, setSearchTerm] = useState("");
  return (
    <div>
      <Navbar />
      <h2>Settings</h2>
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
          <SettingDetailInfo searchTerm={searchTerm} />
        </div>
      </div>
      <div>
        <div>
          <div>
            <p>
              <strong>Admininstrator</strong> has permissions to edit all
              aspects of the application.
            </p>
          </div>
          <div>
            <p>
              <strong>Approver</strong> has permissions to lorem ipsum dolor
              lorem ipsum dolor.
            </p>
          </div>
          <div>
            <p>
              <strong>Editor</strong> has permissions to lorem ipsum dolor lorem
              ipsum dolor.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
