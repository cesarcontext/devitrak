import { useDispatch, useSelector } from "react-redux";
import { onAddNewContact } from "../store/slices/contactInfoSlice";

export const useContactInfoStore = () => {

  const dispatch = useDispatch();

  const { contacts } = useSelector((state) => state.contactInfo);

  const { user } = contacts
  

  const startSavingContactInfo = ( user ) => {

    if ( contacts._id ){
      //updating contactInfo
    } else{
      //creating new contactInfo

      dispatch( onAddNewContact({ _id:new Date().getTime(), user }) )
    }
  }

  return {


    //* Propiedades
    user,



    //* Métodos
    startSavingContactInfo
  };
};
