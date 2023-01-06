import React, { useState, useEffect } from "react";
import "../../../style/component/admin/Notification/TriggerNotification.css";
import { NotificationDisplay } from "./NotificationDisplay";
import { SendNotification } from "./SendNotification";

export const TriggerNotification = () => {
  const [displayNotification, setDisplayNotification] = useState(false);

  const handleNotification = async () => {
    setDisplayNotification(!displayNotification);
  };
  return (
    <div className="container-icon-notification">
      {" "}
      <i
        onClick={handleNotification}
        className="bi bi-info-circle trigger-notification"
      />
      <div className="d-none">
        <NotificationDisplay />
        <SendNotification
          displayNotification={displayNotification}
          setDisplayNotification={setDisplayNotification}
        />
      </div>
    </div>
  );
};
