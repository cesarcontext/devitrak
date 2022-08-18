import React from "react";
import { Routes, Route } from "react-router";
import "./App.css";
import { Navbar } from "./components/Navbar";
import { NavbarFixed } from "./components/NavbarFixed";
import { EventSchedule } from "./page/EventSchedule";
import { Home } from "./page/Home";
import { MoreInfo } from "./page/MoreInfo";
import { HowToReturnTheDevices } from "./page/moreInfo/HowToReturnTheDevices";
import { HowToUseTheReceiver } from "./page/moreInfo/HowToUseTheReceiver";
import { RequestSupportDuringTheEvent } from "./page/moreInfo/RequestSupportDuringTheEvent";
import { MyProfile } from "./page/MyProfile";
import { QRCodeConfirmation } from "./page/QRCodeConfirmation";
import { RequestDevices } from "./page/RequestDevices";

function App() {
  return (
    <div className="App">
      <Navbar />

      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/confirmation" element={<QRCodeConfirmation />} />
        <Route exact path="/request_devices" element={<RequestDevices />} />
        <Route exact path="more_info" element={<MoreInfo />} />
        <Route
          exact
          path="/how_to_use_the_receiver"
          element={<HowToReturnTheDevices />}
        />
        <Route
          exact
          path="/how_to_return_the_devices"
          element={<HowToUseTheReceiver />}
        />
        <Route
          exact
          path="/request_support_during_event"
          element={<RequestSupportDuringTheEvent />}
        />
        <Route exact path="/event_schedule" element={<EventSchedule />} />
        <Route exact path="/my_profile" element={<MyProfile />} />
      </Routes>
      <NavbarFixed />
    </div>
  );
}

export default App;
