import { useInterval } from "interval-hooks";
import React from "react";
import { useRef } from "react";
import { useState } from "react";
import { devitrackApi } from "../../../apis/devitrackApi";
import { NotificationBody } from "../../ui/NotificationBody";

export const NotificationDisplay = () => {
  let listOfNotifications = [];

  let getCurrentNotification = async () => {
    const response = await devitrackApi.get("/notification/notifications");
    return (listOfNotifications = response.data.message);
  };
  let checking = false;
  let notificationRef = useRef();

  if (
    notificationRef.current &&
    listOfNotifications.at(-1) !== notificationRef.current
  ) {
    checking = true;
  }

  let useHasNewNotification = () => {
    useInterval(async () => {
      let notification = await getCurrentNotification();
    }, 5_000);

    return checking;
  };

  let hasNewNotification = useHasNewNotification();

  return (
    <>
      {hasNewNotification && (
        <NotificationBody message={`${listOfNotifications.at(-1)}`} />
      )}{" "}
    </>
  );
};
