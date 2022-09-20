import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { StripeCheckForm } from "./StripeCheckForm";
import { useDeviceCount } from "../hooks/useDeviceCountStore";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is a public sample test API key.
// Don’t submit any personally identifiable information in requests made with this key.
// Sign in to see your own test API key embedded in code samples.
const stripePromise = loadStripe(process.env.REACT_APP_URL);

export const PaymentInfo = () => {
  const [clientSecret, setClientSecret] = useState("");
  const { device } = useDeviceCount()

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch("http://localhost:34001/api/stripe/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: `${ device *200}` }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, [device]);

  const appearance = {
    theme: 'stripe',
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div>
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <StripeCheckForm/>
        </Elements>
      )}
    </div>
  );
}