import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { devitrackApiStripe, devitrackApi } from "../apis/devitrackApi";
import { onAddNewPaymentIntent } from "../store/slices/stripeSlice";
import { useDeviceCount } from "./useDeviceCountStore";

export const useStripeHook = () => {
  const { paymentIntent } = useSelector((state) => state.stripe);
  const dispatch = useDispatch();
  const { device } = useDeviceCount();
  const [data, setData] = useState(null);
  const [clientSecret, setClientSecret] = useState(null);
  const [visibleButton, setVisibleButton] = useState("content")

  const startStripePaymentIntent = async (request, response) => {
    try {
      const response = await devitrackApi
        .post("/stripe/create-payment-intent", {
          device: device,
        })
        .then((data) => {
          console.log("data effect", { data });
          setData(data);
          setClientSecret(data.data.clientSecret);
          setVisibleButton("none")
          if (data) {
            dispatch(onAddNewPaymentIntent(data));
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
      const response = await devitrackApiStripe
        .post("/stripe-transaction", {
          paymentIntent: payment_intent,
          clientSecret,
          device,
        })
        .then((response) => response.data)
        .then((data) => console.log({ data }));

      console.log({ response });
    } catch (error) {
      console.log(error);
    }
  };

  const listAllPaymentIntent = async () => {
    try {
      const { data } = await devitrackApi.get("/stripe/payment_intents")

      console.log('data received', data )
    } catch (error) {
      console.log( error )
    }
  };
  console.log("payment intent state", paymentIntent);

  return {
    //* Propiedades
    paymentIntent,
    clientSecret,
    visibleButton,

    //* Métodos
    startStripePaymentIntent,
    saveStripeTransaction,
    listAllPaymentIntent,
  };
};
