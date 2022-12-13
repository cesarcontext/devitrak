import React, { useState, useMemo, useEffect } from "react";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useStytchSession, useStytch } from "@stytch/stytch-react";
import { AccordionListPaymentIntent } from "../components/ui/AccordionListPaymentIntent";
import { ContactInfoProfile } from "../components/contact/ContactInfoProfile";
import { Navbar } from "../components/ui/Navbar";
import { NavbarBottom } from "../components/ui/NavbarBottom";
import { ReturnDeviceAlert } from "../components/ui/ReturnDeviceAlert";
import { useContactInfoStore } from "../hooks/useContactInfoStore";
import { useStripeHook } from "../hooks/useStripeHook";
import QRCode from "react-qr-code";

import "../style/pages/myProfile.css";
import "../style/component/ui/NavbarBottom.css";
import { onAddNewContact } from "../store/slices/contactInfoSlice";
import { onUserPrivacyPolicyResponse } from "../store/slices/privacyPolicyUserResponseSlice";
import { reset } from "../store/slices/deviceSlice";

const initalFormValues = {
  groupName: "",
  name: "",
  lastName: "",
  email: "",
  phoneNumber: "",
};

export const MyProfile = () => {
  const { paymentIntent } = useStripeHook();
  const { startUpdatingContactInfo } = useContactInfoStore();
  const [showInfo, setShowInfo] = useState(false);
  const [formValues, setFormValues] = useState(initalFormValues);
  const [buttonState, setButtonState] = useState(true);
  const tokenVerification = localStorage.getItem("token");
  const { users } = useSelector((state) => state.contactInfo);
  const client = useStytch();
  const session = useStytchSession();
  const newUser = users.email;
  const dispatch = useDispatch();

  const onInputCHange = ({ target }) => {
    setFormValues({
      ...formValues,
      [target.name]: target.value,
    });
  };

  const handleButtonState = () => {
    setShowInfo(!showInfo);
  };

  useEffect(() => {
    if (tokenVerification) {
      return setButtonState(false);
    }
  }, [tokenVerification]);

  const validationGroupName = useMemo(() => {
    return formValues.groupName.length > 2 ? "" : "is-invalid";
  }, [formValues.groupName]);

  const validationName = useMemo(() => {
    return formValues.name.length > 0 ? "" : "is-invalid";
  }, [formValues.name]);

  const validationLastName = useMemo(() => {
    return formValues.lastName.length > 0 ? "" : "is-invalid";
  }, [formValues.lastName]);

  const validationEmail = useMemo(() => {
    return formValues.email.length > 3 &&
      formValues.email
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
      ? ""
      : "is-invalid";
  }, [formValues.email]);

  const validationPhoneNumber = useMemo(() => {
    return formValues.phoneNumber.length > 4 ? "" : "is-invalid";
  }, [formValues.phoneNumber]);

  const checkPaymentIntentArray = (info) => {
    if (info.length > 0) {
      const QRCodeValue = info?.at(-1).data?.clientSecret;
      return (
        <>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: "10px",
            }}
          >
            <QRCode
              fgColor="#000"
              bgColor="#ffff"
              level="Q"
              size={100}
              value={QRCodeValue}
            />
          </div>
        </>
      );
    }
    return (
      <QRCode
        fgColor="#000"
        bgColor="#ffff"
        level="Q"
        size={100}
        value="no value returned"
      />
    );
  };
  const handleEditContactInfo = async (event) => {
    event.preventDefault();

    if (validationGroupName === "is-invalid") {
      return Swal.fire({
        title: "",
        text: "Group Name must be provided",
        icon: "error",
        confirmButtonColor: "rgb(30, 115, 190)",
      });
    }
    if (validationName === "is-invalid") {
      return Swal.fire({
        title: "",
        text: "Name must be provided",
        icon: "error",
        confirmButtonColor: "rgb(30, 115, 190)",
      });
    }
    if (validationLastName === "is-invalid") {
      return Swal.fire({
        title: "",
        text: "Last name must be provided",
        icon: "error",
        confirmButtonColor: "rgb(30, 115, 190)",
      });
    }
    if (validationEmail === "is-invalid") {
      return Swal.fire({
        title: "",
        text: "Email must be provided",
        icon: "error",
        confirmButtonColor: "rgb(30, 115, 190)",
      });
    }
    if (validationPhoneNumber === "is-invalid") {
      return Swal.fire({
        title: "",
        text: "Phone number must be provided",
        icon: "error",
        confirmButtonColor: "rgb(30, 115, 190)",
      });
    }
    await startUpdatingContactInfo(formValues);
    setShowInfo(!showInfo);
  };
  const handleLogout = async () => {
    if (session) {
      await client.session.revoke();
    }
    Swal.fire({
      title: `Your session is finished`,
      confirmButtonColor: "rgb(30, 115, 190)",
      showClass: {
        popup: "animate__animated animate__fadeInDown",
      },
      hideClass: {
        popup: "animate__animated animate__fadeOutUp",
      },
    });
    dispatch(
      onAddNewContact({
        id: "",
        groupName: "",
        name: "",
        email: "",
        phoneNumber: "",
        status: "",
      })
    );
    dispatch(onUserPrivacyPolicyResponse());
    dispatch(reset());
  };

  return (
    <div className="general-container">
      <Navbar />
      <div className="container-my-profile-info">
        <div>
          <h3>Account</h3>
        </div>
        <div className="container-box-user-info-detail">
          <div style={{ width: "100%", display: "flex" }}>
            <div className="box-user-detail-buttons">
              {users.id !== "" ? (
                showInfo !== true ? (
                  <>
                    <p
                      disabled={buttonState}
                      id="box-user-detail-edit-button"
                      onClick={handleButtonState}
                    >
                      <h5>
                        EDIT{" "}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="15"
                          height="15"
                          fill="currentColor"
                          className="bi bi-pencil"
                          viewBox="0 0 16 16"
                        >
                          <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
                        </svg>
                      </h5>
                    </p>

                    <Link to="/">
                      <div className="btn-logout-section">
                        {(session && (
                          <button
                            style={{
                              width: "45px",
                              height: "45px",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              borderRadius:"7%",
                              fontSize:"10px",
                              color:"#fff",
                              backgroundColor:"var(--main-colorslobster)"
                            }}
                            // className="btn-logout"
                            onClick={handleLogout}
                          >
                            <strong>Logout</strong>
                          </button>
                        )) ||
                          (newUser && (
                            <button
                              className="btn-logout"
                              onClick={handleLogout}
                            >
                              <strong>Logout</strong>
                            </button>
                          ))}
                      </div>
                    </Link>
                  </>
                ) : (
                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <div className="col">
                      <p
                        className="col"
                        id="box-user-detail-cancel-button"
                        onClick={handleButtonState}
                      >
                        <h5>
                          CANCEL{" "}
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M17 5V4C17 2.89543 16.1046 2 15 2H9C7.89543 2 7 2.89543 7 4V5H4C3.44772 5 3 5.44772 3 6C3 6.55228 3.44772 7 4 7H5V18C5 19.6569 6.34315 21 8 21H16C17.6569 21 19 19.6569 19 18V7H20C20.5523 7 21 6.55228 21 6C21 5.44772 20.5523 5 20 5H17ZM15 4H9V5H15V4ZM17 7H7V18C7 18.5523 7.44772 19 8 19H16C16.5523 19 17 18.5523 17 18V7Z"
                              fill="currentColor"
                            />
                            <path d="M9 9H11V17H9V9Z" fill="currentColor" />
                            <path d="M13 9H15V17H13V9Z" fill="currentColor" />
                          </svg>
                        </h5>
                      </p>
                    </div>
                    <div className="col">
                      <p
                        className="col"
                        id="box-user-detail-save-button"
                        onClick={handleEditContactInfo}
                      >
                        <h5>
                          SAVE{" "}
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="15"
                            height="15"
                            fill="currentColor"
                            className="bi bi-save"
                            viewBox="0 0 16 16"
                          >
                            <path d="M2 1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H9.5a1 1 0 0 0-1 1v7.293l2.646-2.647a.5.5 0 0 1 .708.708l-3.5 3.5a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L7.5 9.293V2a2 2 0 0 1 2-2H14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h2.5a.5.5 0 0 1 0 1H2z" />
                          </svg>
                        </h5>
                      </p>
                    </div>
                  </div>
                )
              ) : null}
            </div>
          </div>
          <div>
            <h5>Your conntact infomartion</h5>
          </div>
          {showInfo !== true ? (
            <div>
              <ContactInfoProfile />
              <hr />
            </div>
          ) : (
            <div className="box-user-edit-info">
              <>
                <input
                  type="text"
                  className={`form-control ${validationGroupName}  form-control-lg`}
                  id="groupName"
                  placeholder="Group name"
                  onChange={onInputCHange}
                  name="groupName"
                  value={formValues.groupName}
                  minLength={3}
                />
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formValues.name}
                  className={`form-control ${validationName} form-control-lg`}
                  placeholder="name"
                  onChange={onInputCHange}
                  minLength={1}
                />
                <input
                  type="text"
                  id="lastName"
                  className={`form-control ${validationLastName} form-control-lg`}
                  placeholder="Last name"
                  onChange={onInputCHange}
                  name="lastName"
                  value={formValues.lastName}
                  minLength={1}
                />
                <input
                  type="email"
                  id="emailAddress"
                  className={`form-control ${validationEmail} form-control-lg`}
                  placeholder="Email"
                  onChange={onInputCHange}
                  name="email"
                  value={formValues.email}
                  minLength={4}
                />
                <input
                  type="tel"
                  id="phoneNumber"
                  className={`form-control ${validationPhoneNumber} form-control-lg phoneNumber`}
                  placeholder="Phone number"
                  onChange={onInputCHange}
                  name="phoneNumber"
                  value={formValues.phoneNumber}
                  maxLength={15}
                  minLength={5}
                />
              </>
            </div>
          )}
          <div className="container-box-user-info-detail-qrcode">
            {checkPaymentIntentArray(paymentIntent)}
          </div>
        </div>
        {/* 
        //*section commented while the function to render receivers with status true only */}
        <div className="container-device-alert">
          <ReturnDeviceAlert />
        </div>
        <div className="container-device-accordion-List">
          <div>
            <h3>Your devices</h3>
            <span>All the devices with checkmarks are now returned</span>
          </div>
          <div>
            <AccordionListPaymentIntent />
          </div>
        </div>
      </div>
      <NavbarBottom />
    </div>
  );
};
