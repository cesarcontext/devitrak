import { useDispatch, useSelector } from "react-redux";
import { userInfoSaved } from "../components/userInfoSaved";
import { onAddNewContact, onUpdateContact } from "../store/slices/contactInfoSlice";

export const useContactInfoStore = () => {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.contactInfo);

  const startSavingContactInfo = async (userInfoSaved) => {
    if (userInfoSaved.email) {
      //updating contactInfo
      dispatch( onUpdateContact({ ...userInfoSaved}))
    } else {
      //creating new contactInfo

      dispatch(
        onAddNewContact({ ...userInfoSaved, _id: new Date().getTime() })
      );
      localStorage.setItem("user", JSON.stringify(userInfoSaved));
    }
  };

  return {
    //* Propiedades
    user,

    //* Métodos
    startSavingContactInfo,
    // startUpdatingContactInfo,
  };
};
