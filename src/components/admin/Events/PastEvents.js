import { func } from "prop-types";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { devitrackApi } from "../../../apis/devitrackApi";
import "../../../style/component/admin/events/live-events.css";

export const PastEvents = () => {
  const [listOfReceiver, setListOfReceiver] = useState([]);
  const [events, setEvents] = useState([]);
  const { user } = useSelector((state) => state.admin);
  const currentDate = new Date();
  useEffect(() => {
    const callApi = async () => {
      const response = await devitrackApi.get(
        "/receiver/receiver-assigned-list"
      );
      if (response) {
        setListOfReceiver(response.data.listOfReceivers);
      }
    };
    callApi();
  }, [listOfReceiver]);

  useEffect(() => {
    const callApiEvent = async () => {
      const response = await devitrackApi.get("/event/event-list");
      if (response) {
        setEvents(response.data.list);
      }
    };
    callApiEvent();
  }, [events]);

  const sortArray = () => {
    let deviceSum = [];
    for (let location of events) {
      listOfReceiver.map((event, index) => {
        if (location.eventName === event.eventSelected) {
          deviceSum.push(event.device.length);
        }
      });
      return deviceSum.reduce(function (a, b) {
        return a + b;
      }, 0);
    }
  };
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
          {events.map((location) => {
            const check = new Date(`${location.dateEnd}`);
            if (currentDate > check && location.company === user.company) {
              return (
                <tr
                key={location.id}
                  style={{
                    cursor: "pointer",
                  }}
                  onClick
                >
                  <td>{location.eventName}</td>
                  <td>{location.location}</td>
                  <td>{sortArray()}</td>
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
