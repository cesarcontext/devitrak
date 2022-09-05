import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import devitrackApi from "../apis/devitrackApi";
import { onAddNewCreditCardInfo, onUpdateCreditCardInfo } from "../store/slices/paymentInfoSlice";
import { useContactInfoStore } from "./useContactInfoStore";
import { useDeviceCount } from "./useDeviceCountStore";

export const usePaymentStore = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { creditCardState } = useSelector((state) => state.paymentInfo);
  const { userParseStored, Id } = useContactInfoStore();
  const { device } = useDeviceCount();

  const startVerificationCreditCardInfoBeforeSaveIt = (paymentInfoSaved) => {
    dispatch(onAddNewCreditCardInfo({ ...paymentInfoSaved }));
    localStorage.setItem("credit-card", JSON.stringify(paymentInfoSaved));
  };

  const startSavingPaymentInfo = async (paymentInfoSaved) => {
    try {
      const { data } = await devitrackApi.post("/creditCard/new_credit_card", {
        ...paymentInfoSaved,
        user:Id,
      });

      localStorage.setItem(
        "credit-card",
        JSON.stringify({
          ...data.creditCard,
          id: data.creditCard.id,
          user: userParseStored.id,
          device,
          user:Id
        })
      );
      dispatch( onAddNewCreditCardInfo({...paymentInfoSaved })) //pasar el id del usuario
    } catch (error) {
      console.log({ error });

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

  const startUpdatingCreditCardInfo = async (paymentInfoSaved) => {
    try {
      const { data } = devitrackApi.put(`/creditCard/${Id}`, {
        ...paymentInfoSaved,
      });
      console.log({ data })

      dispatch(onUpdateCreditCardInfo({ ...paymentInfoSaved })); //, id: Id

      localStorage.setItem("credit-card", JSON.stringify(paymentInfoSaved));
    } catch (error) {
      console.log(error);
    }
  };

  const paymentInfoStored = localStorage.getItem("credit-card");

  const paymentInfoParse = [JSON.parse(paymentInfoStored)];

  return {
    //* Propiedades
    creditCardState,
    paymentInfoParse,
    // paymentRecordParse,

    //* Métodos
    startVerificationCreditCardInfoBeforeSaveIt,
    startSavingPaymentInfo,
    startUpdatingCreditCardInfo
  };
};
