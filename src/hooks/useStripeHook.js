import { devitrackApiStripe } from "../apis/devitrackApi";

export const useStripeHook = () => {
  const saveStripeTransaction = ({ payment_intent, clientSecret, device }) => {
    try {
      const response = devitrackApiStripe
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

  return {
    //* Propiedades

    //* Métodos
    saveStripeTransaction,
  };
};
