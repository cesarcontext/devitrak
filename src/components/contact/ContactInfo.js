
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MagicLink } from "../passwordless/MagicLink";
import { NavbarBottom } from "../ui/NavbarBottom";
import { swalErrorMessage } from "../../helper/swalFireMessage";
import { useContactInfoStore } from "../../hooks/useContactInfoStore";
import { useStripeHook } from "../../hooks/useStripeHook";
// import { blockLinks } from "../../store/slices/uiSlice";
import "../../style/component/contact/contactInfo.css";
import { useNavigate } from "react-router-dom";


/**
 * ContactInfo - 
 * @description component to collect user info 
 * @component
 * @returns {HTMLBodyElement}
 */
export const ContactInfo = () => {
  const { startSavingContactInfo, startCheckingUser, users, visibleButton } =
    useContactInfoStore();

  const { response } = useSelector((state) => state.privacyPolicyUserResponse);
  const { stripeCustomer } = useStripeHook();
  const dispatch = useDispatch();

  /**
   * form to create user
   * @typedef {Object} initialForm - form to create an user
   * @property {string} email - user email
   * @property {string} [groupName] - name of the group of the user (optional)
   * @property {string} lastName name - user last name
   * @property {string} name - user name
   * @property {string} phoneNumber number - user phone number
   * @property {string} category - user category already defined
   * @property {boolean} privacyPolicy privacy policy response  - user response pre defined
   *
   */

  /**
   * @type {initialForm}
   */
  const initalFormValues = {
    email: "",
    groupName: "",
    lastName: "",
    name: "",
    phoneNumber: "",
    category: "Regular",
    privacyPolicy: response,
  };
  const [formValues, setFormValues] = useState(initalFormValues);
  const navigate = useNavigate();

  const onInputCHange = ({ target }) => {
    setFormValues({
      ...formValues,
      [target.name]: target.value,
    });
  };

  useEffect(() => {
    startCheckingUser(formValues.email);
  }, [formValues.email]);
/**
 * validationName - useMemo
 * @callback validationName - the callback that handles the response.
 * @returns {String} 
 */
  const validationName = useMemo(() => {
    return formValues.name.length > 0 ? "" : "is-invalid";
  }, [formValues.name]);
/**
 * validationLastName - useMemo
 * @callback validationLastName - the callback that handles the response.
 * @returns {String} 
 */

  const validationLastName = useMemo(() => {
    return formValues.lastName.length > 0 ? "" : "is-invalid";
  }, [formValues.lastName]);

  /**
 * validationEmail - useMemo
 * @callback validationEmail - the callback that handles the response.
 * @returns {String} 
 */

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

  /**
 * validationPhoneNumber - useMemo
 * @callback validationPhoneNumber - the callback that handles the response.
 * @returns {String} 
 */

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

/**
 * hooks imported to pass values needed to create user in database
 */
    await startSavingContactInfo({
      ...formValues,
      privacyPolicy: true,
    });

    /**
 * hooks imported to pass values needed to create customer in stripe
 */
    await stripeCustomer(formValues);
    navigate("/checkout");
  };

  // if (users.status === true) {
  //   dispatch(blockLinks("auto"));
  // } else {
  //   dispatch(blockLinks("auto"));
  // }
  
  return (
    <>
      <div className="container-contact-info mt-4">
        <div>
          <div className="row">
            <form>
              <div className="container-input">
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <p className="paragraph">ENTER YOUR CONTACT INFORMATION</p>
                  <p style={{ fontSize: "12px" }}>
                    If you have already made an order and need to request more
                    devices, just enter your email address in the field below
                    and click on the link that will appear to make the new
                    request with your current account.
                  </p>
                </div>
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
              {users.status === true ? (
                <div>
                  {/**
                   * @type {IntrinsicAttributes}
                   */}
                  <MagicLink magicLinkParam={magicLinkParam} />
                </div>
              ) : null}
              <div className="container-input">
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
              <div className="container-input">
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
              <div className="container-input">
                <div className="form-outline">
                  <input
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
                    type="tel"
                    id="phoneNumber"
                    className={`form-control ${validationPhoneNumber} form-control-lg phoneNumber`}
                    placeholder="Phone number | example: 100000000 or 5500000000000"
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
              Submit
            </button>
          </div>
        )}
      </div>
      <NavbarBottom />
    </>
  );
};
