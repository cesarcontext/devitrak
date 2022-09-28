import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { devitrackApiAdmin, devitrackApiPayment } from "../apis/devitrackApi";
import {
  clearErrorMessage,
  onChecking,
  onLogin,
  onLogout,
} from "../store/slices/adminSlice";

export const useAdminStore = () => {
  const { status, user, errorMessage } = useSelector((state) => state.admin);
  const [tokenAdmin, setTokenAdmin] = useState("");
  const [adminName, setAdminName] = useState("")
  const [adminEmail, setAdminEmail] = useState("")
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
      setAdminName(data.name)
      setAdminEmail(data.email)
      localStorage.setItem("token", data.token);
      localStorage.setItem("admin",data.name);
      localStorage.setItem("adminEmail", data.email);
      Swal.fire({
        text: "Redirectioning to your Admin page",
        icon: "success",
      }).then(() => {
        window.location = "http://localhost:3000/admin";
      });
      dispatch(onLogin({ name: data.name, uid: data.uid }));
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

    const role = ['Editor']
    try {
      const { data } = await devitrackApiAdmin.post("/new_admin_user", {
        name,
        email,
        password,
        role
      });
      setTokenAdmin(data.token);
      localStorage.setItem("token", data.token);
      localStorage.setItem("admin", JSON.stringify({name: data.name, email:data.email}));
      dispatch(onLogin({ name: data.name, uid: data.uid }));
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
    localStorage.setItem("token");
    window.location = "http://localhost:3000/admin/login"
  };

  // const userRegitered = [];

  const startLoadingUsers = () => {
    try {
      if (tokenAdmin) {
        const { data } = devitrackApiPayment.get("/");
        console.log("users loaded", data.user);
      }
    } catch (error) {}
  };

  const startRenderAllPaymentIntents = () => {
    try {
      if (tokenAdmin) {
        const { data } = devitrackApiPayment.get("/payment_intents");
        console.log("data rendered", data);
      }
    } catch (error) {}
  };

  console.log(adminName);
  console.log(adminEmail);

  return {
    //*Propiedades
    status,
    user,
    errorMessage,
    tokenAdmin,
    adminName,
    adminEmail,
    // userRegitered,

    //*Metodos
    startLogout,
    checkAdminToken,
    startLogin,
    startRegister,
    startLoadingUsers,
    startRenderAllPaymentIntents,
  };
};
