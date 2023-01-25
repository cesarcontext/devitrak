import React from "react";
import { Routes, Route } from "react-router";
import { Authenticate } from "../page/Authenticate";
import { Checkout } from "../page/Checkout";
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
