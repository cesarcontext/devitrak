import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { devitrackApi } from "../../../apis/devitrackApi";
import { onSelectEvent } from "../../../store/slices/eventSlice";
import "../../../style/component/admin/events/live-events.css";

export const LiveEvents = () => {
  const [listOfReceiver, setListOfReceiver] = useState([]);
  const [events, setEvents] = useState([]);
  const { user } = useSelector((state) => state.admin);
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const currentDate = new Date();
  useEffect(() => {
    const callApi = async () => {
      const response = await devitrackApi.get("/receiver/receiver-pool-list");
      if (response) {
        setListOfReceiver(response.data.receiversInventory);
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

  const handleEventSelected = (location) => {
    dispatch(onSelectEvent(location.eventName))
    navigate("/admin/attendees")
  };
  return (
    <div className="container-live-events">
      <h5>Live Events</h5>
      <table className="table">
        <thead>
          <tr style={{ borderBottom: "transparant", marginBottom: "5px" }}>
            <th scope="col">EVENT NAME</th>
            <th scope="col">EVENT LOCATION</th>
            {/* <th scope="col">DEVICES AMOUNT</th> */}
          </tr>
        </thead>
        <tbody>
          {events.map((location) => {
            if (
              location.dateBegin >= currentDate &&
              location.dateEnd <= currentDate &&
              location.company === user.company
            ) {
              return (
                <tr
                  style={{
                    cursor: "pointer",
                  }}
                  onClick={async () => handleEventSelected(location)}
                >
                  <td>{location.name}</td>
                  <td>{location.location}</td>
                  {/* <td>{listOfReceiver.length}</td> */}
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
