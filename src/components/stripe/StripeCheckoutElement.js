import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { StripeCheckoutForm } from "./StripeCheckForm";
const stripePromise = loadStripe(
  "pk_test_51LkbrKA4UM3TTNMjsa6TvhL78emkZK3YyHWYsE9n95zfrDNFNPcCQAwZz4ZK4XHyODZimzeU7I1PEfK9OcYJLb8N0010TL3oW6"
);

export const StripeCheckoutElement = ({ clientSecret }) => {
  const appearance = {
    theme: "flat",
    labels: 'floating',
    variables: {
      fontFamily: "var(--font-family--open_sans)",
      fontLineHeight: "1.5",
      borderRadius: "5px",
      colorBackground: "#ffffff",
      colorPrimaryText: "#00000",
    },
    rules: {
      ".Block": {
        backgroundColor: "var(--colorBackground)",
        boxShadow: "none",
        padding: "12px",
      },
      ".Input": {
        padding: "12px",
      },
      ".Input:disabled, .Input--invalid:disabled": {
        color: "var(--main-colorsaluminium)",
      },
      ".Tab": {
        padding: "10px 12px 8px 12px",
        border: "none",
      },
      ".Tab:hover": {
        border: "none",
        boxShadow:
          "0px 1px 1px rgba(0, 0, 0, 0.03), 0px 3px 7px rgba(18, 42, 66, 0.04)",
      },
      ".Tab--selected, .Tab--selected:focus, .Tab--selected:hover": {
        border: "var(--black)",
        backgroundColor: "#fff",
        boxShadow:
          "0 0 0 1.5px var(--colorPrimaryText), 0px 1px 1px rgba(0, 0, 0, 0.03), 0px 3px 7px rgba(18, 42, 66, 0.04)",
      },
      ".Label": {
        fontWeight: "500",
      },
    },
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <>
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <StripeCheckoutForm />
        </Elements>
      )}
    </>
  );
};
