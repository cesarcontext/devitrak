import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { devitrackApi } from "../apis/devitrackApi";
import { swalErrorMessage } from "../helper/swalFireMessage";
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
    privacyPolicy,
  }) => {
    try {
      const { data } = await devitrackApi.post("/auth/new", {
        name,
        lastName,
        email,
        phoneNumber,
        privacyPolicy,
      });
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
      console.log(error);
      setToken("");
      setEmailUserRegistered("");
      swalErrorMessage(error.response.data.msg);
      navigate("/");
    }
  };
  const startShowingData = () => {
    try {
      const { data } = devitrackApi.get(`/auth/${users.uid}`);
      dispatch(
        onAddNewContact({
          name: data.name,
          lastName: data.lastName,
          email: data.email,
          phoneNumber: data.phone,
          id: data.uid,
        })
      );
      localStorage.setItem("uid", data.uid);
      localStorage.setItem("token", data.token);
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
      const userUID = localStorage.getItem("uid");
      const { data } = await devitrackApi.put(`/auth/${userUID}`, {
        name,
        lastName,
        email,
        phoneNumber,
      });
      dispatch(
        onUpdateContact({
          name: data.name,
          lastName: data.lastName,
          email: data.email,
          phoneNumber: data.phone,
          id: data.uid,
        })
      );
      localStorage.setItem("uid", data.uid);
      localStorage.setItem("token", data.token);
      localStorage.setItem("status", data.ok);
    } catch (error) {
      console.log(error);
      swalErrorMessage(`${error.response.data.msg}`);
    }
  };

  const startCheckingUser = async (userInfoEmailCheck) => {
    try {
      const { data } = await devitrackApi.post("/auth/", {
        userInfoEmailCheck,
      });

      if (data.ok === true) {
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
        localStorage.setItem("uid", JSON.stringify(""));
        localStorage.setItem("token", "");
        setToken("");
        setEmailUserRegistered("");
        dispatch(
          onCheckContact({
            groupName: "",
            name: "",
            lastName: "",
            email: "",
            phoneNumber: "",
            id: "",
            status: "",
            permissionNotification: "",
          })
        );
      }
    } catch (error) {
      console.log(error);
    }
  };
  return {
    //* Properties
    users,
    token,
    visibleButton,
    visible,
    userCreatedDisabledInput,
    emailUserRegistered,

    //* Methods
    startSavingContactInfo,
    startUpdatingContactInfo,
    startShowingData,
    startCheckingUser,
  };
};
