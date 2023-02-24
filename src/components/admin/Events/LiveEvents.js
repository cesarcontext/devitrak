import React, { useEffect, useState } from "react";
import { devitrackApi } from "../../../apis/devitrackApi";
import { eventList } from "../json/eventList";
import "../../../style/component/admin/events/live-events.css";

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
  const currentDate = new Date();

  return (
    <div className="container-live-events">
      <h5>Live Events</h5>
      <table className="table">
        <thead>
          <tr style={{ borderBottom: "transparant", marginBottom: "5px" }}>
            <th scope="col">EVENT NAME</th>
            <th scope="col">EVENT LOCATION</th>
            <th scope="col">DEVICES AMOUNT</th>
          </tr>
        </thead>
        <tbody>
          {eventList.map((location) => {
            console.log(
              "🚀 ~ file: LiveEvents.js:35 ~ {eventList.map ~ location:",
              location
            );
            let checkArrayLength = new Map();
            listOfReceiver.map((item) => {
              console.log(
                "🚀 ~ file: LiveEvents.js:38 ~ listOfReceiver.map ~ item:",
                item
              );
              if (item.eventSelected === location.name) {
                return checkArrayLength.set(item.device, item);
              }
              return null;
            });
            if (
              location.scheduleBeging >= currentDate &&
              location.scheduleEnd <= currentDate
            ) {
              return (
                <tr
                  style={{
                    cursor: "pointer",
                  }}
                  onClick
                >
                  <td>{location.name}</td>
                  <td>{location.location}</td>
                  <td>{checkArrayLength.size}</td>
                </tr>
              );
            }
            return null;
          })}
        </tbody>
      </table>
    </div>
  );
};
