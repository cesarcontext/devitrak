import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../../components/ui/Navbar";
import { NavbarBottom } from "../../components/ui/NavbarBottom";
import { eventList } from "../../json/eventList";
import { eventListProvider } from "../../json/eventListProvider";
import {
  onAddEventSelected,
  onAddProvider,
} from "../../store/slices/providerEventSlice";

export const SelectEvent = () => {
  const [eventSelected, setEventSelected] = useState("");
  const [provider, setProvider] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleEventSeleted = async (event) => {
    event.preventDefault();
    dispatch(onAddEventSelected(eventSelected));
    dispatch(onAddProvider(provider));
    navigate("/home");
  };
  return (
    <div>
      <Navbar />
      <div>
        <div>
          {" "}
          <select onChange={(event) => setProvider(event.target.value)}>
            <option defaultValue>Select event</option>
            {eventListProvider.map((provider) => {
              return <option value={provider}>{provider}</option>;
            })}
          </select>
        </div>
        <div>
          {" "}
          <select onChange={(event) => setEventSelected(event.target.value)}>
            <option defaultValue>Select event</option>
            {eventList.map((event) => {
              return <option value={event.name}>{event.name}</option>;
            })}
          </select>
        </div>
        <button style={{ width: "fit-content" }} onClick={handleEventSeleted}>
          Select
        </button>
      </div>
      <NavbarBottom />
    </div>
  );
};
