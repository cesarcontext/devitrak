import React, { useEffect, useState } from "react";
import { devitrackApi } from "../../../apis/devitrackApi";
import { eventList } from "../../../json/eventList";
import "../../../style/component/admin/events/live-events.css";

export const PastEvents = () => {
  const [listOfReceiver, setListOfReceiver] = useState([]);
  const currentDate = new Date();
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
      <h5>Past Events</h5>
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
            if (currentDate > location.scheduleEnd) {
              return (
                <>
                  <tr
                    style={{
                      cursor: "pointer",
                    }}
                    onClick
                  >
                    <td>{location.name}</td>
                    <td>{location.location}</td>
                    <td>{listOfReceiver.length}</td>
                  </tr>{" "}
                </>
              );
            }
            return null;
          })}
        </tbody>
      </table>
    </div>
  );
};
