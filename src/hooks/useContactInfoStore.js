import { useDispatch, useSelector } from "react-redux";
import devitrackApi from "../apis/devitrackApi";
import {
  onAddNewContact,
  onUpdateContact,
} from "../store/slices/contactInfoSlice";

export const useContactInfoStore = () => {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.contactInfo);
  

  const startSavingContactInfo = async (userInfoSaved) => {

    dispatch(onAddNewContact({ ...userInfoSaved}));


    try {
        
      const { data } = await devitrackApi.post('/auth/new', {...userInfoSaved})
      console.log({ data })
      
      localStorage.setItem(
        "user",
        JSON.stringify( data.user )
      );
  
    } catch (error) {
      console.log({ error })
    }
  };

  const startUpdatingContactInfo = async (userInfoEditedSaved) => {
    dispatch(onUpdateContact({ ...userInfoEditedSaved}));
    localStorage.setItem(
      "user",
      JSON.stringify({ ...userInfoEditedSaved})
    );
        
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
