import React from "react";

export const userInfoSaved = ({ paymentState }) => {

  const {cardName, cardNumber, mm, yy, cvv, zip, country} = paymentState

  return (
    <div>
      <div>{cardName}</div>
      <div>{cardNumber}</div>
      <div>{cvv}</div>
      <div>{mm}</div>
      <div>{yy}</div>
      <div>{zip}</div>
      <div>{country}</div>
    </div>
  );
};