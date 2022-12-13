import { useStytch } from "@stytch/stytch-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { devitrackApiStripe, devitrackApi } from "../apis/devitrackApi";
import { rightDoneMessage } from "../helper/swalFireMessage";
import {
  onAddCustomer,
  onAddNewPaymentIntent,
} from "../store/slices/stripeSlice";
import { blockLinks } from "../store/slices/uiSlice";

export const useStripeHook = () => {
  const { paymentIntent } = useSelector((state) => state.stripe);
  const dispatch = useDispatch();
  const [data, setData] = useState(null);
  const [clientSecret, setClientSecret] = useState(null);
  const [paymentIntentId, setPaymentIntentId] = useState(null);
  const [visibleButton, setVisibleButton] = useState("content");
  const [listAllPaymentIntent, setListAllPaymentIntent] = useState(null);
  const client = useStytch();

  const stripeCustomer = async ({ name, lastName, email, phoneNumber }) => {
    const fullName = name + " " + lastName;
    try {
      const response = await devitrackApi.post("/stripe/customer", {
        name: fullName,
        email,
        phone: phoneNumber,
      });
      const data = await response.data;
      if (data) {
        dispatch(onAddCustomer(data));
        dispatch(blockLinks("none"))
        client.magicLinks.email.loginOrCreate(email);
        rightDoneMessage(`An email has been sent to ${email}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const startStripePaymentIntent = async ({ device, stripeId }) => {
    try {
      await devitrackApi
        .post("/stripe/create-payment-intent", {
          device: device,
          customerId: stripeId,
        })
        .then((data) => {
          console.log("🚀 ~ file: useStripeHook.js:40 ~ .then ~ data", data);
          setData(data);
          setClientSecret(data.data.clientSecret);
          setVisibleButton("none");
          setPaymentIntentId(data.data.paymentIntent);

          if (data) {
            dispatch(onAddNewPaymentIntent(data));
          } else {
            //**return state as inital state in redux to avoid duplicate info from last user */
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  const saveStripeTransaction = async ({
    payment_intent,
    clientSecret,
    device,
  }) => {
    try {
      await devitrackApiStripe
        .post("/stripe-transaction", {
          paymentIntent: payment_intent,
          clientSecret,
          device,
        })
        .then((response) => response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const listAllPaymentIntentFunction = async () => {
    const displayData = new URLSearchParams(window.location.search).get(
      "device-database"
    );
    if (displayData) {
      try {
        await devitrackApi
          .get("/stripe/payment-intents")
          .then((response) => response.data)
          .then((data) => data.paymentIntents)
          .then((paymentIntents) =>
            setListAllPaymentIntent(paymentIntents.data)
          );
      } catch (error) {
        console.log(error);
      }
    }
  };

  return {
    //* Propiedades
    data,
    paymentIntentId,
    paymentIntent,
    clientSecret,
    visibleButton,
    listAllPaymentIntent,

    //* Métodos
    stripeCustomer,
    startStripePaymentIntent,
    saveStripeTransaction,
    listAllPaymentIntentFunction,
  };
};
