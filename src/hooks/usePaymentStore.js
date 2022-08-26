import { useDispatch, useSelector } from "react-redux";
import { onAddNewPaymentInfo } from "../store/slices/paymentInfoSlice";

export const usePaymentStore = () => {
  const dispatch = useDispatch();

  const { paymentState } = useSelector((state) => state.paymentInfo);

  const startSavingPaymentInfo = async (paymentInfoSaved) => {
    dispatch(
      onAddNewPaymentInfo({ ...paymentInfoSaved, _id: new Date().getTime() })
    );
    
    const paymentRecord = []
    paymentRecord.push({...paymentInfoSaved})
    console.log("record", paymentRecord )

    localStorage.setItem(
      "paymentInfo",
      JSON.stringify({ ...paymentInfoSaved})
    );

    localStorage.setItem('paymentRecord', JSON.stringify(paymentRecord))
  };

  const paymentRecordGotten = localStorage.getItem('paymentRecord')
  const paymentRecordParse = JSON.parse( paymentRecordGotten )

  const paymentInfoStored = localStorage.getItem('paymentInfo')

  const paymentInfoParse = [JSON.parse( paymentInfoStored )]

  return {
    //* Propiedades
    paymentState,
    paymentInfoParse,
    paymentRecordParse,

    //* Métodos
    startSavingPaymentInfo,
  };
};
