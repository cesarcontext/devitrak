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
    moreDeviceRequested,
    amountToCollect,
    handleIncreaseOriginalRequestDevice,
    handleDecreaseOriginalRequestDevice,
    handleResetOriginalRequestDevice,
  } = useDeviceCount();

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

    await startUpdatingContactInfo(editFormValues)
    console.log("edited", editFormValues )
  };

  return (
    <div
      className="container"
      style={{ height: "115vh", marginBottom: "20vh" }}
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
          <div>
            <div className="col-4"></div>
            <h5>DEVICES REQUESTED:</h5>
            <h3>
              <strong>{device}</strong>
            </h3>
          </div>
          <div>
            <div className="col-4"></div>
            <h5>TOTAL DEPOSIT COLLECTED:</h5>
            <h3>
              <strong>${amountToDeposit}</strong>
            </h3>
          </div>
        </div>
      </div>
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
            justifyContent: "center",
            marginTop: "5%",
            marginBottom: "2%",
          }}
        >
          <h3>Select number of devices needed: </h3>
          <button onClick={handleDecreaseOriginalRequestDevice}>-</button>
          <div>
            <strong>{moreDeviceRequested}</strong>
          </div>
          <button onClick={handleIncreaseOriginalRequestDevice}>+</button>
          <button onClick={handleResetOriginalRequestDevice}>Reset</button>
        </div>
      </div>
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
          <div>
            <div className="col-4"></div>
            <h5>DEVICES NEEDED:</h5>
            <h3>
              <strong>{moreDeviceRequested}</strong>
            </h3>
          </div>
          <div>
            <div className="col-4"></div>
            <h5>TOTAL DEPOSIT TO COLLECT:</h5>
            <h3>
              <strong>${amountToCollect}</strong>
            </h3>
          </div>
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
                    YOUR CONTACT INFORMATION SUBMITTED
                  </h3>
                  {userParseStored?.map((item) => {
                    return (
                      <div>
                        <div className="row">
                          <div className="col-md-10 m-4 d-flex align-items-center">
                            <div className="form-outline datepicker w-100">
                              <input
                                type="text"
                                className="form-control form-control-lg"
                                id="groupName"
                                name="groupName"
                                value={item.groupName}
                                disabled={true}
                              />
                            </div>
                          </div>
                          <div className="col-md-10 m-4">
                            <div className="form-outline">
                              <input
                                type="text"
                                id="firstName"
                                name="name"
                                className="form-control form-control-lg"
                                value={item.name}
                                disabled={true}
                              />
                            </div>
                          </div>
                          <div className="col-md-10 m-4">
                            <div className="form-outline">
                              <input
                                type="text"
                                id="lastName"
                                className="form-control form-control-lg"
                                name="lastName"
                                value={item.lastName}
                                disabled={true}
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
                                name="email"
                                value={item.email}
                                disabled={true}
                              />
                            </div>
                          </div>
                          <div className="col-md-10 m-4 pb-2">
                            <div className="form-outline">
                              <input
                                type="tel"
                                id="phoneNumber"
                                className="form-control form-control-lg"
                                name="phoneNumber"
                                value={item.phoneNumber}
                                disabled={true}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <form onSubmit={onSubmitEditPaymentInfo}>
        <section className="gradient-custom" style={{ marginBottom: "50vh" }}>
          <div
            className="container py-5 h-100"
          >
            <div className="row justify-content-center align-items-center">
              <div className="col-12 col-lg-9 col-xl-7">
                <div
                  className="card shadow-2-strong card-registration"
                  style={{ bordeRadius: "15px" }}
                >
                  <div className="card-body p-4 p-md-5">
                    <h3 className="mb-4 pb-2 pb-md-0 mb-md-5">
                      YOUR PAYMENT INFORMATION SUBMITTED
                    </h3>
                    <div>
                      <button onClick={handleEdit}>
                        <i className="bi bi-pencil-square"></i> Edit payment
                        infomartion
                      </button>
                    </div>
                    {userParseStored?.map((item) => {
                      return (
                        <div>
                          <div className="row">
                            <div className="col-md-10 m-4">
                              <div className="form-outline">
                                <input
                                  type="text"
                                  className="form-control  form-control-lg"
                                  placeholder={item.cardName}
                                  onChange={onInputChange}
                                  name="cardName"
                                  value={editFormValues.cardName}
                                  minLength={3}
                                  disabled={editInfoValue}
                                />
                              </div>
                            </div>
                            <div className="col-md-10 m-4">
                              <div className="form-outline">
                                <input
                                  type="text"
                                  className="form-control form-control-lg cardNumber"
                                  placeholder={item.cardNumber}
                                  onChange={onInputChange}
                                  name="cardNumber"
                                  value={editFormValues.cardNumber}
                                  maxLength={19}
                                  minLength={13}
                                  disabled={editInfoValue}
                                />
                              </div>
                            </div>
                            <div className="col-md-10 m-4 d-flex">
                              <div className="col-md-3 m-4">
                                <div className="form-outline">
                                  <input
                                    type="number"
                                    className={`form-control ${validationExpirationDateMM}  form-control-lg`}
                                    placeholder={item.mm}
                                    onChange={onInputChange}
                                    name="mm"
                                    value={editFormValues.mm}
                                    maxLength={2}
                                    minLength={2}
                                    min={1}
                                    max={12}
                                    disabled={editInfoValue}
                                  />
                                </div>
                              </div>
                              <div className="col-md-3 m-4">
                                <div className="form-outline">
                                  <input
                                    type="number"
                                    className={`form-control ${validationExpirationDateYY}  form-control-lg`}
                                    placeholder={item.yy}
                                    onChange={onInputChange}
                                    name="yy"
                                    value={editFormValues.yy}
                                    maxLength={4}
                                    minLength={4}
                                    min={new Date().getFullYear()}
                                    disabled={editInfoValue}
                                  />
                                </div>
                              </div>
                              <div className="col-md-3 m-4">
                                <div className="form-outline">
                                  <input
                                    type="text"
                                    className="form-control  form-control-lg"
                                    placeholder="CVV"
                                    onChange={onInputChange}
                                    name="cvv"
                                    value={editFormValues.cvv}
                                    maxLength={4}
                                    minLength={3}
                                    disabled={editInfoValue}
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
                                  className={`form-control ${validationZip}  form-control-lg`}
                                  placeholder={item.zip}
                                  onChange={onInputChange}
                                  name="zip"
                                  value={editFormValues.zip}
                                  minLength={4}
                                  disabled={editInfoValue}
                                />
                              </div>
                            </div>
                            <div className="col-md-10 m-4">
                              <div className="form-outline">
                                <input
                                  type="text"
                                  className={`form-control ${validationCountry}  form-control-lg`}
                                  placeholder={item.country}
                                  onChange={onInputChange}
                                  name="country"
                                  value={editFormValues.country}
                                  minLength={3}
                                  disabled={editInfoValue}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
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
                </div>
              </div>
            </div>
          </div>
        </section>
      </form>
    </div>
  );
};
