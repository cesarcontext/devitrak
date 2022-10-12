import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import {
  devitrackApiAdmin,
  devitrackApiPayment,
  devitrackApi,
  devitrackApiArticle
} from "../apis/devitrackApi";
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
      localStorage.setItem("token", data.token);
      Swal.fire({
        text: "Redirectioning to your Admin page",
        icon: "success",
      }).then(() => {
        window.location = "http://localhost:3000/admin";
      });
      dispatch(onLogin({ name: data.name, uid: data.uid, email: data.email }));
    } catch (error) {
      dispatch(onLogout("Incorrect credentials"));
      Swal.fire("Error", error.response.data.msg, "error");

      setTimeout(() => {
        dispatch(clearErrorMessage());
      }, 1000);
    }
  };

  const startRegister = async ({ name, email, password }) => {
    dispatch(onChecking());

    const role = ["Editor"];
    try {
      const { data } = await devitrackApiAdmin.post("/new_admin_user", {
        name,
        email,
        password,
        role,
      });
      setTokenAdmin(data.token);
      localStorage.setItem("token", data.token);
      dispatch(onLogin({ name: data.name, uid: data.uid, email: data.email }));
      Swal.fire("User created", "Account has been created", "success").then(
        () => {
          window.location = "http://localhost:3000/admin";
        }
      );
    } catch (error) {
      console.log(error.response.data.errors);
      dispatch(onLogout(error.response.data?.errors.check.msg || "---"));

      if (error.response.data.errors.name) {
        Swal.fire("Error", "Name must be provided", "error");
      } else if (error.response.data.errors.email) {
        Swal.fire(
          "Error",
          "Email address must be provided in valid format",
          "error"
        );
      }

      setTimeout(() => {
        dispatch(clearErrorMessage());
      }, 1000);
    }
  };

  const startEditAdminUser = async (email) => {
    const { uid } = user;
    try {
      const { data } = await devitrackApiAdmin.put(`/profile/${uid}`, {
        email: email,
      });
      dispatch(onLogin({ name: data.name, email: data.email, uid: data.uid }));
      Swal.fire("Email updated", "The new email was saved!", "success");
    } catch (error) {
      console.log(error);
    }
  };

  const checkAdminToken = async () => {
    const token = localStorage.getItem("token");

    if (!token) return dispatch(onLogout());

    try {
      const { data } = await devitrackApiAdmin.get("/renew");
      localStorage.setItem("token", data.token);
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

  const startRenderAllPaymentIntents = () => {
    try {
      if (tokenAdmin) {
        const { data } = devitrackApiPayment.get("/payment_intents");
      }
    } catch (error) {}
  };

  const checkReceiversAssignedToPaymentIntent = async (
    paymentIntentToCheck
  ) => {
    try {
      const response = await devitrackApi.post("/receiver/receiver-assigned", {
        paymentIntent: paymentIntentToCheck,
      });
      const data = await response.data.receiver;
    console.log(data)
      dispatch(onCheckReceiverPaymentIntent(data))
    } catch (error) {
      console.log(error);
    }
  };

  const articleSetup = async ({
    img,
    title,
    body
  }) => {
 try {
  const response = await devitrackApiArticle.post("/article-creation", {img, title, body})
  console.log('article data', response )
 } catch (error) {
  console.log( error)
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
  }

  const displayArticles = async () => {
    try {
      const response = await devitrackApiArticle.get("/articles")
      .then( response => console.log(response.data))
    } catch (error) {
      console.log( error )
    }
  }
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
    startRenderAllPaymentIntents,
    checkReceiversAssignedToPaymentIntent,
    articleSetup,
    
  };
};
