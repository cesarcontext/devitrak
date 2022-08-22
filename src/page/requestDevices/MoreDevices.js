import React, { useState } from "react";
import { useContactInfoStore } from "../../hooks/useContactInfoStore";
import { useDeviceCount } from "../../hooks/useDeviceCount";

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

    const {device, amountToDeposit, handleIncreaseDevice, handleDecreaseDevice, handleResetDevice } = useDeviceCount()


  const { startSavingContactInfo } = useContactInfoStore();

  console.log("start", startSavingContactInfo());

  const checking = localStorage.getItem("user");

  const userParseStored = [JSON.parse(checking)];

  const [editInfoValue, setEditInfoValue] = useState(true);

  const [formValues, setFormValues] = useState(editInfoSubmitted);

  const onInputChange = ({ target }) => {
    setFormValues({
      ...formValues,
      [target.name]: target.value,
    });
  };

  const handleEdit = () => {
    return setEditInfoValue(!editInfoValue);
  };

  return (
    <div  style={{ height: "100%", marginBottom: "18vh" }}>
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
                                className="form-control form-control-lg"
                                id=""
                                name="cardName"
                                value={item.cardName}
                                disabled={editInfoValue}
                                onChange={onInputChange}
                              />
                            </div>
                          </div>
                          <div className="col-md-10 m-4">
                            <div className="form-outline">
                              <input
                                type="text"
                                className="form-control form-control-lg"
                                id=""
                                name="cardNumber"
                                value={item.cardNumber}
                                disabled={editInfoValue}
                                onChange={onInputChange}
                              />
                            </div>
                          </div>
                          <div className="col-md-10 m-4 d-flex">
                            <div className="col-md-2 m-4">
                              <div className="form-outline">
                                <input
                                  type="text"
                                  className="form-control form-control-lg"
                                  id=""
                                  name="mm"
                                  value={item.mm}
                                  disabled={editInfoValue}
                                  onChange={onInputChange}
                                />
                              </div>
                            </div>
                            <div className="col-md-2 m-4">
                              <div className="form-outline">
                                <input
                                  type="text"
                                  className="form-control form-control-lg"
                                  id=""
                                  name="yy"
                                  value={item.yy}
                                  disabled={editInfoValue}
                                  onChange={onInputChange}
                                />
                              </div>
                            </div>
                            <div className="col-md-2 m-4">
                              <div className="form-outline">
                                <input
                                  type="text"
                                  className="form-control form-control-lg"
                                  id=""
                                  name="cvv"
                                  value={item.cvv}
                                  disabled={editInfoValue}
                                  onChange={onInputChange}
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
                                className="form-control form-control-lg"
                                id=""
                                name="zip"
                                value={item.zip}
                                disabled={editInfoValue}
                                onChange={onInputChange}
                              />
                            </div>
                          </div>
                          <div className="col-md-10 m-4">
                            <div className="form-outline">
                              <input
                                type="text"
                                className="form-control form-control-lg"
                                id=""
                                name="country"
                                value={item.country}
                                disabled={editInfoValue}
                                onChange={onInputChange}
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
    </div>
  );
};
