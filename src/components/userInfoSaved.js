import React from "react";

export const userInfoSaved = ({ user }) => {

  const {groupName, name, lastName, email, phoneNumber,cardName, cardNumber, mm, yy, cvv, zip, country} = user

  return (
    <>
      <div>{groupName}</div>
      <div>{name}</div>
      <div>{lastName}</div>
      <div>{email}</div>
      <div>{phoneNumber}</div>
      <div>{cardName}</div>
      <div>{cardNumber}</div>
      <div>{cvv}</div>
      <div>{mm}</div>
      <div>{yy}</div>
      <div>{zip}</div>
      <div>{country}</div>
    </>
  );
};
