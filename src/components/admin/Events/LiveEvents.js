import React, { useEffect, useState } from "react";
import { devitrackApi } from "../../../apis/devitrackApi";
import "../../../style/component/events/live-events.css"

export const LiveEvents = () => {
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
    <div className="container-live-events">
      <h5>Live Events</h5>
      <table className="table">
        <thead>
          <tr style={{borderBottom:"transparant", marginBottom:"5px"}}>
            <th scope="col">EVENT NAME</th>
            <th scope="col">EVENT LOCATION</th>
            <th scope="col">DEVICES AMOUNT</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>National Retail Conference</td>
            <td>New York, New York</td>
            <td>{listOfReceiver.length}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
