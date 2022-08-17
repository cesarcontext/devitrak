import { useDispatch, useSelector } from "react-redux";
import { userInfoSaved } from "../components/userInfoSaved";
import { onAddNewContact } from "../store/slices/contactInfoSlice";

export const useContactInfoStore = () => {

  const dispatch = useDispatch();
  
  const { user } = useSelector( state => state.contactInfo)
  

  const startSavingContactInfo = async ( userInfoSaved ) => {

    if ( userInfoSaved._id ){
      //updating contactInfo
    } else{
      //creating new contactInfo

      dispatch( onAddNewContact({ ...userInfoSaved, _id: new Date().getTime() }) )
    }
  }

  return {


    //* Propiedades
    user,



    //* Métodos
    startSavingContactInfo
  };
};
