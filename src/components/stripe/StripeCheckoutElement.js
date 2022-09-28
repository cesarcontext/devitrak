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
    theme: "flat",
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div>
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <StripeCheckoutForm />
        </Elements>
      )}
    </div>
  );
};
