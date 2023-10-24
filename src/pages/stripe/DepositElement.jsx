import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Checkout from "./Checkout";
import { useSelector } from "react-redux";

/**
 * @description StripePromise - promise to load stripe
 * @component
 * @type {Promise}
 */
const stripePromise = loadStripe(`${process.env.REACT_APP_STRIPE_PUBLIC_KEY}`);

const DepositElement = () => {
  const { clientSecret } = useSelector((state) => state.stripe);
  // const appearance = {
  //   theme: "flat",
  //   labels: "floating",
  //   variables: {
  //     fontFamily: "var(--font-family--open_sans)",
  //     fontLineHeight: "1.5",
  //     borderRadius: "5px",
  //     colorBackground: "#ffffff",
  //     colorPrimaryText: "#00000",
  //   },
  //   rules: {
  //     ".Block": {
  //       backgroundColor: "var(--colorBackground)",
  //       boxShadow: "none",
  //       padding: "12px",
  //     },
  //     ".Input": {
  //       padding: "12px",
  //     },
  //     ".Input:disabled, .Input--invalid:disabled": {
  //       color: "var(--main-colorsaluminium)",
  //     },
  //     ".Tab": {
  //       padding: "10px 12px 8px 12px",
  //       border: "none",
  //     },
  //     ".Tab:hover": {
  //       border: "none",
  //       boxShadow:
  //         "0px 1px 1px rgba(0, 0, 0, 0.03), 0px 3px 7px rgba(18, 42, 66, 0.04)",
  //     },
  //     ".Tab--selected, .Tab--selected:focus, .Tab--selected:hover": {
  //       border: "var(--black)",
  //       backgroundColor: "#fff",
  //       boxShadow:
  //         "0 0 0 1.5px var(--colorPrimaryText), 0px 1px 1px rgba(0, 0, 0, 0.03), 0px 3px 7px rgba(18, 42, 66, 0.04)",
  //     },
  //     ".Label": {
  //       fontWeight: "500",
  //     },
  //   },
  // };
  /**
   * @description options - object to pass clientSecret and appearance
   * @type {Object}
   */
  const options = {
    clientSecret: clientSecret.clientSecret,
    appearance: {
      theme: "flat",
    },
    layout: {
      type: "tabs",
      defaultCollapsed: false,
    },
  };

  return (
    <>
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <Checkout />
        </Elements>
      )}
    </>
  );
};

export default DepositElement;
