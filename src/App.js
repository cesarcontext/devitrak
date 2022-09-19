import React from "react";
import { Navigate } from "react-router-dom";
import { Routes, Route } from "react-router";
import { useStytchSession } from "@stytch/stytch-react";
import { Navbar } from "./components/Navbar";
import { NavbarBottom } from "./components/NavbarBottom";
import { Authenticate } from "./page/Authenticate";
import { HowToReturnTheDevices } from "./page/moreInfo/HowToReturnTheDevices";
import { HowToUseTheReceiver } from "./page/moreInfo/HowToUseTheReceiver";
import { RequestSupportDuringTheEvent } from "./page/moreInfo/RequestSupportDuringTheEvent";
import { MoreDevices } from "./page/requestDevices/MoreDevices";
import { QRCodeConfirmation } from "./page/QRCodeConfirmation";
import { RequestDevices } from "./page/RequestDevices";
import { MoreInfo } from "./page/MoreInfo";
import { EventScheduled } from "./page/EventScheduled";
import { MyProfile } from "./page/MyProfile";

import "./App.css";
import { Checkout } from "./page/Checkout";
import { ContactInfo } from "./components/ContactInfo";
import { useContactInfoStore } from "./hooks/useContactInfoStore";
import { Admin } from "./page/admin/Admin";
import { LoginPage } from "./page/admin/LoginAdmin";

function App() {
  const session = useStytchSession();
  const { userParseStored } = useContactInfoStore();
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route exact path="/checkout" element={<Checkout />} />
        <Route exact path="/" element={<ContactInfo />} />
        <Route exact path="/confirmation" element={<QRCodeConfirmation />} />
        <Route exact path="/request_devices" element={<RequestDevices />} />
        <Route exact path="/more_devices" element={<MoreDevices />} />
        <Route exact path="/more_info" element={<MoreInfo />} />
        <Route
          exact path="/how_to_return_the_devices"
          element={<HowToReturnTheDevices />}
        />
        <Route
          exact path="/how_to_use_the_receiver"
          element={<HowToUseTheReceiver />}
        />
        <Route
          exact path="/request_support_during_event"
          element={<RequestSupportDuringTheEvent />}
        />
        <Route exact path="/event_schedule" element={<EventScheduled />} />
        <Route exact path="/my_profile" element={<MyProfile />} />
        <Route exact path="/authenticate" element={<Authenticate />} />
      </Routes>

      {!session && (
        <>
          <Routes>
            <Route exact path="/admin" element={<Admin />} />
            <Route exact path="/admin/login" element={<LoginPage />} />
          </Routes>
        </>
      )}
      <NavbarBottom />
    </div>
  );
}

export default App;
