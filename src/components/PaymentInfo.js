import React, { useMemo, useState } from "react";
import { useUiStore } from "../hooks/useUiStore";
import { ConfirmationModal } from "../ui/ConfirmationModal";
import { useContactInfoStore } from "../hooks/useContactInfoStore";
import { useDeviceCount } from "../hooks/useDeviceCount";

export const PaymentInfo = () => {
  const { openModal } = useUiStore();

  const {
    amountToDeposit,
    device,
    handleDecreaseDevice,
    handleIncreaseDevice,
    handleResetDevice,
  } = useDeviceCount();

  //
  const { startSavingContactInfo } = useContactInfoStore();

  const initalFormValues = {
    groupName: "",
    name: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    cardName: "",
    cardNumber: "",
    mm: "",
    yy: "",
    cvv: "",
    zip: "",
    country: "",
  };

  const [formValues, setFormValues] = useState(initalFormValues);

  const [formSubmitted, setFormSubmitted] = useState(false);

  const onInputCHange = ({ target }) => {
    setFormValues({
      ...formValues,
      [target.name]: target.value,
    });
  };

  const validation = useMemo(() => {
    if (!formSubmitted) return "";

    if (formValues.groupName.length < 0) {
      return "is-invalid";
    }
    if (formValues.name.length < 0) {
      return "is-invalid";
    }
    if (formValues.lastName.length < 0) {
      return "is-invalid";
    }
    if (formValues.email.length < 0) {
      return "is-invalid";
    }
    if (formValues.phoneNumber.length < 0) {
      return "is-invalid";
    }
    if (formValues.cardName.length < 0) {
      return "is-invalid";
    }
    if (formValues.cardNumber.length < 0) {
      return "is-invalid";
    }
    if (formValues.mm.length < 0) {
      return "is-invalid";
    }
    if (formValues.yy.length < 0) {
      return "is-invalid";
    }
    if (formValues.cvv.length < 0) {
      return "is-invalid";
    }
    if (formValues.zip.length < 0) {
      return "is-invalid";
    }
    if (formValues.country.length < 0) {
      return "is-invalid";
    }
  }, [formSubmitted]);

  const handleOnSubmit = async (event) => {
    event.preventDefault();
    setFormSubmitted(true);
    await startSavingContactInfo(formValues);
    openModal();
  };

  return (
    <>
      <div style={{ height: "100%", marginBottom: "18vh" }}>
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
                                className="form-control  form-control-lg"
                                id="groupName"
                                placeholder="Group name"
                                onChange={onInputCHange}
                                name="groupName"
                                value={formValues.groupName}
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
                                className="form-control  form-control-lg"
                                placeholder="First name"
                                onChange={onInputCHange}
                              />
                            </div>
                          </div>
                          <div className="col-md-10 m-4">
                            <div className="form-outline">
                              <input
                                type="text"
                                id="lastName"
                                className="form-control  form-control-lg"
                                placeholder="Last name"
                                onChange={onInputCHange}
                                name="lastName"
                                value={formValues.lastName}
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
                                className="form-control  form-control-lg"
                                placeholder="Email"
                                onChange={onInputCHange}
                                name="email"
                                value={formValues.email}
                              />
                            </div>
                          </div>
                          <div className="col-md-10 m-4 pb-2">
                            <div className="form-outline">
                              <input
                                type="tel"
                                id="phoneNumber"
                                className="form-control  form-control-lg"
                                placeholder="Phone number"
                                onChange={onInputCHange}
                                name="phoneNumber"
                                value={formValues.phoneNumber}
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
                                id=""
                                placeholder="Card name"
                                onChange={onInputCHange}
                                name="cardName"
                                value={formValues.cardName}
                              />
                            </div>
                          </div>
                          <div className="col-md-10 m-4">
                            <div className="form-outline">
                              <input
                                type="text"
                                className="form-control  form-control-lg"
                                id=""
                                placeholder="Card number"
                                onChange={onInputCHange}
                                name="cardNumber"
                                value={formValues.cardNumber}
                              />
                            </div>
                          </div>
                          <div className="col-md-10 m-4 d-flex">
                            <div className="col-md-2 m-4">
                              <div className="form-outline">
                                <input
                                  type="text"
                                  className="form-control  form-control-lg"
                                  id=""
                                  placeholder="MM"
                                  onChange={onInputCHange}
                                  name="mm"
                                  value={formValues.mm}
                                />
                              </div>
                            </div>
                            <div className="col-md-2 m-4">
                              <div className="form-outline">
                                <input
                                  type="text"
                                  className="form-control  form-control-lg"
                                  id=""
                                  placeholder="YYYY"
                                  onChange={onInputCHange}
                                  name="yy"
                                  value={formValues.yy}
                                />
                              </div>
                            </div>
                            <div className="col-md-2 m-4">
                              <div className="form-outline">
                                <input
                                  type="text"
                                  className="form-control  form-control-lg"
                                  id=""
                                  placeholder="CVV"
                                  onChange={onInputCHange}
                                  name="cvv"
                                  value={formValues.cvv}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-10 m-4">
                            <div className="form-outline">
                              <input
                                type="text"
                                className="form-control  form-control-lg"
                                id=""
                                placeholder="Zip"
                                onChange={onInputCHange}
                                name="zip"
                                value={formValues.zip}
                              />
                            </div>
                          </div>
                          <div className="col-md-10 m-4">
                            <div className="form-outline">
                              <input
                                type="text"
                                className="form-control  form-control-lg"
                                id=""
                                placeholder="Country"
                                onChange={onInputCHange}
                                name="country"
                                value={formValues.country}
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
