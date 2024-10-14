import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Checkout from "./Checkout";
import { useSelector } from "react-redux";

/**
 * @description StripePromise - promise to load stripe
 * @component
 * @type {Promise}
 */
const stripePromise = loadStripe(`${import.meta.env.VITE_APP_STRIPE_PUBLIC_KEY}`);

const DepositElement = () => {
  const { clientSecret } = useSelector((state) => state.stripe);
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
