import React from "react";

export const userInfoSaved = ({ user }) => {

  const { groupName, name, lastName, email, phoneNumber } = user

  return (
    <div>
      <div>{groupName}</div>
      <div>{name}</div>
      <div>{lastName}</div>
      <div>{email}</div>
      <div>{phoneNumber}</div>
    </div>
  );
};
