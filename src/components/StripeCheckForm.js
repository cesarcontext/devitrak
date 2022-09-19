import React, { useEffect, useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useDeviceCount } from "../hooks/useDeviceCountStore";

export const StripeCheckForm =() => {
    const {
        amountToDeposit,
        device,
        handleDecreaseDevice,
        handleIncreaseDevice,
        handleResetDevice,
      } = useDeviceCount();
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case "succeeded":
          setMessage("Payment succeeded!");
          break;
        case "processing":
          setMessage("Your payment is processing.");
          break;
        case "requires_payment_method":
          setMessage("Your payment was not successful, please try again.");
          break;
        default:
          setMessage("");
          break;
      }
    });
  }, [stripe]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: "http://localhost:3000/confirmation",
      },
    });

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message);
    } else {
      setMessage("An unexpected error occurred.");
    }

    setIsLoading(false);
  };

  return (
    <>
            <section className="gradient-custom">
          <div className="container">
            <div className="row justify-content-center align-items-center">
              <div className="col-12 col-lg-9 col-xl-7">
                <div className="row">
                  <div className="col-md-12 mt-4 mb-2">
                    <div className="form-outline">
                      <div
                        className="card shadow-2-strong card-registration"
                        style={{ bordeRadius: "15px" }}
                      >
                        <div
                          style={{
                            display: "flex",
                            padding: "15px",
                            justifyContent: "space-evenly",
                          }}
                        >
                          <h5 style={{ padding: "15px" }}>
                            HOW MANY RECEIVERS DO YOU NEED?
                          </h5>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              margin: "0  auto",
                            }}
                          >
                            <button onClick={handleDecreaseDevice}>-</button>
                            <div>
                              <strong>{device}</strong>
                            </div>
                            <button onClick={handleIncreaseDevice}>+</button>
                            <button onClick={handleResetDevice}>Reset</button>
                          </div>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-evenly",
                              alignItems: "center",
                            }}
                          >
                            <div className="col-4"></div>
                            <h5>DEPOSIT TOTAL:</h5>
                            <h3>
                              <strong>${amountToDeposit}</strong>
                            </h3>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      <form id="payment-form" onSubmit={handleSubmit}>
        <PaymentElement id="payment-element" />
        <button disabled={isLoading || !stripe || !elements} id="submit">
          <span id="button-text">
            {isLoading ? (
              <div className="spinner" id="spinner"></div>
            ) : (
              "Pay now"
            )}
          </span>
        </button>
        {/* Show any error or success messages */}
        {message && <div id="payment-message">{message}</div>}
      </form>
    </>
  );
}
