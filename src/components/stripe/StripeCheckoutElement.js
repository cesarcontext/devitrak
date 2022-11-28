import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { StripeCheckoutForm } from "./StripeCheckForm";
const stripePromise = loadStripe(
  "pk_test_51LkbrKA4UM3TTNMjsa6TvhL78emkZK3YyHWYsE9n95zfrDNFNPcCQAwZz4ZK4XHyODZimzeU7I1PEfK9OcYJLb8N0010TL3oW6"
);
// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.

export const StripeCheckoutElement = ({ clientSecret }) => {
  const appearance = {
    theme: "none",
    variables: {
      fontFamily: "var(--font-family--open_sans)",
      fontWeightNormal: "500",
      borderRadius: "5px",
      colorBackground: "#FFFFFF",
      colorPrimary: "#8E5572",
      colorPrimaryText: '#000000',
      colorText: '#000000',
      colorTextSecondary: '#808080',
      colorTextPlaceholder: "#CCE0D9",
      colorLogo: "#E55934",
    },
    rules: {
      ".Block": {
        backgroundColor: "var(--colorBackground)",
      },
      ".Input": {
        fontSize: "30px",
        border: "1px solid #D2D6DC",
      },
      ".Input::placeholder": {
        fontSize: "20px",
        color: "var(--main-colorsfading-horizon)",
      },
      ".Label": {
        color: "transparent",
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
