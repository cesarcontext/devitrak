import { useState } from "react";
import { devitrackApi } from "../apis/devitrackApi";
import { useDeviceCount } from "./useDeviceCountStore";

export const useStripeHook = () => {
  const [clientSecret, setClientSecret] = useState("");
  const { device } = useDeviceCount();

  const PaymentIntent = async () => {

    const amount = await device * 200 * 100
    try {
      const { data } = await devitrackApi.post("/stripe/create-payment-intent", {amount});
      console.log({ data })
      setClientSecret(data.client_secret)

    } catch (error) {
      console.log(error);
    }
  };
  

  return {
    //* Propiedades
    clientSecret,
    //* Métodos
    PaymentIntent,
  };
};
