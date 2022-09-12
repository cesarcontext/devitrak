import React, { useMemo, useState } from "react";
import Swal from "sweetalert2";
import { useContactInfoStore } from "../hooks/useContactInfoStore";
import { usePaymentStore } from "../hooks/usePaymentStore";
import { useUiStore } from "../hooks/useUiStore";
import { useDeviceCount } from "../hooks/useDeviceCountStore";

export const Forms = () => {
  const { startVerificationContactInfoBeforeSaveIt, startCheckingUser } =
    useContactInfoStore();
  const { startVerificationCreditCardInfoBeforeSaveIt } = usePaymentStore();
  const { openModal } = useUiStore();

  const {
    amountToDeposit,
    device,
    handleDecreaseDevice,
    handleIncreaseDevice,
    handleResetDevice,
  } = useDeviceCount();

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

  const validationCardName = useMemo(() => {
    return paymentFormValues.cardName.length > 2 ? "" : "is-invalid";
  }, [paymentFormValues.cardName]);

  const validationCardNumber = useMemo(() => {
    return paymentFormValues.cardNumber.length > 12 &&
      paymentFormValues.cardNumber.match(/^\d+$/)
      ? ""
      : "is-invalid";
  }, [paymentFormValues.cardNumber]);

  const validationExpirationDateMM = useMemo(() => {
    if (
      paymentFormValues.mm < new Date().getMonth() + 1 &&
      paymentFormValues.yy <= new Date().getFullYear().toString()
    ) {
      return "is-invalid";
    }
  }, [paymentFormValues.mm, paymentFormValues.yy]);

  const validationExpirationDateYY = useMemo(() => {
    if (paymentFormValues.yy.valueOf() < new Date().getFullYear().toString()) {
      return "is-invalid";
    }
  }, [paymentFormValues.yy]);

  const validationCvv = useMemo(() => {
    return paymentFormValues.cvv.length > 2 ? "" : "is-invalid";
  }, [paymentFormValues.cvv]);

  const validationZip = useMemo(() => {
    return paymentFormValues.zip.length > 0 ? "" : "is-invalid";
  }, [paymentFormValues.zip]);

  const validationCountry = useMemo(() => {
    return paymentFormValues.country.length > 0 ? "" : "is-invalid";
  }, [paymentFormValues.country]);

  const creditCard = paymentFormValues.cardNumber;

  const creditCardLength = () => {
    const result = creditCard.slice(0, 2);

    switch (result) {
      case "34":
        return 15;
      case "37":
        return 15;
      case "36":
        return 19;
      case "54":
        return 19;
      case "60":
        return 19;
      case "51":
        return 16;
      case "55":
        return 16;
      case "22":
        return 16;
      case "27":
        return 16;
      case "40":
        return 16;
      case "41":
        return 16;
      case "42":
        return 16;
      case "43":
        return 16;
      case "44":
        return 16;
      case "45":
        return 16;
      case "46":
        return 16;
      case "47":
        return 16;
      case "48":
        return 16;
      case "49":
        return 16;

      default:
        return 19;
    }
  };

  const maxLengthAttribute = creditCardLength(creditCard);

  const CVVLength = () => {
    const result = creditCard.slice(0, 2);

    switch (result) {
      case "34":
        return 4;
      case "37":
        return 4;
      default:
        return 3;
    }
  };

  const CVVMaxLength = CVVLength(creditCard);

  const checkEmailUser = (event) => {
    console.log({ event });

    startCheckingUser(event);
  };

  console.log(formValues.email);
  startCheckingUser(formValues.email);


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
    if (validationExpirationDateMM === "is-invalid") {
      return Swal.fire({
        title: "",
        text: "Please provide a valid expiration date",
        icon: "error",
        confirmButtonColor: "rgb(30, 115, 190)",
      });
    }
    if (validationExpirationDateYY === "is-invalid") {
      return Swal.fire({
        title: "",
        text: "Please provide a valid expiration date",
        icon: "error",
        confirmButtonColor: "rgb(30, 115, 190)",
      });
    }
    if (validationCardName === "is-invalid") {
      return Swal.fire({
        title: "",
        text: "Card name must be provided",
        icon: "error",
        confirmButtonColor: "rgb(30, 115, 190)",
      });
    }
    if (validationCardNumber === "is-invalid") {
      return Swal.fire({
        title: "",
        text: "Card number format is not valid",
        icon: "error",
        confirmButtonColor: "rgb(30, 115, 190)",
      });
    }
    if (validationCvv === "is-invalid") {
      return Swal.fire({
        title: "",
        text: "CVV must be provided",
        icon: "error",
        confirmButtonColor: "rgb(30, 115, 190)",
      });
    }
    if (validationZip === "is-invalid") {
      return Swal.fire({
        title: "",
        text: "Zip code must be provided",
        icon: "error",
        confirmButtonColor: "rgb(30, 115, 190)",
      });
    }
    if (validationCountry === "is-invalid") {
      return Swal.fire({
        title: "",
        text: "Country must be provided",
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

    startVerificationContactInfoBeforeSaveIt(formValues);
    startVerificationCreditCardInfoBeforeSaveIt(paymentFormValues);
    openModal();
  };

  return (
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
                            {/* <button onClick={checkEmailUser}>check</button> */}
                          </div>
                        </div>
                        {formValues.email.length < 1 ? (
                          ""
                        ) : (
                          <>
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
                            <div className="row">
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
                              type="tel"
                              className="form-control form-control-lg cardNumber"
                              placeholder="Card number"
                              onChange={onInputChangePayment}
                              name="cardNumber"
                              value={paymentFormValues.cardNumber}
                              maxLength={maxLengthAttribute}
                              minLength={13}
                            />
                          </div>
                        </div>
                        <div
                          style={{
                            display: "flex",
                          }}
                        >
                          <div className="col-md-4 m-4">
                            <div className="form-outline">
                              <input
                                type="number"
                                className={`form-control ${validationExpirationDateMM}  form-control-lg`}
                                placeholder="MM"
                                onChange={onInputChangePayment}
                                name="mm"
                                value={paymentFormValues.mm}
                                minLength={2}
                                min={1}
                                max={12}
                              />
                            </div>
                          </div>
                          <div className="col-md-5 m-4 mr-4">
                            <div className="form-outline">
                              <input
                                type="tel"
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
                        </div>
                        <div className="col-md-4 m-4">
                          <div className="form-outline">
                            <input
                              type="tel"
                              className="form-control  form-control-lg"
                              placeholder="CVV"
                              onChange={onInputChangePayment}
                              name="cvv"
                              value={paymentFormValues.cvv}
                              maxLength={CVVMaxLength}
                              minLength={3}
                            />
                          </div>
                        </div>
                        <div className="col-md-5 m-4">
                          <div className="form-outline">
                            <input
                              id="zip"
                              type="tel"
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
  );
};
