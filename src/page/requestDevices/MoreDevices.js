import React, { useState } from "react";
import { PaymentInfo } from "../../components/PaymentInfo";
import { useContactInfoStore } from "../../hooks/useContactInfoStore";
import { useDeviceCount } from "../../hooks/useDeviceCountStore";

const editInfoSubmitted = {
  cardName: "",
  cardNumber: "",
  mm: "",
  yy: "",
  cvv: "",
  zip: "",
  country: "",
};
export const MoreDevices = () => {
  const {
    device,
    amountToDeposit,
    handleDecreaseDevice,
    handleIncreaseDevice,
    handleResetDevice,
  } = useDeviceCount();

  const {
    validationGroupName,
    validationName,
    validationLastName,
    validationEmail,
    validationPhoneNumber,
  } = PaymentInfo;

  const { userParseStored } = useContactInfoStore();

  const { startUpdatingContactInfo } = useContactInfoStore(); //startSavingContactInfo is resulting undefined

  const {
    validationExpirationDateMM,
    validationExpirationDateYY,
    validationZip,
    validationCountry,
  } = PaymentInfo;

  const [editInfoValue, setEditInfoValue] = useState(true);

  const [editFormValues, setEditFormValues] = useState(editInfoSubmitted);

  const onInputChange = ({ target }) => {
    setEditFormValues({
      ...editFormValues,
      [target.name]: target.value,
    });
  };

  const handleEdit = () => {
    return setEditInfoValue(!editInfoValue);
  };

  const onSubmitEditPaymentInfo = async (event) => {
    event.preventDefault();
  };

  return (
    <>
      <div className="container">
        <form
        // onSubmit={handleOnSubmit}
        >
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
          {userParseStored?.map((user) => {
            return (
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
                                    disabled={true}
                                    type="text"
                                    className={`form-control ${validationGroupName}  form-control-lg`}
                                    id="groupName"
                                    placeholder={user.groupName}
                                    name="groupName"
                                    value={user.groupName}
                                    minLength={3}
                                  />
                                </div>
                              </div>
                              <div className="col-md-10 m-4">
                                <div className="form-outline">
                                  <input
                                    disabled={true}
                                    type="text"
                                    id="firstName"
                                    name="name"
                                    value={user.name}
                                    className={`form-control ${validationName} form-control-lg`}
                                    placeholder={user.name}
                                    minLength={1}
                                  />
                                </div>
                              </div>
                              <div className="col-md-10 m-4">
                                <div className="form-outline">
                                  <input
                                    disabled={true}
                                    type="text"
                                    id="lastName"
                                    className={`form-control ${validationLastName} form-control-lg`}
                                    placeholder={user.lastName}
                                    name="lastName"
                                    value={user.lastName}
                                    minLength={1}
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-md-10 m-4 pb-2">
                                <div className="form-outline">
                                  <input
                                    disabled={true}
                                    type="email"
                                    id="emailAddress"
                                    className={`form-control ${validationEmail} form-control-lg`}
                                    placeholder={user.email}
                                    name="email"
                                    value={user.email}
                                    minLength={4}
                                  />
                                </div>
                              </div>
                              <div className="col-md-10 m-4 pb-2">
                                <div className="form-outline">
                                  <input
                                    disabled={true}
                                    type="tel"
                                    id="phoneNumber"
                                    className={`form-control ${validationPhoneNumber} form-control-lg phoneNumber`}
                                    placeholder={user.phoneNumber}
                                    name="phoneNumber"
                                    value={user.phoneNumber}
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
            );
          })}

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
                                // onChange={onInputChangePayment}
                                name="cardName"
                                // value={paymentFormValues.cardName}
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
                                // onChange={onInputChangePayment}
                                name="cardNumber"
                                // value={paymentFormValues.cardNumber}
                                maxLength={19}
                                minLength={13}
                              />
                            </div>
                          </div>
                          <div style={{
                            display: 'flex',
                          }}>
                            <div className="col-md-4 m-4">
                              <div className="form-outline">
                                <input
                                  type="number"
                                  className={`form-control ${validationExpirationDateMM}  form-control-lg`}
                                  placeholder="MM"
                                  // onChange={onInputChangePayment}
                                  name="mm"
                                  // value={paymentFormValues.mm}
                                  maxLength={2}
                                  minLength={2}
                                  min={1}
                                  max={12}
                                />
                              </div>
                            </div>
                            <div className="col-md-5 m-4 mr-4">
                              <div className="form-outline">
                                <input
                                  type="number"
                                  className={`form-control ${validationExpirationDateYY}  form-control-lg`}
                                  placeholder="YYYY"
                                  // onChange={onInputChangePayment}
                                  name="yy"
                                  // value={paymentFormValues.yy}
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
                                type="text"
                                className="form-control  form-control-lg"
                                placeholder="CVV"
                                // onChange={onInputChangePayment}
                                name="cvv"
                                // value={paymentFormValues.cvv}
                                maxLength={4}
                                minLength={3}
                              />
                            </div>
                          </div>
                          <div className="col-md-5 m-4">
                            <div className="form-outline">
                              <input
                                id="zip"
                                type="text"
                                className={`form-control ${validationZip}  form-control-lg`}
                                placeholder="Zip"
                                // onChange={onInputChangePayment}
                                name="zip"
                                // value={paymentFormValues.zip}
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
                                // onChange={onInputChangePayment}
                                name="country"
                                // value={paymentFormValues.country}
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
    </>
  );
};
