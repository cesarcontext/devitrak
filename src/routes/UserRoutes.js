import React,{ useState } from "react";
import { Navigate } from "react-router-dom";
import { Routes, Route } from "react-router";
import { useSelector } from "react-redux";
import moment from "moment/moment";
import { useStytch, useStytchSession } from "@stytch/stytch-react";
import { useInterval } from "interval-hooks";

import { Authenticate } from "../page/Authenticate";
import { Checkout } from "../page/Checkout";
import { DeclineTerms } from "../page/DeclineTerms";
import { EventScheduled } from "../page/EventScheduled";
import { Home } from "../page/Home";
import { HowToReturnTheDevices } from "../page/moreInfo/HowToReturnTheDevices";
import { HowToUseTheReceiver } from "../page/moreInfo/HowToUseTheReceiver";
import { MoreInfo } from "../page/MoreInfo";
import { MyProfile } from "../page/MyProfile";
import { QRCodeConfirmation } from "../page/QRCodeConfirmation";
import { RequestDevices } from "../page/RequestDevices";
import { RequestSupportDuringTheEvent } from "../page/moreInfo/RequestSupportDuringTheEvent";
import { StripeCheckoutElement } from "../components/stripe/StripeCheckoutElement";
// import { NotificationDisplay } from "../components/admin/Notification/NotificationDisplay";

export const UserRoutes = () => {
  const { response } = useSelector((state) => state.privacyPolicyUserResponse);
  const [dateToCheck, setDateToCheck] = useState("");
  const session = useStytchSession();
  const client = useStytch();
  useInterval(() => {
    setDateToCheck(new Date().toISOString());
  }, 1_00);

  if (session !== null) {
    const a = moment(`${session.expires_at}`);
    const b = moment(`${dateToCheck}`);
    if (a < b) {
      client.session.revoke();
      window.location.replace("https://devitrackapp.itmastersltd.com/")
    }
  }
  return (
    <div>
      {/* {Notification.permission === "granted" && <NotificationDisplay />} */}
      <Routes>
        <Route path="/" element={<Home />} />
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
            <Route path="/declineTerms" element={<DeclineTerms />} />
            <Route path="/checkout" element={<Navigate to="/declineTerms" />} />
            <Route
              path="/confirmation"
              element={<Navigate to="/declineTerms" />}
            />
            <Route
              path="/request_devices"
              element={<Navigate to="/declineTerms" />}
            />
            <Route
              path="/more_info"
              element={<Navigate to="/declineTerms" />}
            />
            <Route
              path="/more_info/how_to_return_the_devices"
              element={<Navigate to="/declineTerms" />}
            />
            <Route
              path="/more_info/how_to_use_the_receiver"
              element={<Navigate to="/declineTerms" />}
            />
            <Route
              path="/more_info/request_support_during_event"
              element={<Navigate to="/declineTerms" />}
            />
            <Route
              path="/event_schedule"
              element={<Navigate to="/declineTerms" />}
            />
            <Route
              path="/my_profile"
              element={<Navigate to="/declineTerms" />}
            />
          </>
        )}
      </Routes>
    </div>
  );
};
