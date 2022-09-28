import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { devitrackApi } from "../apis/devitrackApi";
import {
  onAddNewContact,
  onUpdateContact,
  onCheckContact,
} from "../store/slices/contactInfoSlice";

export const useContactInfoStore = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { users } = useSelector((state) => state.contactInfo);
  const [visible, setVisible] = useState("none");
  const [visibleButton, setVisibleButton] = useState("content");
  const [userCreatedDisabledInput, setUserCreatedDisabledInput] =
    useState(false);
  const [token, setToken] = useState("");
  const [emailUserRegistered, setEmailUserRegistered] = useState("");

  const startSavingContactInfo = async ({
    name,
    lastName,
    email,
    phoneNumber,
  }) => {
    try {
      const { data } = await devitrackApi.post("/auth/new", {
        name,
        lastName,
        email,
        phoneNumber,
      });
      localStorage.setItem("user", JSON.stringify({ ...data }));
      localStorage.setItem("uid", data.uid);
      localStorage.setItem("token", data.token);
      localStorage.setItem("status", data.ok);
      setVisible("content");
      setVisibleButton("none");
      setUserCreatedDisabledInput(true);
      setToken(data.token);
      setEmailUserRegistered(data.email);

      dispatch(
        onAddNewContact({
          name: data.name,
          lastName: data.lastName,
          email: data.email,
          phoneNumber: data.phone,
          id: data.uid,
        })
      );
    } catch (error) {
      console.log({ error });
      setToken("");
      setEmailUserRegistered("");
      Swal.fire({
        title: "Something went wrong",
        width: 600,
        padding: "3em",
        text: error,
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

      // closeModal();
    }
  };

  const checkingId = localStorage.getItem("uid");

  const startShowingData = () => {
    try {
      const { data } = devitrackApi.get(`/auth/${checkingId}`);

      localStorage.setItem("user", JSON.stringify({ ...data }));
    } catch (error) {
      console.log(error);
    }
  };

  const startUpdatingContactInfo = async ({
    name,
    lastName,
    email,
    phoneNumber,
  }) => {
    try {
      const { data } = await devitrackApi.put(`/auth/${checkingId}`, {
        name,
        lastName,
        email,
        phoneNumber,
      });

      localStorage.setItem("user", JSON.stringify({ ...data }));
      localStorage.setItem("uid", data.uid);
      localStorage.setItem("token", data.token);
      localStorage.setItem("status", data.ok);

      if (data) {
        dispatch(
          onUpdateContact({
            groupName: data.user.groupName,
            name: data.user.name,
            lastName: data.user.lastName,
            email: data.user.email,
            phone: data.user.phoneNumber,
            id: data.user.id,
            status: data.ok,
          })
        );
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: "Upss something went wrong!!",
        width: 600,
        padding: "3em",
        text: `${error.response.data.msg}`,
        icon: "error",
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
  };

  const startCheckingUser = async (userInfoEmailCheck) => {
    try {
      const { data } = await devitrackApi.post("/auth/", {
        userInfoEmailCheck,
      });

      if (data.ok === true) {
        localStorage.setItem(
          "user",
          JSON.stringify({ ...data.user, status: data.ok, id: data.user.id })
        );
        localStorage.setItem("uid", data.user.id);
        localStorage.setItem("token", data.token);
        setToken(data.token);
        setEmailUserRegistered(data.user.email);
        dispatch(
          onCheckContact({
            groupName: data.user.groupName,
            name: data.user.name,
            lastName: data.user.lastName,
            email: data.user.email,
            phone: data.user.phoneNumber,
            id: data.user.uid,
            status: data.ok,
          })
        );
      } else {
        localStorage.setItem(
          "user",
          JSON.stringify({
            groupName: "",
            name: "",
            lastName: "",
            email: "",
            phone: "",
            id: "",
            status: "",
            id: "",
          })
        );
        localStorage.setItem("uid", JSON.stringify(""));
        localStorage.setItem("token", "");
        setToken("");
        setEmailUserRegistered("")

        dispatch(
          onCheckContact({
            groupName: "",
            name: "",
            lastName: "",
            email: "",
            phoneNumber: "",
            id: "",
            status: "",
          })
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const checking = localStorage.getItem("user");
  const userParseStored = [JSON.parse(checking)];
  // const uidParsed = localStorage.getItem("uid");

  return {
    //* Properties
    users,
    userParseStored,
    checkingId,
    // uidParsed,
    token,
    visibleButton,
    visible,
    userCreatedDisabledInput,
    emailUserRegistered,


    //* Methods
    // startVerificationContactInfoBeforeSaveIt,
    startSavingContactInfo,
    startUpdatingContactInfo,
    startShowingData,
    startCheckingUser,
  };
};
