import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { StripeCheckoutForm } from "./StripeCheckForm";
import { useDeviceCount } from "../../hooks/useDeviceCountStore";
import { devitrackApi, devitrackApiStripe } from "../../apis/devitrackApi";
const stripePromise = loadStripe(
  "pk_test_51LkbrKA4UM3TTNMjsa6TvhL78emkZK3YyHWYsE9n95zfrDNFNPcCQAwZz4ZK4XHyODZimzeU7I1PEfK9OcYJLb8N0010TL3oW6"
);
// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.

export const StripeCheckoutElement = () => {
  const { device } = useDeviceCount();
  const token = localStorage.getItem("token");
  const [clientSecret, setClientSecret] = useState("");
  const [paymentIntentId, setPaymentIntentId] = useState("");
  const [data, setData] = useState(null);
  const [first, setFirst] = useState(false);

  useEffect(() => {
    // // Create PaymentIntent as soon as the page loads
    if (
      // first
      !token ||
      token.length > 2
    ) {
      const { data } = devitrackApi
        .post("/stripe/create-payment-intent", {
          device: device,
        })
        .then((data) => {
          console.log("data effect", { data });
          setData(data);
          setClientSecret(data.data.clientSecret);
          setPaymentIntentId(data.data.payment_intent_id);
        });
    }
  }, []);
  console.log({ token });
  console.log("data log", data);

  useEffect(() => {
    if (token.length > 2) {
      const { data } = devitrackApiStripe.post(
        `/payment-intent/${paymentIntentId}`,
        {
          device,
          paymentIntentId,
        }
      );
    }
  }, [device]);

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
