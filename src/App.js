import React from "react";
import { Navigate } from "react-router-dom";
import { Routes, Route } from "react-router";
import { useStytchSession } from "@stytch/stytch-react";
import { Admin } from "./page/admin/Admin";
import { Authenticate } from "./page/Authenticate";
import { Checkout } from "./page/Checkout";
import { ContactInfo } from "./components/contact/ContactInfo";
import { EventScheduled } from "./page/EventScheduled";
import { HowToReturnTheDevices } from "./page/moreInfo/HowToReturnTheDevices";
import { HowToUseTheReceiver } from "./page/moreInfo/HowToUseTheReceiver";
import { LoginPage } from "./page/admin/LoginAdmin";
import { MoreDevices } from "./page/requestDevices/MoreDevices";
import { MoreInfo } from "./page/MoreInfo";
import { MyProfile } from "./page/MyProfile";
import { Navbar } from "./components/ui/Navbar";
import { QRCodeConfirmation } from "./page/QRCodeConfirmation";
import { Receivers } from "./components/admin/Receivers";
import { RegisteredPaymentInfo } from "./components/admin/RegisteredPaymentInfo";
import { RegisteredUser } from "./components/admin/RegisteredUser";
import { RequestDevices } from "./page/RequestDevices";
import { RequestSupportDuringTheEvent } from "./page/moreInfo/RequestSupportDuringTheEvent";
import { useContactInfoStore } from "./hooks/useContactInfoStore";

import "./App.css";

function App() {
  const session = useStytchSession();
  const { token } = useContactInfoStore();
  console.log(token);
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<ContactInfo />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/confirmation" element={<QRCodeConfirmation />} />
        <Route path="/request_devices" element={<RequestDevices />} />
        <Route path="/more_devices" element={<MoreDevices />} />
        <Route path="/more_info" element={<MoreInfo />}></Route>
        <Route
          exact
          path="/more_info/how_to_return_the_devices"
          element={<HowToReturnTheDevices />}
        />
        <Route
          exact
          path="/more_info/how_to_use_the_receiver"
          element={<HowToUseTheReceiver />}
        />
        <Route
          exact
          path="/more_info/request_support_during_event"
          element={<RequestSupportDuringTheEvent />}
        />
        <Route path="/event_schedule" element={<EventScheduled />} />
        <Route path="/my_profile" element={<MyProfile />} />
        <Route path="/authenticate" element={<Authenticate />} />
      </Routes>

      <Routes>
        <Route path="/admin/login" element={<LoginPage />} />
        <Route
          path="/admin/*"
          element={<Navigate to="/admin/login" replace />}
        />
        <Route path="/admin" element={<Admin />}></Route>
        <Route path="/admin/users" element={<RegisteredUser />} />
        <Route path="/admin/payments" element={<RegisteredPaymentInfo />} />
        <Route path="/admin/receivers" element={<Receivers />} />
      </Routes>
    </div>
  );
}

export default App;
