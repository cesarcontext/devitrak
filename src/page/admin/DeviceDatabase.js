import React from "react";
import { DisplayDataReceiversActivity } from "../../components/admin/DeviceDatabaseSection/DisplayDataReceiversActivity";
import { DisplayDataReceiversStatus } from "../../components/admin/DeviceDatabaseSection/DisplayDataReceiversStatus";
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
      <div style={{
        width:"70%",
        display:"flex",
        flexWrap:"wrap",
        justifyContent:"space-between",
        alignItems:"center",
        margin:"auto"
      }}>
        <DisplayDataReceiversActivity />
        <DisplayDataReceiversStatus />
      </div>
    </div>
  );
};
        
