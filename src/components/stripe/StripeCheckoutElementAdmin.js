import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { StripeCheckoutFormAdmin } from "./StripeCheckoutFormAdmin";
const stripePromise = loadStripe(`${import.meta.env.VITE_APP_STRIPE_PUBLIC_KEY}`);

/**
 * @description StripeChecoutElementAdmin - Elements display after verify a valid clientSecret
 * @param {String} clientSecret -
 * @param {String} total - amount imported and passed to checkout element to be displayed in submit button
 * @returns {HTMLBodyElement}
 */
export const StripeCheckoutElementAdmin = ({ clientSecret, total }) => {

  /**
 * @description style and rules for check out element where credit card info will be collected
 * @type {Object} 
 * @property {String} theme - theme of the checkout element
 * @property {String} labels - attribute for lables in the inputs of the checkout element
 * @property {Object} variables - variables of css for teh entires elements
 * @property {Object} rules - variables of css applied based on criterios
 */
  const appearance = {
    theme: "flat",
    labels: "floating",
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
          <StripeCheckoutFormAdmin total={total} />
        </Elements>
      )}
    </>
  );
};
