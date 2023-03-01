import React from "react";
import { Routes, Route } from "react-router";
import { Authenticate } from "../page/user/Authenticate";
import { Checkout } from "../page/user/Checkout";
import { EventScheduled } from "../page/user/EventScheduled";
import { Home } from "../page/user/Home";
import { HowToReturnTheDevices } from "../page/user/moreInfo/HowToReturnTheDevices";
import { HowToUseTheReceiver } from "../page/user/moreInfo/HowToUseTheReceiver";
import { MoreInfo } from "../page/user/MoreInfo";
import { MyProfile } from "../page/user/MyProfile";
import { QRCodeConfirmation } from "../page/user/QRCodeConfirmation";
import { RequestDevices } from "../page/user/RequestDevices";
import { RequestSupportDuringTheEvent } from "../page/user/moreInfo/RequestSupportDuringTheEvent";
import { StripeCheckoutElement } from "../components/stripe/StripeCheckoutElement";

export const UserRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
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
      </Routes>
    </div>
  );
};
