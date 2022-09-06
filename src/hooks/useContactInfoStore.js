import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import devitrackApi from "../apis/devitrackApi";
import {
  onAddNewContact,
  onUpdateContact,
} from "../store/slices/contactInfoSlice";
import { useUiStore } from "./useUiStore";

export const useContactInfoStore = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { users } = useSelector((state) => state.contactInfo);
  const { closeModal } = useUiStore();

  const startVerificationContactInfoBeforeSaveIt = (userInfoSaved) => {
    dispatch(onAddNewContact({ ...userInfoSaved }));
    localStorage.setItem("user", JSON.stringify(userInfoSaved));
  };

  const startSavingContactInfo = async ({ groupName, name, lastName, email, phoneNumber}) => {
    try {
      const { data } = await devitrackApi.post("/auth/new", { groupName, name, lastName, email, phoneNumber});

      localStorage.setItem("user", JSON.stringify({...data.user, id:data.user.id}));
      localStorage.setItem("id", JSON.stringify(data.user.id));

      dispatch(onAddNewContact({ groupName: data.user.groupName, name: data.user.name, lastName: data.user.lastName, email: data.user.email, phoneNumber: data.user.phoneNumber, id: data.id}));

      if (data) {
        Swal.fire({
          title: "Your account was created successfully",
          width: 600,
          padding: "3em",
          text: `REFERENCE NUMBER: ${data.user.id}`,
          icon: "success",
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

        return data;
      }
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

      closeModal();
    }
  };

  const checkingId = localStorage.getItem("id");
  const Id = JSON.parse(checkingId);

  const startShowingData = () => {
    try {
      const { data } = devitrackApi.get(`/auth/${Id}`);

      localStorage.setItem("user", JSON.stringify(data.user));
    } catch (error) {
      console.log(error);
    }
  };

  const startUpdatingContactInfo = async ({groupName, name, lastName, email, phoneNumber, id}) => {
    try {
      const { data } = devitrackApi.put(`/auth/${ Id }`, {groupName, name, lastName, email, phoneNumber});

      dispatch(onUpdateContact({ groupName: data.user.groupName, name: data.user.name, lastName: data.user.lastName, email: data.user.email, phoneNumber: data.user.phoneNumberid}));

      localStorage.setItem("user", JSON.stringify({...data.user, id: data.user.id}));

    } catch (error) {
      console.log(error);
    }
  };

  const checking = localStorage.getItem("user");
  const userParseStored = [JSON.parse(checking)];

  return {
    //* Propiedades
    users,
    userParseStored,
    Id,

    //* Métodos
    startVerificationContactInfoBeforeSaveIt,
    startSavingContactInfo,
    startUpdatingContactInfo,
    startShowingData,
  };
};
