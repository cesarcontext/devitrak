import { useDispatch, useSelector } from "react-redux";
import {
  onAddNewContact,
  onUpdateContact,
} from "../store/slices/contactInfoSlice";

export const useContactInfoStore = () => {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.contactInfo);
  

  const startSavingContactInfo = async (userInfoSaved) => {
    dispatch(onAddNewContact({ ...userInfoSaved, _id: new Date().getTime() }));
    localStorage.setItem(
      "user",
      JSON.stringify({ ...userInfoSaved})
    );
  };

  const startUpdatingContactInfo = async (userInfoSaved) => {
    dispatch(onUpdateContact({...userInfoSaved}));
  };

  const checking = localStorage.getItem("user");
  const userParseStored = [JSON.parse(checking)];


  return {
    //* Propiedades
    user,
    userParseStored,

    //* Métodos
    startSavingContactInfo,
    startUpdatingContactInfo,
  };
};
