import React from "react";
import { Routes, Route } from "react-router";
import { MoreInfo } from "./MoreInfo";
import { HowToReturnTheDevices } from "./moreInfo/HowToReturnTheDevices";
import { HowToUseTheReceiver } from "./moreInfo/HowToUseTheReceiver";
import { RequestSupportDuringTheEvent } from "./moreInfo/RequestSupportDuringTheEvent";
import { MyProfile } from "./MyProfile";
import { PaymentFormat } from "./PaymentFormat";
import { QRCodeConfirmation } from "./QRCodeConfirmation";
import { RequestDevices } from "./RequestDevices";
import { MoreDevices } from "./requestDevices/MoreDevices";
import { EventScheduled } from "./EventScheduled";

export const AuthenticatedRoute = () => {
  return (
    <Routes>
      <Route index path="checkout" element={<PaymentFormat />} />
      <Route path="confirmation" element={<QRCodeConfirmation />} />
      <Route path="request_devices" element={<RequestDevices />} />
      <Route path="more_devices" element={<MoreDevices />} />
      <Route path="more_info" element={<MoreInfo />} />
      {/* <Route index element={<MoreInfo />} /> */}
      <Route
        path="how_to_return_the_devices"
        element={<HowToReturnTheDevices />}
      />
      <Route
        path="how_to_use_the_receiver"
        element={<HowToUseTheReceiver />}
      />
      <Route
        path="request_support_during_event"
        element={<RequestSupportDuringTheEvent />}
      />
      {/* </Route> */}
      <Route path="event_schedule" element={<EventScheduled />} />
      <Route path="my_profile" element={<MyProfile />} />
    </Routes>
  );
};
