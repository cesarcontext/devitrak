import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../../components/ui/Navbar";
import { NavbarBottom } from "../../components/ui/NavbarBottom";

export const SelectEvent = () => {
    const [eventSelected, setEventSelected] = useState("")
    const navigate = useNavigate()

    const handleEventSeleted = async(event) => {
        event.preventDefault()
        localStorage.setItem("event-select", eventSelected)
        navigate("/checkout")

    }
  return (
    <div>
      <Navbar />
      <div>
        <select onChange={event => setEventSelected(event.target.value)}>
            <option defaultValue>Select event</option>
            <option value="Nation Reatil Conference">Nation Reatil Conference</option>
        </select>
        <button onClick={handleEventSeleted}>Select</button>
      </div>
      <NavbarBottom />
    </div>
  );
};
