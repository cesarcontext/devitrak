import React from "react";

export const userInfoSaved = ({ contact }) => {
  return (
    <>
      <div>{contact.groupName}</div>
      <div>{contact.name}</div>
      <div>{contact.lastName}</div>
      <div>{contact.phone}</div>
      <div>{contact.phoneNumber}</div>
    </>
  );
};
