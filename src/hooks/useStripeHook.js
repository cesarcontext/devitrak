import { devitrackApi } from "../apis/devitrackApi";
import { useDeviceCount } from "./useDeviceCountStore";

export const useStripeHook = () => {
  const { device } = useDeviceCount();

  const PaymentIntent = async (paymentInfoSaved) => {
    try {
      const { data } = await devitrackApi.post("/stripe/payment-intent", {paymentInfoSaved});

      console.log({ data })
      console.log({paymentInfoSaved})

      //posible data to pass
      // number: paymentInfoSaved.cardNumber,
      // exp_month: paymentInfoSaved.mm,
      // exp_year: paymentInfoSaved.yy,
      // cvc: paymentInfoSaved.cvv,
      // postal_code: paymentInfoSaved.zip,
      // payment_method_types: "card"

      console.log("stripe", { data });

    } catch (error) {
      console.log(error);
    }
  };

  return {
    //* Propiedades

    //* Métodos
    PaymentIntent,
  };
};
