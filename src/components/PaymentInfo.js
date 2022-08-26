import React from "react";
import { ConfirmationModal } from "../ui/ConfirmationModal";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { Forms } from "./Forms";


const stripePromise = loadStripe(
  "pk_test_51LOVwRD3lviUp8QG0eobzZIG6nFdoGVVmy7oJnqqIqkle5r1doJnfdLKDd2F2HRWYwhYt554rdNWYdGhu5UtAtiH00wbYftlUi"
); //process.env.STRIPE_PUBLIC_KEY

export const PaymentInfo = () => {


  return (
    <>
      <Elements stripe={stripePromise} >
        <Forms />
      </Elements>

      <ConfirmationModal />
    </>
  );
};
