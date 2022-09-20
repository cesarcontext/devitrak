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
import { useContactInfoStore } from "./useContactInfoStore";

export const useAdminStore = () => {
  const { token } = useContactInfoStore();
  const { status, user, errorMessage } = useSelector((state) => state.admin);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const startLogin = async ({ email, password }) => {
    dispatch(onChecking());

    try {
      const { data } = await devitrackApiAdmin.post("/login", {
        email,
        password,
      });
      console.log({ data });

      localStorage.setItem("token", data.token);
      Swal.fire("", "Redirectioning to your Admin page", "success");
      navigate("/admin");
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

    try {
      const { data } = await devitrackApiAdmin.post("/new_admin_user", {
        name,
        email,
        password,
      });

      dispatch(onLogin({ name: data.name, uid: data.uid }));
      Swal.fire("User created", "User has been created", "success");
      navigate("/admin");
    } catch (error) {
      dispatch(onLogout(error.response.data?.msg || "---"));
      Swal.fire("Error", error.response.data.msg, "error");

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
    localStorage.clear();
  };

  // const userRegitered = [];

  const startLoadingUsers = () => {
    try {
      if (token) {
        const { data } = devitrackApiPayment.get("/");
        console.log("users loaded", data);
      }
      // userRegitered.push(data);
    } catch (error) {}
  };

  return {
    //*Propiedades
    status,
    user,
    errorMessage,
    // userRegitered,

    //*Metodos
    startLogout,
    checkAdminToken,
    startLogin,
    startRegister,
    startLoadingUsers,
  };
};
