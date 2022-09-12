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
  const { openModal, closeModal } = useUiStore();

  const startVerificationContactInfoBeforeSaveIt = (userInfoSaved) => {
    console.log({ userInfoSaved });

    dispatch(onAddNewContact({ ...userInfoSaved }));
    localStorage.setItem("user", JSON.stringify(userInfoSaved));
    openModal();
  };

  const startSavingContactInfo = async ({
    groupName,
    name,
    lastName,
    email,
    phoneNumber,
  }) => {
    console.log({ groupName, name, lastName, email, phoneNumber });
    try {
      const { data } = await devitrackApi.post("/auth/new", {
        groupName,
        name,
        lastName,
        email,
        phoneNumber,
      });
      console.log({ data });
      localStorage.setItem("user", JSON.stringify({ ...data }));
      localStorage.setItem("uid", JSON.stringify(data.uid));
      localStorage.setItem("token", JSON.stringify(data.token));

      dispatch(
        onAddNewContact({
          groupName: data.groupName,
          name: data.name,
          lastName: data.lastName,
          email: data.email,
          phoneNumber: data.phoneNumber,
          id: data.uid,
        })
      );

      if (data) {
        Swal.fire({
          title: "Your account was created successfully",
          width: 600,
          padding: "3em",
          text: `REFERENCE NUMBER: ${data.uid}`,
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
        text: error.message,
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

  const startUpdatingContactInfo = async ({
    groupName,
    name,
    lastName,
    email,
    phoneNumber,
  }) => {
    try {
      const { data } = devitrackApi.put(`/auth/${Id}`, {
        groupName,
        name,
        lastName,
        email,
        phoneNumber,
      });

      dispatch(
        onUpdateContact({
          groupName: data.user.groupName,
          name: data.user.name,
          lastName: data.user.lastName,
          email: data.user.email,
          phoneNumber: data.user.phoneNumberid,
        })
      );

      localStorage.setItem(
        "user",
        JSON.stringify({ ...data.user, id: data.user.id })
      );
    } catch (error) {
      console.log(error);
    }
  };

  const startCheckingUser = async (userInfoEmailCheck) => {
    try {
      const { data } = await devitrackApi.post("/auth/", {
        userInfoEmailCheck,
      });
      console.log({ data });
      if (data) {
        localStorage.setItem(
          "user",
          JSON.stringify({ ...data.user, status: data.ok, id: data.user.id })
        );
        localStorage.setItem("uid", JSON.stringify(data.user.id));
      }
      return;
      
    } catch (error) {
      console.log(error);
    }
  };

  const checking = localStorage.getItem("user");
  const userParseStored = [JSON.parse(checking)];

  return {
    //* Properties
    users,
    userParseStored,
    Id,

    //* Methods
    startVerificationContactInfoBeforeSaveIt,
    startSavingContactInfo,
    startUpdatingContactInfo,
    startShowingData,
    startCheckingUser,
  };
};
