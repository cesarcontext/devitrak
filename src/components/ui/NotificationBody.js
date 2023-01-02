import React from 'react';

export const NotificationBody = ({ message }) => {
  const notification = new Notification(`${message.title}`,{
  body: message.body,
  })
  return (
    <div className="notification">
      {notification}
    </div>
  );
};

