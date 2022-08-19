import { CardElement } from "@stripe/react-stripe-js";
import { useDispatch, useSelector } from "react-redux";
import { onAddNewPaymentInfo } from "../store/slices/paymentInfoSlice";
import { CheckoutForm } from "../stripe/CheckoutForm";


export const usePaymentInfoStore = () => {
  const dispatch = useDispatch();

  const { payment } = useSelector((state) => state.onAddNewPaymentInfo);

  const startSavingPaymentInfo = async (checkoutForm) => {
    if (checkoutForm._id) {
      //updating contactInfo
    } else {
      //creating new contactInfo

      dispatch(
        onAddNewPaymentInfo({ ...checkoutForm, _id: new Date().getTime() })
      );
      localStorage.setItem("payment", JSON.stringify(checkoutForm));
    }
  };

  return {
    //* Propiedades
    payment,

    //* Métodos
    startSavingPaymentInfo,
  };
};