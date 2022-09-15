import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import {devitrackApi, devitrackApiPayment} from "../apis/devitrackApi";
import {
  onAddNewCreditCardInfo,
  onUpdateCreditCardInfo,
} from "../store/slices/paymentInfoSlice";
import { useContactInfoStore } from "./useContactInfoStore";
import { useDeviceCount } from "./useDeviceCountStore";
import { useUiStore } from "./useUiStore";

export const usePaymentStore = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { creditCardState } = useSelector((state) => state.paymentInfo);
  const { users } = useContactInfoStore();
  const { device } = useDeviceCount();
  const { openModal, closeModal } = useUiStore()

  const startVerificationCreditCardInfoBeforeSaveIt = (paymentInfoSaved) => {

    console.log('cc-state', paymentInfoSaved )
    dispatch(onAddNewCreditCardInfo({ ...paymentInfoSaved }));
    localStorage.setItem("credit-card", JSON.stringify(paymentInfoSaved));
    openModal()
  };

  const startSavingPaymentInfo = async (paymentInfoSaved) => {

    console.log('payment info submitted', paymentInfoSaved)
    try {
      const { data } = await devitrackApiPayment.post("/new_credit_card", {
        cardName: paymentInfoSaved.cardName,
        cardNumber: paymentInfoSaved.cardNumber,
        mm: paymentInfoSaved.mm,
        yy: paymentInfoSaved.yy,
        cvv: paymentInfoSaved.cvv,
        zip: paymentInfoSaved.zip,
        country: paymentInfoSaved.country,
      });

      console.log('payment data', {data})
      localStorage.setItem(
        "credit-card",
        JSON.stringify({
          ...data.creditCard,
          id: data.creditCard.id,
          user: users.id,
          device,
        })
      );
      localStorage.setItem("card-card-id", JSON.stringify(data.creditCard.id));
      dispatch(
        onAddNewCreditCardInfo({
          ...data.creditCard,
          id: data.creditCard.id,
          users,
        })
      ); //pasar el id del usuario

      closeModal()

    } catch (error) {
      console.log({ error });


    }
  };

  const checkCreditcardId = localStorage.getItem("card-card-id");
  const CCId = JSON.parse(checkCreditcardId);

  const startUpdatingCreditCardInfo = async (paymentInfoSaved) => {
    try {
      const { data } = devitrackApiPayment.put(`/${CCId}`, {
        ...paymentInfoSaved,
      });

      dispatch(onUpdateCreditCardInfo({ ...data.creditCard })); //, id: Id

      localStorage.setItem("credit-card", JSON.stringify(paymentInfoSaved));

    } catch (error) {
      console.log(error);
      Swal.fire({
        title: "Something went wrong",
        width: 600,
        padding: "3em",
        text: error.response.data.msg,
        icon: "error",
        color: "rgb(30, 115, 190)",
        background: "#fff",
        confirmButtonColor: "rgb(30, 115, 190)",
        backdrop: `
          rgb(30, 115, 190)
            url("../image/logo.jpg")
            left top
            no-repeat
          `,
      });
      navigate("/");
    }
  };

  const paymentInfoStored = localStorage.getItem("credit-card");

  const paymentInfoParse = [JSON.parse(paymentInfoStored)];

  return {
    //* Propiedades
    creditCardState,
    paymentInfoParse,

    //* Métodos
    startVerificationCreditCardInfoBeforeSaveIt,
    startSavingPaymentInfo,
    startUpdatingCreditCardInfo,
  };
};
