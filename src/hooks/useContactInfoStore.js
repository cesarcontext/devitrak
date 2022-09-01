import { current } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import devitrackApi from "../apis/devitrackApi";
import {
  onAddNewContact,
  onUpdateContact,
} from "../store/slices/contactInfoSlice";

export const useContactInfoStore = () => {
  const dispatch = useDispatch();

  const { users } = useSelector((state) => state.contactInfo);

  console.log("user", users);

  const startSavingContactInfo = async (userInfoSaved) => {
    try {
      const { data } = await devitrackApi.post("/auth/new", {
        ...userInfoSaved,
      });
      console.log({ data });

      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("id", JSON.stringify(data.user.id));
      dispatch(onAddNewContact({ ...userInfoSaved, id: data.user.id }));

      console.log(data.user.id);
    } catch (error) {
      console.log({ error });
    }
  };

  const checkingId = localStorage.getItem("id");
  const Id = JSON.parse(checkingId);

  const startUpdatingContactInfo = async (userInfoSaved) => {
    dispatch(onUpdateContact({ userInfoSaved, id: Id }));

    localStorage.setItem("user", JSON.stringify({ userInfoSaved, id: Id }));

    const { data } = devitrackApi.put(`/auth/${Id}`, userInfoSaved);
  };

  const checking = localStorage.getItem("user");
  const userParseStored = [JSON.parse(checking)];

  return {
    //* Propiedades
    users,
    userParseStored,

    //* Métodos
    startSavingContactInfo,
    startUpdatingContactInfo,
  };
};
