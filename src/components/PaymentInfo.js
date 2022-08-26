import React, { useMemo, useState } from "react";
import { useUiStore } from "../hooks/useUiStore";
import { ConfirmationModal } from "../ui/ConfirmationModal";
import { useContactInfoStore } from "../hooks/useContactInfoStore";
import { useDeviceCount } from "../hooks/useDeviceCountStore";
import Swal from "sweetalert2";
import { usePaymentStore } from "../hooks/usePaymentStore";

export const PaymentInfo = () => {
  const { openModal } = useUiStore();
  const { startSavingContactInfo } = useContactInfoStore();
  const { startSavingPaymentInfo } = usePaymentStore();

  const {
    amountToDeposit,
    device,
    handleDecreaseDevice,
    handleIncreaseDevice,
    handleResetDevice,
  } = useDeviceCount();

  //

  const initalFormValues = {
    groupName: "",
    name: "",
    lastName: "",
    email: "",
    phoneNumber: "",
  };

  const initalPaymentFormValues = {
    cardName: "",
    cardNumber: "",
    mm: "",
    yy: "",
    cvv: "",
    zip: "",
    country: "",
  };

  const [formValues, setFormValues] = useState(initalFormValues);
  const [paymentFormValues, setPaymentFormValues] = useState(
    initalPaymentFormValues
  );

  const [formSubmitted, setFormSubmitted] = useState(false);

  const onInputCHange = ({ target }) => {
    setFormValues({
      ...formValues,
      [target.name]: target.value,
    });
  };

  const onInputChangePayment = ({ target }) => {
    setPaymentFormValues({
      ...paymentFormValues,
      [target.name]: target.value,
    });
  };

  const validationGroupName = useMemo(() => {
    return formValues.groupName.length > 2 ? "" : "is-invalid";
  }, [formValues.groupName, formSubmitted]);

  const validationName = useMemo(() => {
    return formValues.name.length > 0 ? "" : "is-invalid";
  }, [formValues.name, formSubmitted]);

  const validationLastName = useMemo(() => {
    return formValues.lastName.length > 0 ? "" : "is-invalid";
  }, [formValues.lastName, formSubmitted]);

  const validationEmail = useMemo(() => {
    return formValues.email.length > 3 &&
      formValues.email
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
      ? ""
      : "is-invalid";
  }, [formValues.email, formSubmitted]);

  const validationPhoneNumber = useMemo(() => {
    return formValues.phoneNumber.length > 4 ? "" : "is-invalid";
  }, [formValues.phoneNumber, formSubmitted]);

  const validationCardName = useMemo(() => {
    return paymentFormValues.cardName.length > 2 ? "" : "is-invalid";
  }, [paymentFormValues.cardName, formSubmitted]);

  const validationCardNumber = useMemo(() => {
    return paymentFormValues.cardNumber.length > 12 ? "" : "is-invalid";
  }, [paymentFormValues.cardNumber, formSubmitted]);

  const validationExpirationDateMM = useMemo(() => {
    if (
      paymentFormValues.mm < new Date().getMonth() + 1 &&
      paymentFormValues.yy <= new Date().getFullYear().toString()
    ) {
      return "is-invalid";
    }
  }, [paymentFormValues.mm, paymentFormValues.yy, formSubmitted]);

  const validationExpirationDateYY = useMemo(() => {
    if (paymentFormValues.yy.valueOf() < new Date().getFullYear().toString()) {
      return "is-invalid";
    }
  }, [paymentFormValues.yy, formSubmitted]);

  const validationCvv = useMemo(() => {
    return paymentFormValues.cvv.length > 2 ? "" : "is-invalid";
  }, [paymentFormValues.cvv, formSubmitted]);

  const validationZip = useMemo(() => {
    return paymentFormValues.zip.length > 0 ? "" : "is-invalid";
  }, [paymentFormValues.zip, formSubmitted]);

  const validationCountry = useMemo(() => {
    return paymentFormValues.country.length > 0 ? "" : "is-invalid";
  }, [paymentFormValues.country, formSubmitted]);

  const handleOnSubmit = async (event) => {
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
        text: "Group Name must be provided",
        icon: "error",
        confirmButtonColor: "rgb(30, 115, 190)",
      });
    }
    if (validationLastName === "is-invalid") {
      return Swal.fire({
        title: "",
        text: "Group Name must be provided",
        icon: "error",
        confirmButtonColor: "rgb(30, 115, 190)",
      });
    }
    if (validationEmail === "is-invalid") {
      return Swal.fire({
        title: "",
        text: "Group Name must be provided",
        icon: "error",
        confirmButtonColor: "rgb(30, 115, 190)",
      });
    }
    if (validationPhoneNumber === "is-invalid") {
      return Swal.fire({
        title: "",
        text: "Group Name must be provided",
        icon: "error",
        confirmButtonColor: "rgb(30, 115, 190)",
      });
    }
    if (validationExpirationDateMM === "is-invalid") {
      return Swal.fire({
        title: "",
        text: "Group Name must be provided",
        icon: "error",
        confirmButtonColor: "rgb(30, 115, 190)",
      });
    }
    if (validationExpirationDateYY === "is-invalid") {
      return Swal.fire({
        title: "",
        text: "Group Name must be provided",
        icon: "error",
        confirmButtonColor: "rgb(30, 115, 190)",
      });
    }
    if (validationCardName === "is-invalid") {
      return Swal.fire({
        title: "",
        text: "Group Name must be provided",
        icon: "error",
        confirmButtonColor: "rgb(30, 115, 190)",
      });
    }
    if (validationCardNumber === "is-invalid") {
      return Swal.fire({
        title: "",
        text: "Group Name must be provided",
        icon: "error",
        confirmButtonColor: "rgb(30, 115, 190)",
      });
    }
    if (validationCvv === "is-invalid") {
      return Swal.fire({
        title: "",
        text: "Group Name must be provided",
        icon: "error",
        confirmButtonColor: "rgb(30, 115, 190)",
      });
    }
    if (validationZip === "is-invalid") {
      return Swal.fire({
        title: "",
        text: "Group Name must be provided",
        icon: "error",
        confirmButtonColor: "rgb(30, 115, 190)",
      });
    }
    if (validationCountry === "is-invalid") {
      return Swal.fire({
        title: "",
        text: "Group Name must be provided",
        icon: "error",
        confirmButtonColor: "rgb(30, 115, 190)",
      });
    }

    if (validationCvv === "is-invalid") {
      return Swal.fire({
        title: "",
        text: "Group Name must be provided",
        icon: "error",
        confirmButtonColor: "rgb(30, 115, 190)",
      });
    }

    setFormSubmitted(true);
    await startSavingContactInfo(formValues);
    await startSavingPaymentInfo(paymentFormValues);
    openModal();
  };

  return (
    <>
      <div className="container">
        <form onSubmit={handleOnSubmit}>
          <div
            className="container"
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              width: " 50%",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-evenly",
                marginTop: "5%",
                marginBottom: "2%",
              }}
            >
              <h5>HOW MANY RECEIVERS DO YOU NEED?</h5>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  margin: "0  20px",
                  width: "25%",
                }}
              >
                <button onClick={handleDecreaseDevice}>-</button>
                <div>
                  <strong>{device}</strong>
                </div>
                <button onClick={handleIncreaseDevice}>+</button>
                <button onClick={handleResetDevice}>Reset</button>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-evenly",
                alignItems: "center",
              }}
            >
              <div className="col-4"></div>
              <h5>DEPOSIT TOTAL:</h5>
              <h3>
                <strong>${amountToDeposit}</strong>
              </h3>
            </div>
          </div>

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
                          <div className="col-md-10 m-4 d-flex align-items-center">
                            <div className="form-outline datepicker w-100">
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
                        </div>
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
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
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
                        ENTER YOUR PAYMENT INFORMATION
                      </h3>
                      <div>
                        <div className="row">
                          <div className="col-md-10 m-4">
                            <div className="form-outline">
                              <input
                                type="text"
                                className="form-control  form-control-lg"
                                placeholder="Card name"
                                onChange={onInputChangePayment}
                                name="cardName"
                                value={paymentFormValues.cardName}
                                minLength={3}
                              />
                            </div>
                          </div>
                          <div className="col-md-10 m-4">
                            <div className="form-outline">
                              <input
                                type="text"
                                className="form-control form-control-lg cardNumber"
                                placeholder="Card number"
                                onChange={onInputChangePayment}
                                name="cardNumber"
                                value={paymentFormValues.cardNumber}
                                maxLength={19}
                                minLength={13}
                              />
                            </div>
                          </div>
                          <div className="col-md-10 m-4 d-flex">
                            <div className="col-md-3 m-4">
                              <div className="form-outline">
                                <input

                                  type="number"
                                  className={`form-control ${validationExpirationDateMM}  form-control-lg`}
                                  placeholder="MM"
                                  onChange={onInputChangePayment}
                                  name="mm"
                                  value={paymentFormValues.mm}
                                  maxLength={2}
                                  minLength={2}
                                  min={1}
                                  max={12}
                                />
                              </div>
                            </div>
                            <div className="col-md-3 m-4">
                              <div className="form-outline">
                                <input

                                  type="number"
                                  className={`form-control ${validationExpirationDateYY}  form-control-lg`}
                                  placeholder="YYYY"
                                  onChange={onInputChangePayment}
                                  name="yy"
                                  value={paymentFormValues.yy}
                                  maxLength={4}
                                  minLength={4}
                                  min={new Date().getFullYear()}
                                />
                              </div>
                            </div>
                            <div className="col-md-3 m-4">
                              <div className="form-outline">
                                <input

                                  type="text"
                                  className="form-control  form-control-lg"
                                  placeholder="CVV"
                                  onChange={onInputChangePayment}
                                  name="cvv"
                                  value={paymentFormValues.cvv}
                                  maxLength={4}
                                  minLength={3}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-10 m-4">
                            <div className="form-outline">
                              <input
                                id="zip"
                                type="text"
                                className={`form-control ${validationZip}  form-control-lg`}
                                placeholder="Zip"
                                onChange={onInputChangePayment}
                                name="zip"
                                value={paymentFormValues.zip}
                                minLength={4}
                              />
                            </div>
                          </div>
                          <div className="col-md-10 m-4">
                            <div className="form-outline">
                              <input
                                type="text"
                                className={`form-control ${validationCountry}  form-control-lg`}
                                placeholder="Country"
                                onChange={onInputChangePayment}
                                name="country"
                                value={paymentFormValues.country}
                                minLength={3}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <div>
            <div
              style={{
                width: "40%",
                margin: " 0 auto",
                textAlign: "justify",
                fontSize: "10px",
              }}
            >
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Sit
                amet nisl suscipit adipiscing bibendum est ultricies integer.
              </p>
            </div>
          </div>

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
            SUBMIT AND REQUEST DEVICES
          </button>
        </form>
      </div>

      <ConfirmationModal />
    </>
  );
};
