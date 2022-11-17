import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { onAddNewPaymentIntent } from "../../store/slices/stripeSlice";
import "./checkoutStyles.css";

export const StripeCheckoutForm = () => {
  const dispatch = useDispatch();
  const stripe = useStripe();
  const elements = useElements();
  const { customer } = useSelector((state) => state.stripe);
  console.log(
    "🚀 ~ file: StripeCheckForm.js ~ line 16 ~ StripeCheckoutForm ~ customer",
    customer
  );
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
          setMessage("Something went wrong.");
          break;
      }
    });
  }, [stripe]);
  const myUrl = window.location.origin
  console.log("🚀 ~ file: StripeCheckForm.js ~ line 54 ~ StripeCheckoutForm ~ myUrl", myUrl)
  const iFrameStyle = {
    base: {
      color: "#fff",
      fontSize: "16px",
      iconColor: "#fff",
      "::placeholder": {
        color: "#87bbfd",
      },
    },
    invalid: {
      iconColor: "#FFC7EE",
      color: "#FFC7EE",
    },
    complete: {
      iconColor: "#cbf4c9",
    },
  };

  const paymentElementStyle = {
    // billing_details: billingDetails,
    style: iFrameStyle,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);

    {
      /*need to pass customer id generated when customer submit the info before to submit credit card info */
    }
    const { error, response } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: myUrl+"/confirmation",
      },
      receipt_email: customer.email,
      billing_details: {
        name: customer.fullname,
        email: customer.email,
        phone: customer.phone,
      },
    });
    if (response) {
      dispatch(onAddNewPaymentIntent(response));
    }
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
    <div id="stripe-container" className="container-stripe">
      <div className="row justify-content-center align-items-center">
        <form id="payment-form" onSubmit={handleSubmit}>
          <PaymentElement options={paymentElementStyle} id="payment-element" />
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
      </div>
    </div>
  );
};
