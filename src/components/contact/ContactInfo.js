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
        <div>
          {token.length < 1 ? <Devices handleOnSubmit={handleOnSubmit} /> : ""}
          <div className="row">
            <form>
              <div className="container-input">
                <p className="paragraph">ENTER YOUR CONTACT INFORMATION</p>
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
              {users.status === true ? (
              <div>
                <MagicLink magicLinkParam={magicLinkParam} />
              </div>
            ) : null}
              <div className="container-input">
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
              <div className="container-input">
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
                  <div className="container-input">
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
                  <div className="container-input">
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
          </div>
        </div>

        {formValues.phoneNumber.length < 5 ? (
          <></>
        ) : (
          <div className={`d-${visibleButton}`} style={{ paddingTop: "1vh" }}>
            <button
              className="btn btn-confirm-user-data"
              style={{
                margin: "auto",
                backgroundColor: "rgba(69, 104, 220, 1)",
                color: "#ffff",
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
