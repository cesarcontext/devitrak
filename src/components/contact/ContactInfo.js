import React, { useEffect, useMemo, useState } from "react";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
import { MagicLink } from "../passwordless/MagicLink";
import { useContactInfoStore } from "../../hooks/useContactInfoStore";
import { NavbarBottom } from "../ui/NavbarBottom";
import { useDeviceCount } from "../../hooks/useDeviceCountStore";
import { StripeCheckoutElement } from "../stripe/StripeCheckoutElement";
import { Devices } from "../device/Devices";
import { useStripeHook } from "../../hooks/useStripeHook";
import "../../style/component/contact/contactInfo.css";

export const ContactInfo = () => {
  const {
    startSavingContactInfo,
    startCheckingUser,
    users,
    token,
    visible,
    visibleButton,
    userCreatedDisabledInput,
  } = useContactInfoStore();
  const { response } = useSelector((state) => state.privacyPolicyUserResponse);
  const { device } = useDeviceCount();
  const { startStripePaymentIntent, clientSecret, stripeCustomer } =
    useStripeHook();

  const initalFormValues = {
    groupName: "",
    name: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    privacyPolicy: response,
  };
  const [formValues, setFormValues] = useState(initalFormValues);

  const onInputCHange = ({ target }) => {
    setFormValues({
      ...formValues,
      [target.name]: target.value,
    });
  };
  useEffect(() => {
    startCheckingUser(formValues.email);
  }, [formValues.email]);

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

    if (device === 0) {
      return Swal.fire({
        title: "",
        text: "Please select the number of receiver you need before to continue",
        icon: "error",
        confirmButtonColor: "rgb(30, 115, 190)",
      });
    }
    await startSavingContactInfo({
      ...formValues,
      privacyPolicy: true,
    });
    await startStripePaymentIntent(device);
    await stripeCustomer(formValues);
  };

  return (
    <>
      <div className="container-contact-info mt-4">
        <section className="gradient-custom">
          <div className="container">
            <div className="row justify-content-center align-items-center">
              <div className="col-12 col-lg-9 col-xl-7">
                <div
                  className="card shadow-2-strong card-registration"
                  style={{ bordeRadius: "15px" }}
                >
                  {token.length < 1 ? (
                    <Devices handleOnSubmit={handleOnSubmit} />
                  ) : (
                    ""
                  )}

                  <div className="card-body p-4 p-md-5">
                    <h3 className="mb-4 pb-2 pb-md-0 mb-md-5">
                      ENTER YOUR CONTACT INFORMATION
                    </h3>
                    <div className="row">
                      <form>
                        <div className="col-md-11 m-4">
                          <div className="form-outline">
                            <input
                              disabled={userCreatedDisabledInput}
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
                        <div className="col-md-11 m-4 mb-0">
                          <div className="form-outline">
                            <input
                              disabled={userCreatedDisabledInput}
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
                      </form>
                      {users.status === true ? (
                        <div
                          style={{
                            padding: "40px",
                          }}
                        >
                          <MagicLink magicLinkParam={magicLinkParam} />
                        </div>
                      ) : (
                        <>
                          <form onSubmit={handleOnSubmit}>
                            <div className="col-md-11 m-4">
                              <div className="form-outline">
                                <input
                                  disabled={userCreatedDisabledInput}
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
                            <div className="col-md-11 m-4">
                              <div className="form-outline">
                                <input
                                  disabled={userCreatedDisabledInput}
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
                            <div className="col-md-11 m-4">
                              <div className="form-outline">
                                <input
                                  disabled={userCreatedDisabledInput}
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
                          </form>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {formValues.phoneNumber.length < 5 ? (
          <></>
        ) : (
          <div className={`d-${visibleButton}`} style={{ paddingTop: "1vh" }}>
            <button
              className="btn-confirm-user-data"
              style={{
                margin: "auto",
                backgroundColor: "rgba(69, 104, 220, 1)",
                color: "#ffff",
                height: "5vh",
                borderRadius: "10px",
                outline: "transparency",
                border: "rgba(69, 104, 220, 1)",
                width: "56%",
              }}
              onClick={handleOnSubmit}
            >
              Looks right?
            </button>
          </div>
        )}

        <div
          style={{ gap: "20px" }}
          className={`d-${visible} stripe-container-contact-info-section`}
        >
          <StripeCheckoutElement clientSecret={clientSecret} />
        </div>
      </div>
      <NavbarBottom />
    </>
  );
};
