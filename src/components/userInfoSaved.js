import React from "react";

export const userInfoSaved = ({ user }) => {

  const { groupName, name, lastName, email, phoneNumber } = user
  const _id = new Date().getDate()

  return (
    <div key={ _id }>
      <div>{groupName}</div>
      <div>{name}</div>
      <div>{lastName}</div>
      <div>{email}</div>
      <div>{phoneNumber}</div>
    </div>
  );
};
