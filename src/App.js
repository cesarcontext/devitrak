import React from "react";
import { Navigate } from "react-router-dom";
import { Routes, Route } from "react-router";
import { Admin } from "./page/admin/Admin";
import { Authenticate } from "./page/Authenticate";
import { Checkout } from "./page/Checkout";
import { EventScheduled } from "./page/EventScheduled";
import { HowToReturnTheDevices } from "./page/moreInfo/HowToReturnTheDevices";
import { HowToUseTheReceiver } from "./page/moreInfo/HowToUseTheReceiver";
import { LoginPage } from "./page/admin/LoginAdmin";
import { MoreInfo } from "./page/MoreInfo";
import { MyProfile } from "./page/MyProfile";
import { QRCodeConfirmation } from "./page/QRCodeConfirmation";
import { RequestDevices } from "./page/RequestDevices";
import { RequestSupportDuringTheEvent } from "./page/moreInfo/RequestSupportDuringTheEvent";
import { StripeCheckoutElement } from "./components/stripe/StripeCheckoutElement";
import { Home } from "./page/Home";
import { DeviceDatabase } from "./page/admin/DeviceDatabase";
import { Articles } from "./page/admin/Articles";
import { Settings } from "./page/admin/Settings";
import { Profile } from "./page/admin/Profile";
import { Attendees } from "./page/admin/Attendees";
import { ReceiversDetailsAssignation } from "./components/admin/Attendees/ReceiversDetailsAssignation";
import { useSelector } from "react-redux";
import { ArticleContentCreation } from "./components/admin/Articles/ArticleContentCreation";
import "./App.css";
import { DeclineTerms } from "./page/DeclineTerms";

function App() {
  const { status } = useSelector((state) => state.admin);
  const { response } = useSelector((state) => state.privacyPolicyUserResponse);
  const adminToken = localStorage.getItem("admin-token");

  return (
    <div className="App">
      <Routes>
        {response !== false ? (
          <>
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/confirmation" element={<QRCodeConfirmation />} />
            <Route path="/request_devices" element={<RequestDevices />} />
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
            <Route path="/stripe" element={<StripeCheckoutElement />} />
            <Route path="/authenticate" element={<Authenticate />} />
          </>
        ) : (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/declineTerms" element={<DeclineTerms />} />
            <Route path="/checkout" element={<Navigate to="/declineTerms" />} />
            <Route path="/confirmation" element={<Navigate to="/declineTerms" />} />
            <Route path="/request_devices" element={<Navigate to="/declineTerms" />} />
            <Route path="/more_info" element={<Navigate to="/declineTerms" />} />
            <Route path="/more_info/how_to_return_the_devices" element={<Navigate to="/declineTerms" />} />
            <Route path="/more_info/how_to_use_the_receiver" element={<Navigate to="/declineTerms" />} />
            <Route path="/more_info/request_support_during_event" element={<Navigate to="/declineTerms" />} />
            <Route path="/event_schedule" element={<Navigate to="/declineTerms" />} />
            <Route path="/my_profile" element={<Navigate to="/declineTerms" />} />
          </>
        )}
      </Routes>

      <Routes>
        {status === "authenticated" && adminToken ? (
          <>
            <Route path="/admin" element={<Admin />}></Route>
            <Route path="/admin/device-database" element={<DeviceDatabase />} />
            <Route path="/admin/articles" element={<Articles />} />
            <Route path="/admin/settings" element={<Settings />} />
            <Route path="/admin/attendees" element={<Attendees />} />
            <Route
              path="/admin/attendees/receiver_assignation"
              element={<ReceiversDetailsAssignation />}
            />
            <Route
              path="/admin/create-article"
              element={<ArticleContentCreation />}
            />
            <Route path="/admin/profile" element={<Profile />} />
            <Route
              path="/admin/*"
              element={<Navigate to="/admin/" replace />}
            />
          </>
        ) : (
          <>
            <Route path="/admin/login" element={<LoginPage />} />
            <Route
              path="/admin/*"
              element={<Navigate to="/admin/login" replace />}
            />
          </>
        )}
      </Routes>
    </div>
  );
}

export default App;
