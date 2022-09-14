import React, { useEffect, useMemo, useState } from "react";
import Swal from "sweetalert2";
import { useContactInfoStore } from "../hooks/useContactInfoStore";
import { useUiStore } from "../hooks/useUiStore";
import { Checkout } from "../page/Checkout";
import { MagicLink } from "./MagicLink";

export const ContactInfo = () => {
  const { startSavingContactInfo, startCheckingUser, users } =
    useContactInfoStore();

  const initalFormValues = {
    groupName: "",
    name: "",
    lastName: "",
    email: "",
    phoneNumber: "",
  };

  const [formValues, setFormValues] = useState(initalFormValues);
  const [status, setStatus] = useState(false);
  const [proceed, setProceed] = useState(false);
  const [visible, setVisible] = useState("none")

  const onInputCHange = ({ target }) => {
    setFormValues({
      ...formValues,
      [target.name]: target.value,
    });
  };

  useEffect(() => {
    localStorage.clear();
    formValues.name = "";
  }, [formValues.email]);

  useEffect(() => {
    startCheckingUser(formValues.email);
  }, [formValues.email]);

  useEffect(() => {
    users.map((item) => {
      if (item.status === "") {
        return setStatus(false);
      } else {
        return setStatus(item.status);
      }
    });
  }, [formValues.name]);

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

  const magicLinkParam = formValues.email;


  const handleOnSubmit = async (event) => {
    event.preventDefault();

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

    startSavingContactInfo(formValues);
    setProceed(!proceed);
    setVisible("content")

  };

  return (
    <div className="container">
      <section className="gradient-custom">
        <div className="container py-5 h-100">
          <div className="row justify-content-center align-items-center">
            <div className="col-12 col-lg-9 col-xl-7">
              <div
                className="card shadow-2-strong card-registration"
                style={{ bordeRadius: "15px" }}
              >
                <div className="card-body p-4 p-md-5">
                  <h3 className="mb-4 pb-2 pb-md-0 mb-md-5">
                    ENTER YOUR CONTACT INFORMATION
                  </h3>
                  <div>
                    <div className="row">
                      <div className="col-md-10 m-4 pb-2">
                        <div className="form-outline">
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
                        </div>
                      </div>
                      <div className="col-md-10 m-4">
                        <div className="form-outline">
                          <input
                            type="text"
                            id="firstName"
                            name="name"
                            value={formValues.name}
                            className={`form-control ${validationName} form-control-lg`}
                            placeholder="First name"
                            onChange={onInputCHange}
                            minLength={1}
                          />
                        </div>
                      </div>

                      {formValues.email.length > 1 && status === true ? (
                        <MagicLink magicLinkParam={magicLinkParam} />
                      ) : (
                        <>
                          <form onSubmit={handleOnSubmit}>
                            <div className="col-md-10 m-4">
                              <div className="form-outline">
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
                              </div>
                            </div>
                            <div className="col-md-10 m-4 d-flex align-items-center">
                              <div className="form-outline datepicker w-100">
                                <input
                                  type="text"
                                  className={`form-control form-control-lg`} //${validationGroupName}
                                  id="groupName"
                                  placeholder="Group name"
                                  onChange={onInputCHange}
                                  name="groupName"
                                  value={formValues.groupName}
                                  minLength={3}
                                />
                              </div>
                            </div>
                            <div className="col-md-10 m-4 pb-2">
                              <div className="form-outline">
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
                              </div>
                            </div>
                            {formValues.phoneNumber.length < 4 ? (
                              <></>
                            ) : (
                              <button
                                style={{
                                  margin: "auto",
                                  backgroundColor: "rgba(69, 104, 220, 1)",
                                  color: "#ffff",
                                  height: "5vh",
                                  borderRadius: "10px",
                                  outline: "transparency",
                                  border: "rgba(69, 104, 220, 1)",
                                }}
                                type="submit"
                              >
                                Looks right?
                              </button>
                            )}
                          </form>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className={`d-${visible}`}><Checkout/></div>
    </div>
  );
};
