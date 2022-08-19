import React, { useState } from "react";
import { useUiStore } from "../hooks/useUiStore";
import { ConfirmationModal } from "../ui/ConfirmationModal";
import { useDispatch, useSelector } from "react-redux";
import { decrement, increment, reset } from "../store/slices/deviceSlice";
import { useContactInfoStore } from "../hooks/useContactInfoStore";
import { usePaymentInfoStore } from "../hooks/usePaymentInfoStore";
import { ElementStripe } from "../stripe/ElementStripe";

export const Home = () => {

  const device = useSelector((state) => state.device.value);

  localStorage.setItem("device", device);

  const dispatch = useDispatch();

  const { startSavingContactInfo } = useContactInfoStore();

  const initalFormValues = {
    groupName: "",
    name: "",
    lastName: "",
    email: "",
    phoneNumber: "",
  };

  const [formValues, setFormValues] = useState(initalFormValues);

  const onInputCHange = ({ target }) => {
    setFormValues({
      ...formValues,
      [target.name]: target.value,
    });
  };

  const { openModal } = useUiStore();

  const handleIncreaseDevice = (event) => {
    event.preventDefault();
    dispatch(increment());
  };

  const handleDecreaseDevice = (event) => {
    event.preventDefault();
    dispatch(decrement());
  };

  const handleResetDevice = (event) => {
    event.preventDefault();
    dispatch(reset());
  };

  if (device < 1) {
    dispatch(reset());
  }

  const amountToDeposit = device * 200;

  const handleOnSubmit = async (event) => {
    event.preventDefault();

    if (formValues.groupName.length <= 0) {
      return;
    }

    if (formValues.name.length <= 0) {
      return;
    }
    if (formValues.lastName.length <= 0) {
      return;
    }
    if (formValues.email.length <= 0) {
      return;
    }
    if (formValues.phoneNumber.length <= 0) {
      return;
    }

    await startSavingContactInfo(formValues);
    // await startSavingPaymentInfo()
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
                                className="form-control form-control-lg"
                                id="birthdayDate"
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
                                className="form-control form-control-lg"
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
                                className="form-control form-control-lg"
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
                                className="form-control form-control-lg"
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
                                className="form-control form-control-lg"
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
          <section 
          className="gradient-custom" 
          style={{
            marginTop: "-3%"
          }}>
            <div className="container py-5 h-100">
              <div className="row justify-content-center align-items-center">
                <div className="col-12 col-lg-9 col-xl-7">
                  <div
                    className="card shadow-2-strong card-registration"
                    style={{ bordeRadius: "15px" }}
                  >
                    <div className="card-body p-4 p-md-5">
                      <h3>ENTER YOUR CREDIT CARD INFORMATION</h3>
                      <>
                        <div className="container mt-2 px-5">
                          <div className="row">
                            {/* <Elements options={options} stripe={stripePromise}>
                              <CardElement />
                            </Elements> */}
                            
                            <h6 className="text-uppercase">Payment details</h6>
                            <div className="row">
                            <ElementStripe />
                              {/* <div className="col-md-11 m-4 pb-2">
                                <div className="form-outline">
                                  <input
                                    type="text"
                                    className="form-control form-control-lg"
                                    placeholder="Name on card"
                                    name="nameOnCard"
                                    required="required"
                                    />
                                </div>
                              </div> */}
                              {/* <div className="col-md-11 m-4 pb-2">
                                <div className="form-outline">
                                  <input
                                    type="text"
                                    className="form-control form-control-lg"
                                    placeholder="Credit card numbers"
                                    required="required"
                                    name="creditCardNumber"

                                  />
                                </div>
                              </div> */}
                            </div>
                            {/* <div className="row">
                              <div className="col-md-5 m-2 pb-2">
                                <div className="form-outline col-md-5">
                                  <input
                                    type="text"
                                    className="form-control form-control-lg" 
                                    placeholder="CVV"
                                    name="CVV"
                                    required="required"

                                  />
                                </div>
                              </div>
                              <div className="col-md-6 m-2 pb-2" style={{ display: "flex"}}>
                                <div className="form-outline col-md-4">
                                  <input
                                    type="text"
                                    className="form-control form-control-lg" 
                                    placeholder="MM"
                                    name="expirationMM"
                                    required="required"

                                  />
                                </div>
                                <div className="form-outline col-md-4">
                                  <input
                                    type="text"
                                    className="form-control form-control-lg" 
                                    placeholder="YY"
                                    name="expirationYY"
                                    required="required"

                                  />
                                </div>
                              </div>
                            </div> */}

                            {/* <div className="row">
                              <div className="col-md-12">
                                <div className="d-flex flex-row">
                                  <div className="col-md-5 mr-2">
                                    <div className="inputbox mt-3 mr-2">
                                      {" "}
                                      <input
                                        type="text"
                                        name="name"
                                        className="form-control"
                                        required="required"
                                        placeholder="Zip code"
                                      
                                      />{" "}
                                    </div>
                                  </div>
                                  <div className="col-md-5">
                                    <div className="inputbox mt-3 mr-2">
                                      {" "}
                                      <input
                                        type="text"
                                        name="name"
                                        className="form-control"
                                        required="required"
                                        placeholder="Country"
                                        
                                      />{" "}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div> */}
                          </div>
                        </div>
                      </>
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
