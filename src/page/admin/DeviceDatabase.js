import React from "react";
import { DisplayDataReceiversActivity } from "../../components/admin/DeviceDatabaseSection/DisplayDataReceiversActivity";
import { DisplayDataReceiversStatus } from "../../components/admin/DeviceDatabaseSection/DisplayDataReceiversStatus";
import { ReceiverStock } from "../../components/admin/DeviceDatabaseSection/ReceiverStock";
import { Navbar } from "../../components/admin/ui/Navbar";
import "../../style/component/admin/DeviceDatabase.css"
export const DeviceDatabase = () => {
  return (
    <div>
      <Navbar />
      {/* <h2>Database</h2> */}
      <div>
        <ReceiverStock />
      </div>
      <div className="container-graphic" style={{display:"flex", justifyContent:"space-around", alignItems:"center"}}>
        <DisplayDataReceiversActivity />
        <DisplayDataReceiversStatus />
      </div>
    </div>
  );
};
        
