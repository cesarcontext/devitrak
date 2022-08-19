import React from "react";
import { CardElement } from "@stripe/react-stripe-js";

import "./checkoutForm.css";

export const CheckoutForm = () => {
  
  const cardElementOptions = {
    style: {
      base: {
        fontSize: "25px",
        color: "#000",
        "::placeholder": {
          color: "#251447",
        },
        width: "100%",
        display: "flex",
        flexDirection: "column",
        border: "solid 1px #212529",
      },
      // invalid: {
      //   color: "#FFC7EE",
      //   iconColor: "#212529"
      // },
      // complete: {
      //   color: "green"
      // },
    },
  };

  return (
    <CardElement options={cardElementOptions} /> //
  );
};
