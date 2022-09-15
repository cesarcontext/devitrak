import React from "react";
import { Routes, Route } from "react-router";
import { Navigate } from "react-router-dom";
import { useStytchSession } from "@stytch/stytch-react";
import { Navbar } from "./components/Navbar";
import { NavbarBottom } from "./components/NavbarBottom";
import { PrivateRoute } from "./layout/PrivateRoute";
import { Authenticate } from "./page/Authenticate";
import { AuthenticatedRoute } from "./page/AuthenticatedRoute";
import { Home } from "./page/Home";
import { HowToReturnTheDevices } from "./page/moreInfo/HowToReturnTheDevices";
import { HowToUseTheReceiver } from "./page/moreInfo/HowToUseTheReceiver";
import { RequestSupportDuringTheEvent } from "./page/moreInfo/RequestSupportDuringTheEvent";
import { MoreDevices } from "./page/requestDevices/MoreDevices";
import { PaymentFormat } from "./page/PaymentFormat";
import { QRCodeConfirmation } from "./page/QRCodeConfirmation";
import { RequestDevices } from "./page/RequestDevices";
import { MoreInfo } from "./page/MoreInfo";
import { EventScheduled } from "./page/EventScheduled";
import { MyProfile } from "./page/MyProfile";

import "./App.css";
import { Checkout } from "./page/Checkout";
import { ContactInfo } from "./components/ContactInfo";

function App() {
  const session = useStytchSession();
  console.log({ session });
  return (
    <div className="App">
      <Navbar />

      <Routes>
        <Route index path="/" element={<ContactInfo />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/confirmation" element={<QRCodeConfirmation />} />
        <Route path="/request_devices" element={<RequestDevices />} />
        <Route path="/more_devices" element={<MoreDevices />} />
        <Route path="/more_info" element={<MoreInfo />} />
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
        <Route path="/event_schedule" element={<EventScheduled />} />
        <Route path="/my_profile" element={<MyProfile />} />
        <Route path="/authenticate" element={<Authenticate />} />
      </Routes>
      <NavbarBottom />
    </div>
  );
}

export default App;


  {/* {session !== null ? (
          <>
            <Route exact path="/" element={<Home />} />
            <Route path="/*" element={<Navigate to="/" replace />} />
          </>
        ) : (
          <>
            <Route index path="/" element={<PaymentFormat />} />
            <Route path="/confirmation" element={<QRCodeConfirmation />} />
            <Route path="/request_devices" element={<RequestDevices />} />
            <Route path="/more_devices" element={<MoreDevices />} />
            <Route path="/more_info" element={<MoreInfo />} />
            <Route path="/how_to_return_the_devices" element={<HowToReturnTheDevices />} />
            <Route path="/how_to_use_the_receiver" element={<HowToUseTheReceiver />} />
            <Route path="/request_support_during_event" element={<RequestSupportDuringTheEvent />} />
            <Route path="/event_schedule" element={<EventScheduled />} />
            <Route path="/my_profile" element={<MyProfile />} />
          </>
        )}

        <Route path="/authenticate" element={<Authenticate />} />
        <Route
          path="/authenticated-route"
          element={
            <PrivateRoute>
              <AuthenticatedRoute />
            </PrivateRoute>
          }
        /> */}