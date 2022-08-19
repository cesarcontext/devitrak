import React from "react";
import { loadStripe } from "@stripe/stripe-js"; //load Stripe platform
import {
  CardElement,
  Elements,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js"; //library to wrap others elements
import './checkoutForm.css'
import { CheckoutForm } from "./CheckoutForm";
// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is a public sample test API key.
// Don’t submit any personally identifiable information in requests made with this key.
// Sign in to see your own test API key embedded in code samples.
const stripePromise = loadStripe(
  "pk_test_51LOVwRD3lviUp8QG0eobzZIG6nFdoGVVmy7oJnqqIqkle5r1doJnfdLKDd2F2HRWYwhYt554rdNWYdGhu5UtAtiH00wbYftlUi"
);

export const ElementStripe = () => {
  const appearance = {
    theme: "stripe",
  };
  const options = {
    // clientSecret,
    appearance,
  };


  return (
    <div>
      <Elements options={options} stripe={stripePromise}>
        <CheckoutForm />
      </Elements>
    </div>
  );
};
