import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
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
    category,
    privacyPolicy,
  }) => {
    try {
      const { data } = await devitrackApi.post("/auth/new", {
        name,
        lastName,
        email,
        phoneNumber,
        category,
        privacyPolicy,
      });
      if (data) {
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
            category: data.category,
            id: data.uid,
          })
        );
      }
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
          category: data.category,
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
            category: data.user.category,
            email: data.user.email,
            groupName: data.user.groupName,
            id: data.id,
            lastName: data.user.lastName,
            name: data.user.name,
            phoneNumber: data.user.phoneNumber,
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
