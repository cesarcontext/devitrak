import React, { useEffect, useMemo, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { Devices } from "../device/Devices";
import { MagicLink } from "../passwordless/MagicLink";
import { NavbarBottom } from "../ui/NavbarBottom";
import { swalErrorMessage } from "../../helper/swalFireMessage";
import { useContactInfoStore } from "../../hooks/useContactInfoStore";
import { useDeviceCount } from "../../hooks/useDeviceCountStore";
import { useStripeHook } from "../../hooks/useStripeHook";
import { blockLinks } from "../../store/slices/uiSlice";
import "../../style/component/contact/contactInfo.css";

export const ContactInfo = () => {
  const {
    startSavingContactInfo,
    startCheckingUser,
    // token,
    userCreatedDisabledInput,
    users,
    visibleButton,
  } = useContactInfoStore();
  const { response } = useSelector((state) => state.privacyPolicyUserResponse);
  const { device } = useDeviceCount();
  const { stripeCustomer } = useStripeHook();
  const dispatch = useDispatch();
  const initalFormValues = {
    email: "",
    groupName: "",
    lastName: "",
    name: "",
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
  }, [formValues.email]); // eslint-disable-next-line react-hooks/exhaustive-deps

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
      return swalErrorMessage("Name must be provided");
    }
    if (validationLastName === "is-invalid") {
      return swalErrorMessage("lastname must be provided");
    }
    if (validationEmail === "is-invalid") {
      return swalErrorMessage("Email must be provided");
    }
    if (validationPhoneNumber === "is-invalid") {
      return swalErrorMessage("Phone number must be provided");
    }

    if (device === 0) {
      return swalErrorMessage(
        "Please select the number of receiver you need before to continue"
      );
    }
    await startSavingContactInfo({
      ...formValues,
      privacyPolicy: true,
    });
    // await startStripePaymentIntent(device);
    await stripeCustomer(formValues);
    // setTrigger(true); //*trigger action to notify user about the account creation
    // magicLinkNewUser(magicLinkParam);
    // navigate("/checkout")

  };

  if (users.status === true) {
    dispatch(blockLinks("none"));
  } else {
    dispatch(blockLinks("auto"));
  }

  return (
    <>
      <div className="container-contact-info mt-4">
        <div>
          {/* {token.length < 1 ? <Devices handleOnSubmit={handleOnSubmit} /> : ""} */}
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
                    className={`form-control form-control-lg`}
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

        {formValues.phoneNumber.length < 5 ||
        (formValues.phoneNumber.length > 5 && users.status === true) ? (
          <></>
        ) : (
          <div className={`d-${visibleButton}`} style={{ paddingTop: "1vh" }}>
            <button
              className="btn btn-create"
              style={{
                margin: "auto",
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

        {/* <div
          style={{ gap: "20px" }}
          className={`d-${visible} stripe-container-contact-info-section`}
        >
          <StripeCheckoutElement clientSecret={clientSecret} />
        </div> */}
      </div>
      {/* <div className="d-none">
        <WelcomeEmail formValues={formValues} trigger={trigger} />
      </div> */}
      <NavbarBottom />
    </>
  );
};
