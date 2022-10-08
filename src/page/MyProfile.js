import React, { useState, useMemo, useEffect } from "react";
import Swal from "sweetalert2";
import { Accordion } from "../components/ui/Accordion";
import { ContactInfoProfile } from "../components/contact/ContactInfoProfile";
import { NavbarBottom } from "../components/ui/NavbarBottom";
import { ReturnDeviceAlert } from "../components/ui/ReturnDeviceAlert";
import { useContactInfoStore } from "../hooks/useContactInfoStore";
import { Navbar } from "../components/ui/Navbar";
import { useStripeHook } from "../hooks/useStripeHook";
import QRCode from "react-qr-code";

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

    const QRCodeValue = info.at(-1).data.clientSecret
    if (info.length > 0) {
      return (
        <>
          <div>
            <h5>Show QR Code to claim your devices</h5>
          </div>
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
              size={150}
              value={QRCodeValue}
            />
          </div>
        </>
      );
    }
    return;
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

  return (
    <>
      <Navbar />
      <div
        className="my_profile_info"
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItem: "center",
          height: "calc(100vh - 16vh)",
        }}
      >
        <div
          style={{
            margin: "20px",
          }}
        >
          <div>
            <h3>Account</h3>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItem: "center",
            }}
          >
            <div
              style={{
                width: "30%",
                height: "80%",
                margin: "0 auto",
                border: "solid 1px #212529",
                borderRadius: "15px",
              }}
            >
              <div
                className=""
                style={{
                  display: "flex",
                  justifyContent: "start",
                  alignItem: "center",
                }}
              >
                {showInfo !== true ? (
                  <button
                    disabled={buttonState}
                    style={{
                      width: "25%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: "15px 0 ",
                      borderRight: "transparent",
                      borderTop: "transparent",
                      border: "solid 1px #212529",
                    }}
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
                  </button>
                ) : (
                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <button
                      onClick={handleButtonState}
                      style={{
                        width: "25%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: "15px 0",
                        borderLeft: "transparent",
                        borderTop: "transparent",
                        border: "solid 1px #212529",
                      }}
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
                    </button>
                    <button
                      onClick={handleEditContactInfo}
                      style={{
                        width: "25%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: "0 15px",
                        borderRight: "transparent",
                        borderTop: "transparent",
                        border: "solid 1px #212529",
                      }}
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
                    </button>
                  </div>
                )}
              </div>
              <div>
                <h5>Your conntact infomartion</h5>
              </div>
              {showInfo !== true ? (
                <div>
                  <ContactInfoProfile />
                </div>
              ) : (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <>
                    <input
                      style={{
                        width: "50%",
                      }}
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
                      style={{
                        width: "50%",
                      }}
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
                      style={{
                        width: "50%",
                      }}
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
                      style={{
                        width: "50%",
                      }}
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
                      style={{
                        width: "50%",
                      }}
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
              <hr style={{ width: "0%" }} />
              {checkPaymentIntentArray(paymentIntent)}
            </div>
          </div>
          <ReturnDeviceAlert />
          <div
            style={{
              width: "55%",
              height: "40vh",
              margin: "0 auto",
            }}
          >
            <div>
              <h3>Your devices</h3>
              <span>All the devices with checkmarks are now returned</span>
            </div>
            <Accordion />
          </div>
        </div>
      </div>
      <NavbarBottom />
    </>
  );
};
