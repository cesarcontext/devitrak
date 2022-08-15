import React from "react";
import {PaymentElement} from '@stripe/react-stripe-js';
import "./App.css";
import { ContactInfo } from "./components/ContactInfo";
import { Devices } from "./components/Devices";
import { Navbar } from "./components/Navbar";
import { PaymentInfo } from "./components/PaymentInfo";

function App() {
  const { amountToDeposit } = Devices;

  const handleOnSubmit = (event) => {
    event.preventDefault();
    console.log("submitted");
    console.log(amountToDeposit);
  };

  return (
    <div className="App">
      <Navbar />
      <form onSubmit={handleOnSubmit}>
        <Devices amountToDeposit={amountToDeposit} />
        <ContactInfo />
        <PaymentInfo />
        <button style={{ margin: 'auto'}} type="submit">SUBMIT AND REQUEST DEVICES</button>
      </form>
    </div>
  );
}

export default App;
