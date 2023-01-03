import { useInterval } from "interval-hooks";
import React from "react";
import { useRef } from "react";
import { useState } from "react";
import { devitrackApi } from "../../../apis/devitrackApi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { NotificationBody } from "../../ui/NotificationBody";

export const NotificationDisplay = () => {
  const [listOfNotifications, setListOfNotifications] = useState([]);
  let checking = false;
  console.log(
    "🚀 ~ file: NotificationDisplay.js:14 ~ NotificationDisplay ~ checking",
    checking
  );
  let notificationRef = useRef();
  console.log(
    "🚀 ~ file: NotificationDisplay.js:15 ~ NotificationDisplay ~ notificationRef",
    notificationRef
  );

  if (
    notificationRef.current &&
    listOfNotifications.at(-1) === notificationRef.current
  ) {
    checking = false;
  }

  let useHasNewNotification = () => {
    useInterval(async () => {
      const response = await devitrackApi.get("/notification/notifications");
      if (response) return setListOfNotifications(response.data.message);
    }, 5_000);

    if (listOfNotifications.at(-1) !== notificationRef.current) {
      checking = true;
      notificationRef.current = listOfNotifications.at(-1);
    }
    return checking;
  };

  let hasNewNotification = useHasNewNotification();
  console.log(
    "🚀 ~ file: NotificationDisplay.js:45 ~ NotificationDisplay ~ hasNewNotification",
    hasNewNotification
  );
  if (listOfNotifications !== []) {
    const notification = new Notification(
      `${listOfNotifications.at(-1)?.title}`,
      {
        tag: setListOfNotifications.at(-1).body,
      }
    );
  }

  return <>{hasNewNotification && notification} </>;
};
