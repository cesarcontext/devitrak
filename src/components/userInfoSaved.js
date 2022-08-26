import React from "react";

export const userInfoSaved = ({ user }) => {

  const {_id, groupName, name, lastName, email, phoneNumber,cardName, cardNumber, mm, yy, cvv, zip, country} = user

  return (
    <div>
      <div>{groupName}</div>
      <div>{name}</div>
      <div>{lastName}</div>
      <div>{email}</div>
    </div>
  );
};
