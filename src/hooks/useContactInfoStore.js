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
      console.log({ data });
      localStorage.setItem("user", JSON.stringify({ ...data }));
      localStorage.setItem("uid", data.uid);
      localStorage.setItem("token", data.token);
      localStorage.setItem("status", data.ok);

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

      // closeModal();
    }
  };

  const checkingId = localStorage.getItem("uid");

  console.log(typeof checkingId, checkingId)
  

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

      console.log("data update contact", data);

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
        localStorage.setItem("token", JSON.stringify(""));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const checking = localStorage.getItem("user");
  const userParseStored = [JSON.parse(checking)];
  const uidParsed = localStorage.getItem("uid");
  // const uidParsed = [JSON.parse(uidStored)];
  const tokenParsed = localStorage.getItem("token");
  // const tokenParsed = [JSON.parse(tokenStored)];

  return {
    //* Properties
    users,
    userParseStored,
    checkingId,
    uidParsed,
    tokenParsed,

    //* Methods
    // startVerificationContactInfoBeforeSaveIt,
    startSavingContactInfo,
    startUpdatingContactInfo,
    startShowingData,
    startCheckingUser,
  };
};
