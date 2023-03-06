import React, { useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { devitrackApi } from "../../../apis/devitrackApi";
import { swalAlertMessage } from "../../../helper/swalFireMessage";
import "../../../style/component/admin/events/live-events.css";

export const EventCreater = () => {
  const { user } = useSelector((state) => state.admin);
  const [eventList, setEventList] = useState([]);
  const [updateList, setUpdateList] = useState(false);
  const [begin, setBegin] = useState("");
  const [end, setEnd] = useState("");
  const [eventName, setEventName] = useState("");
  const [eventLocation, setEventLocation] = useState("");
  const stampTime = new Date();
  const callApiEventList = useCallback(async () => {
    const response = await devitrackApi.get("/event/event-list");
    if (response) {
      setEventList(response.data.list);
    }
  }, [updateList]);
  callApiEventList();

  const handleSubmitEvent = async (event) => {
    event.preventDefault();
    if (!eventName) return null;
    if (!eventLocation) return null;
    if (!begin) return null;
    if (!end) return null;
    try {
      const response = await devitrackApi.post("/event/create-event", {
        user: user.email,
        eventName: eventName,
        location: eventLocation,
        dateBegin: begin,
        dateEnd: end,
        company: user.company,
      });
      if (response) {
        devitrackApi.post("/eventLog/feed-event-log", {
          user: user.email,
          actionTaken: "Event was created",
          time: stampTime,
        });
        setBegin("");
        setEnd("");
        setEventName("");
        setEventLocation("");
        swalAlertMessage("Event was created succesfully");
        setUpdateList(!updateList);
      }
    } catch (error) {
      console.log(
        "🚀 ~ file: EventCreater.js:18 ~ handleSubmitEvent ~ error:",
        error
      );
      alert("Something went wrong. Event was not created. Please try later");
    }
  };
  return (
    <div className="container-live-events">
      <h5>CREATE NEW EVENT</h5>
      <div>
        <form onSubmit={handleSubmitEvent}>
          <label>Event Name</label>
          <input
            name="eventName"
            value={eventName}
            onChange={(event) => setEventName(event.target.value)}
            placeholder="National Retail Conference"
          />
          <label>Event Location</label>
          <input
            name="eventLocation"
            value={eventLocation}
            onChange={(event) => setEventLocation(event.target.value)}
            placeholder="New York, New York"
          />
          <label>Event Time Begin</label>
          <input
            name="begin"
            value={begin}
            onChange={(event) => setBegin(event.target.value)}
            placeholder="01-15-2023 07:00:00"
          />
          <label>Event Time End</label>
          <input
            name="end"
            value={end}
            onChange={(event) => setEnd(event.target.value)}
            placeholder="01-17-2023 16:00:00"
          />
          <button
            type="submit"
            className="btn btn-create"
            style={{ width: "fit-content" }}
          >
            Submit
          </button>
        </form>
      </div>
      <div>
        <br />
        <h2>List</h2>
        <hr/>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Location</th>
              <th>Date Begin</th>
              <th>Date End</th>
            </tr>
          </thead>
          <tbody>
            {eventList?.map(
              ({ id, eventName, location, dateBegin, dateEnd, company }) => {
                if (company === user.company) {
                  return (
                    <tr key={id}>
                      <td>{eventName}</td>
                      <td>{location}</td>
                      <td>{dateBegin}</td>
                      <td>{dateEnd}</td>
                    </tr>
                  );
                }
                return null;
              }
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
