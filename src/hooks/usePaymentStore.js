import { useDispatch, useSelector } from "react-redux";
import { onAddNewPaymentInfo } from "../store/slices/paymentInfoSlice";

export const usePaymentStore = () => {
  const dispatch = useDispatch();

  const { paymentState } = useSelector((state) => state.paymentInfo);

  const startSavingPaymentInfo = async (paymentInfoSaved) => {
    dispatch(
      onAddNewPaymentInfo({ ...paymentInfoSaved, _id: new Date().getTime() })
    );
    localStorage.setItem(
      "user",
      JSON.stringify({ ...paymentInfoSaved, _id: new Date().getTime() })
    );
  };

  return {
    //* Propiedades
    paymentState,

    //* Métodos
    startSavingPaymentInfo,
  };
};
