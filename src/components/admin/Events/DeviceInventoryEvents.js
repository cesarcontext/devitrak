import React, { useEffect } from "react";
import { useState } from "react";
import { devitrackApi } from "../../../apis/devitrackApi";
import { GraphicDisplayDevices } from "./GraphicDisplayDevices";
import "../../../style/component/admin/events/device-inventory-events.css"

export const DeviceInventoryEvents = () => {
  const [listOfReceiver, setListOfReceiver] = useState([]);

  useEffect(() => {
    const callApi = async () => {
      const response = await devitrackApi.get("/receiver/receiver-pool-list");
      if (response) {
        setListOfReceiver(response.data.receiversInventory);
      }
    };
    return () => {
      callApi();
    };
  }, []);

  return (
    <div className="container-inventory-events">
      <div>
        <h5>Devices Inventory</h5>
        <p>
          {`There are `}
          <strong>{`${listOfReceiver.length}`}</strong>
          {` devices to be returned from all event.`}
        </p>
      </div>

      <GraphicDisplayDevices />
    </div>
  );
};
