import React from "react";
import { ReceiverStock } from "../../components/admin/DeviceDatabaseSection/ReceiverStock";
import { Navbar } from "../../components/admin/ui/Navbar";

export const DeviceDatabase = () => {
  return (
    <div>
      <Navbar />
      <h2>Database</h2>
      <div>
        <ReceiverStock />
      </div>
    </div>
  );
};
