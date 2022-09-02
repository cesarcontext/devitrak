import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import Swal from "sweetalert2";
import devitrackApi from "../apis/devitrackApi";
import {
  onAddNewContact,
  onUpdateContact,
} from "../store/slices/contactInfoSlice";
import { useUiStore } from "./useUiStore";

export const useContactInfoStore = () => {
  const dispatch = useDispatch();

  const { users } = useSelector((state) => state.contactInfo);
  const { openModal, closeModal } = useUiStore();

  const userInfo = {
    groupName: users.groupName,
    name: users.name,
    lastName: users.lastName,
    email: users.email,
    phoneNumber: users.phoneNumber,
  };

  const startVerificationContactInfoBeforeSaveIt = (userInfoSaved) => {
    dispatch(onAddNewContact({ ...userInfoSaved }));
    localStorage.setItem("user", JSON.stringify(userInfoSaved));

    openModal();
  };

  const startSavingContactInfo = async (user) => {
    try {
      const { data } = await devitrackApi.post("/auth/new", {
        ...user,
      });
      console.log({ data });

      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("id", JSON.stringify(data.user.id));

      dispatch(onAddNewContact({ ...user, id: data.user.id }));

      console.log(data.user.id);

      if (data) {
        Swal.fire({
          title: "Your account was created successfully",
          width: 600,
          padding: "3em",
          text: `REFERENCE NUMBER: ${data.user.id}`,
          icon:"success",
          color: "#rgb(30, 115, 190)",
          background: "#fff",
          confirmButtonColor: "rgb(30, 115, 190)",
          backdrop: `
          rgb(30, 115, 190)
            url("../image/logo.jpg")
            left top
            no-repeat
          `,
        });
      }
    } catch (error) {
      console.log({ error });
      <Link to="/">
        {Swal.fire({
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
        })}
      </Link>;

      closeModal();
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
    startVerificationContactInfoBeforeSaveIt,
    startSavingContactInfo,
    startUpdatingContactInfo,
  };
};
