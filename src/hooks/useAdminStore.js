import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  devitrackApiAdmin,
  devitrackApi,
  devitrackApiArticle,
} from "../apis/devitrackApi";
import { rightDoneMessage, swalErrorMessage } from "../helper/swalFireMessage";
import {
  clearErrorMessage,
  onChecking,
  onLogin,
  onLogout,
} from "../store/slices/adminSlice";
import { onCheckReceiverPaymentIntent } from "../store/slices/stripeSlice";

export const useAdminStore = () => {
  const { status, user, errorMessage } = useSelector((state) => state.admin);
  const [tokenAdmin, setTokenAdmin] = useState("");
  const [adminName, setAdminName] = useState("");
  const [adminEmail, setAdminEmail] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const startLogin = async ({ email, password }) => {
    dispatch(onChecking());

    try {
      const { data } = await devitrackApiAdmin.post("/login", {
        email,
        password,
      });
      setTokenAdmin(data.token);
      setAdminName(data.name);
      setAdminEmail(data.email);
      localStorage.setItem("admin-token", data.token);
      rightDoneMessage("Redirectioning to your Admin page");
      dispatch(
        onLogin({
          name: data.name,
          uid: data.uid,
          email: data.email,
          role: data.role,
        })
      );
    } catch (error) {
      dispatch(onLogout("Incorrect credentials"));
      swalErrorMessage(error.response.data.msg);

      setTimeout(() => {
        dispatch(clearErrorMessage());
      }, 1000);
    }
  };

  const startRegister = async ({ name, email, password, question, answer }) => {
    dispatch(onChecking());
    const role = "Editor";
    try {
      const { data } = await devitrackApiAdmin.post("/new_admin_user", {
        name,
        email,
        password,
        question,
        answer,
        role,
      });
      setTokenAdmin(data.token);
      localStorage.setItem("admin-token", data.token);
      dispatch(
        onLogin({
          name: data.name,
          uid: data.uid,
          email: data.email,
          role: data.role,
        })
      );
      rightDoneMessage("Account has been created");
    } catch (error) {
      dispatch(onLogout(error.response.data?.errors.check.msg || "---"));
      if (error.response.data.errors.name) {
        swalErrorMessage("Name must be provided");
      } else if (error.response.data.errors.email) {
        swalErrorMessage("Email address must be provided in valid format");
      }

      setTimeout(() => {
        dispatch(clearErrorMessage());
      }, 1000);
    }
  };

  const startEditAdminUser = async ({ email, fullname }) => {
    const { uid } = user;
    console.log("uid", uid);
    try {
      const { data } = await devitrackApiAdmin.put(`/profile/${uid}`, {
        email: email,
        name: fullname,
      });
      dispatch(
        onLogin({
          name: data.name,
          email: data.email,
          uid: data.uid,
          role: data.role,
        })
      );
      rightDoneMessage("Email updated!");
    } catch (error) {
      console.log(error);
      swalErrorMessage(error);
    }
  };

  const checkAdminToken = async () => {
    const token = localStorage.getItem("token");

    if (!token) return dispatch(onLogout());

    try {
      const { data } = await devitrackApiAdmin.get("/renew");
      localStorage.setItem("admin-token", data.token);
      localStorage.setItem("token-init-date", new Date().getItem());
      dispatch(onLogin({ name: data.name, uid: data.uid }));
    } catch (error) {
      localStorage.clear();
      dispatch(onLogout());
    }
  };

  const startLogout = () => {
    dispatch(onLogout());
    navigate("/admin/login");
  };

  const checkReceiversAssignedToPaymentIntent = async (
    paymentIntentToCheck
  ) => {
    try {
      const response = await devitrackApi.post("/receiver/receiver-assigned", {
        paymentIntent: paymentIntentToCheck,
      });
      const data = await response?.data.receiver;
      dispatch(onCheckReceiverPaymentIntent(data));
    } catch (error) {
      console.log(error);
    }
  };

  const editAdminPermission = async ({ role, sendObjectIdUser }) => {
    const uid = sendObjectIdUser;
    try {
      const { data } = await devitrackApiAdmin.put(`/profile/${uid}`, {
        role,
      });
      if (data) {
        rightDoneMessage("Permission updated successfully");
      }
    } catch (error) {
      console.log(error);
      alert("Error. Please try again later");
    }
  };

  const articleSetup = async ({ img, title, body }) => {
    try {
      const response = await devitrackApiArticle.post("/article-creation", {
        img,
        title,
        body,
      });
      if (response) {
        navigate("/articles");
      }
    } catch (error) {
      console.log(error);
      swalErrorMessage(`${error.response.data.msg}`);
    }
  };
  return {
    //*Propiedades
    status,
    user,
    errorMessage,
    tokenAdmin,
    adminName,
    adminEmail,

    //*Metodos
    startLogout,
    checkAdminToken,
    startLogin,
    startRegister,
    startEditAdminUser,
    editAdminPermission,
    checkReceiversAssignedToPaymentIntent,
    articleSetup,
  };
};
