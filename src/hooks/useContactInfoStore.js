import { useCallback, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { devitrackApi } from "../apis/devitrackApi";
import { swalErrorMessage } from "../helper/swalFireMessage";
import {
  onAddNewContact,
  onUpdateContact,
  onCheckContact,
} from "../store/slices/contactInfoSlice";
/**
 * useContectInfoStore - component where all custom hooks for user are located
 * @returns {string|function|boolean|Object}
 */
export const useContactInfoStore = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { eventSelected, provider } = useSelector(
    (state) => state.providerEvent
  );
  const { users } = useSelector((state) => state.contactInfo);
  const [messageUserDataExist, setMessageUserDataExist] = useState("")
  const [visible, setVisible] = useState("none");
  const [visibleButton, setVisibleButton] = useState("content");
  const [userCreatedDisabledInput, setUserCreatedDisabledInput] =
    useState(false);
  const [token, setToken] = useState("");
  const [emailUserRegistered, setEmailUserRegistered] = useState("");
  const reference = useRef();

  /**
   * startSavingContactInfo - funtion to fetch user info and create it in the database
   * @param {String} name
   * @param {String} lastname
   * @param {String} email
   * @param {Number} phoneNumber
   * @param {String} category
   * @param {String} privacyPolicy
   * @returns {Promise}
   */
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
        provider: provider,
        eventSelected: eventSelected,
        name,
        lastName,
        email,
        phoneNumber,
        category,
        privacyPolicy,
      });

      /**
       * Checks the data. Returns the data object if it was successfull.
       * Otherwise it throws an error including the error message
       * @description data - destructured from fetch response
       * @returns {Object} the data object
       * @throws {String} the error message and return user to main page where form is displayed
       */

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

  /**
   * startUpdatingContactInfo - funtion to fetch new user info and update user detail in database
   * @param {String} name
   * @param {String} lastname
   * @param {Number} phoneNumber
   * @param {String} email
   * @returns {Promise}
   */
  const startUpdatingContactInfo = async ({
    name,
    lastName,
    email,
    phoneNumber,
  }) => {
    try {
      const userUID = localStorage.getItem("uid");

      /**
       * Checks the data. Returns the data object if it was successfull.
       * Otherwise it throws an error including the error message
       * @description data - destructured from fetch response
       * @returns {Object} the data object
       * @throws {String} the error message and return user to main page where form is displayed
       */

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

  /**
   * startCheckingUser - funtion to check if email user exists in database or not
   * @param {String} userInfoEmailCheck
   * @returns {Promise}
   */
  const startCheckingUser = async (userInfoEmailCheck) => {
    try {
      const { data } = await devitrackApi.post("/auth/", {
        userInfoEmailCheck,
      });

      /**
       * Checks the data. Returns the data object if it was successfull.
       * Otherwise it throws an error including the error message
       * @description data - destructured from fetch response / grant permission to user
       * @returns {Object} the data object
       * @throws {String} the error message and return user to main page where form is displayed
       */
      if (data.ok === true) {
        let checkProvider = {};
        let checkEvent = {};
        data.user.provider.map((prov) => {
          if (!checkProvider[prov]) {
            checkProvider[prov] = 1;
          }
        });
        data.user.eventSelected.map((event) => {
          if (!checkEvent[event]) {
            checkEvent[event] = 1;
          }
        });
        let addingEventList = Object.keys(checkEvent);
        let addingProviderList = Object.keys(checkProvider);
        for (let event of addingEventList) {
          for (let prov of addingProviderList) {
            if (event === eventSelected && prov === provider) {
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
              let eventAddedToUserHistory = [...addingEventList, eventSelected];
              let providerAddedToUserHistory = [
                ...addingProviderList,
                provider,
              ]; 
              setMessageUserDataExist("Your data exists in our database due to last events")
              const updateUserEventAttendeed = useMemo(async() => {
                await devitrackApi.put(`/auth/${data.user.id}`, {
                  ...data.user,
                  provider: providerAddedToUserHistory,
                  eventSelected: eventAddedToUserHistory,
                });
              },[])

              setTimeout(() => {
               updateUserEventAttendeed();
              }, 5000)
              
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
            }
          }
        }
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
    messageUserDataExist,

    //* Methods
    startSavingContactInfo,
    startUpdatingContactInfo,
    startCheckingUser,
  };
};
