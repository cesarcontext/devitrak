import React from "react";
import { Routes, Route } from "react-router";
import "./App.css";
import { Navbar } from "./components/Navbar";
import { NavbarBottom } from "./components/NavbarBottom";
import { PaymentForms } from "./components/PaymentForms";
import { EventScheduled } from "./page/EventScheduled";
import { Home } from "./page/Home";
import { MoreInfo } from "./page/MoreInfo";
import { HowToReturnTheDevices } from "./page/moreInfo/HowToReturnTheDevices";
import { HowToUseTheReceiver } from "./page/moreInfo/HowToUseTheReceiver";
import { RequestSupportDuringTheEvent } from "./page/moreInfo/RequestSupportDuringTheEvent";
import { MyProfile } from "./page/MyProfile";
import { QRCodeConfirmation } from "./page/QRCodeConfirmation";
import { RequestDevices } from "./page/RequestDevices";
import { MoreDevices } from "./page/requestDevices/MoreDevices";

function App() {
  return (
    <div className="App">
      <Navbar />

      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/paymentForm" element={<PaymentForms />} />
        <Route exact path="/confirmation" element={<QRCodeConfirmation />} />
        <Route exact path="/request_devices" element={<RequestDevices />} />
        <Route exact path="/more_devices" element={<MoreDevices />} />
        <Route exact path="/more_info" element={<MoreInfo />} />
          {/* <Route index element={<MoreInfo />} /> */}
          <Route
            path="/how_to_return_the_devices"
            element={<HowToReturnTheDevices />}
          />
          <Route
            path="/how_to_use_the_receiver"
            element={<HowToUseTheReceiver />}
          />
          <Route
            path="/request_support_during_event"
            element={<RequestSupportDuringTheEvent />}
          />
        {/* </Route> */}
        <Route exact path="/event_schedule" element={<EventScheduled />} />
        <Route exact path="/my_profile" element={<MyProfile />} />
      </Routes>

      <div className="App-footer">
        <NavbarBottom />
      </div>
    </div>
  );
}

export default App;
