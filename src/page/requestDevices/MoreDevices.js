import React, { useState, useMemo } from "react";
import Swal from "sweetalert2";
import { useContactInfoStore } from "../../hooks/useContactInfoStore";
import { useDeviceCount } from "../../hooks/useDeviceCountStore";
import { usePaymentStore } from "../../hooks/usePaymentStore";
import { ConfirmationModal } from "../../ui/ConfirmationModal";
import { useUiStore } from "../../hooks/useUiStore";
import { ConfirmationModalEditSection } from "../../ui/ConfirmationModalEditSection";

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
  const { paymentInfoParse, startVerificationCreditCardInfoBeforeSaveIt } =
    usePaymentStore();
  const { userParseStored } = useContactInfoStore();
  const { openModal } = useUiStore();
  const infoSaved = userParseStored;
  const [editInfoValue, setEditInfoValue] = useState(true);
  const [editFormValues, setEditFormValues] = useState(editInfoSubmitted);
  const onInputChange = ({ target }) => {
    setEditFormValues({
      ...editFormValues,
      [target.name]: target.value,
    });
  };

  // const handleEditInfo = (event) => {
  //   event.preventDefault();

  //   setEditInfoValue(!editInfoValue);
  // };

  const validationCardName = useMemo(() => {
    return editFormValues.cardName.length > 2 ? "" : "is-invalid";
  }, [editFormValues.cardName]);

  const validationCardNumber = useMemo(() => {
    return editFormValues.cardNumber.length > 12 &&
      editFormValues.cardNumber.match(/^\d+$/)
      ? ""
      : "is-invalid";
  }, [editFormValues.cardNumber]);

  const validationExpirationDateMM = useMemo(() => {
    if (
      (editFormValues.mm < new Date().getMonth() + 1 &&
        editFormValues.yy <= new Date().getFullYear().toString()) ||
      editFormValues.mm > 12
    ) {
      return "is-invalid";
    }
  }, [editFormValues.mm, editFormValues.yy]);

  const validationExpirationDateYY = useMemo(() => {
    if (editFormValues.yy.valueOf() < new Date().getFullYear().toString()) {
      return "is-invalid";
    }
  }, [editFormValues.yy]);

  const validationCvv = useMemo(() => {
    return editFormValues.cvv.length > 2 ? "" : "is-invalid";
  }, [editFormValues.cvv]);

  const validationZip = useMemo(() => {
    return editFormValues.zip.length > 0 ? "" : "is-invalid";
  }, [editFormValues.zip]);

  const validationCountry = useMemo(() => {
    return editFormValues.country.length > 0 ? "" : "is-invalid";
  }, [editFormValues.country]);

  const creditCard = editFormValues.cardNumber;

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

  const onSubmitEditPaymentInfo = async (event) => {
    event.preventDefault();

    // if (editInfoValue === true) {
    //   return paymentInfoParse;
    // }

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
    startVerificationCreditCardInfoBeforeSaveIt(editFormValues);
    openModal()
  };

  return (
    <>
      <div className="container">
        <form onSubmit={onSubmitEditPaymentInfo}>
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
          {infoSaved?.map((user) => {
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
                                    className={`form-control   form-control-lg`}
                                    id="groupName"
                                    placeholder={user.groupName}
                                    name="groupName"
                                    value={user.groupName}
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
                                    className={`form-control form-control-lg`}
                                    placeholder={user.name}
                                  />
                                </div>
                              </div>
                              <div className="col-md-10 m-4">
                                <div className="form-outline">
                                  <input
                                    disabled={true}
                                    type="text"
                                    id="lastName"
                                    className={`form-control  form-control-lg`}
                                    placeholder={user.lastName}
                                    name="lastName"
                                    value={user.lastName}
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
                                    className={`form-control  form-control-lg`}
                                    placeholder={user.email}
                                    name="email"
                                    value={user.email}
                                  />
                                </div>
                              </div>
                              <div className="col-md-10 m-4 pb-2">
                                <div className="form-outline">
                                  <input
                                    disabled={true}
                                    type="tel"
                                    id="phoneNumber"
                                    className={`form-control  form-control-lg`}
                                    placeholder={user.phoneNumber}
                                    name="phoneNumber"
                                    value={user.phoneNumber}
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
                          {paymentInfoParse?.map((item) => {
                            return (
                              <>
                                <div className="col-md-10 m-4">
                                  <div className="form-outline">
                                    <input
                                      // disabled={editInfoValue}
                                      type="text"
                                      className={`form-control ${validationCardName} form-control-lg`}
                                      // placeholder={item.cardName}00
                                      onChange={onInputChange}
                                      name="cardName"
                                      value={editInfoValue.cardName}
                                      minLength={3}
                                    />
                                  </div>
                                </div>
                                <div className="col-md-10 m-4">
                                  <div className="form-outline">
                                    <input
                                      // disabled={editInfoValue}
                                      type="tel"
                                      className={`form-control ${validationCardNumber} form-control-lg`}
                                      // placeholder={item.cardNumber}
                                      onChange={onInputChange}
                                      name="cardNumber"
                                      value={editInfoValue.cardNumber}
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
                                        // disabled={editInfoValue}
                                        type="tel"
                                        className={`form-control ${validationExpirationDateMM} form-control-lg`}
                                        // placeholder={item.mm}
                                        onChange={onInputChange}
                                        name="mm"
                                        value={editInfoValue.mm}
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
                                        // disabled={editInfoValue}
                                        type="tel"
                                        className={`form-control ${validationExpirationDateYY} form-control-lg`}
                                        // placeholder={item.yy}
                                        onChange={onInputChange}
                                        name="yy"
                                        value={editInfoValue.yy}
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
                                      // disabled={editInfoValue}
                                      type="tel"
                                      className="form-control  form-control-lg"
                                      // placeholder={item.cvv}
                                      onChange={onInputChange}
                                      name="cvv"
                                      value={editInfoValue.cvv}
                                      maxLength={CVVMaxLength}
                                      minLength={3}
                                    />
                                  </div>
                                </div>
                                <div className="col-md-5 m-4">
                                  <div className="form-outline">
                                    <input
                                      // disabled={editInfoValue}
                                      id="zip"
                                      type="tel"
                                      className={`form-control ${validationZip} form-control-lg`}
                                      // placeholder={item.zip}
                                      onChange={onInputChange}
                                      name="zip"
                                      value={editInfoValue.zip}
                                      minLength={4}
                                    />
                                  </div>
                                </div>
                                <div className="col-md-10 m-4">
                                  <div className="form-outline">
                                    <input
                                      // disabled={editInfoValue}
                                      type="text"
                                      className={`form-control ${validationCountry} form-control-lg`}
                                      // placeholder={item.country}
                                      onChange={onInputChange}
                                      name="country"
                                      value={editInfoValue.country}
                                      minLength={3}
                                    />
                                  </div>
                                </div>
                              </>
                            );
                          })}
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

      <ConfirmationModalEditSection />
    </>
  );
};

{
  /* {editInfoValue === true ? (
                        <div>
                          {paymentInfoParse.map((item) => {
                            return (
                              <div className="row">
                                <div className="col-md-10 m-4">
                                  <div className="form-outline">
                                    <input
                                      disabled={editInfoValue}
                                      type="text"
                                      className="form-control form-control-lg"
                                      placeholder="Card name"
                                      name="cardName"
                                      value={item.cardName}
                                    />
                                  </div>
                                </div>
                                <div className="col-md-10 m-4">
                                  <div className="form-outline">
                                    <input
                                      disabled={editInfoValue}
                                      className="form-control form-control-lg"
                                      placeholder="Card number"
                                      name="cardNumber"
                                      value={item.cardNumber}
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
                                        disabled={editInfoValue}
                                        type="number"
                                        className="form-control form-control-lg"
                                        placeholder="MM"
                                        name="mm"
                                        value={item.mm}
                                      />
                                    </div>
                                  </div>
                                  <div className="col-md-5 m-4 mr-4">
                                    <div className="form-outline">
                                      <input
                                        disabled={editInfoValue}
                                        type="number"
                                        className="form-control form-control-lg"
                                        placeholder="YYYY"
                                        name="yy"
                                        value={item.yy}
                                      />
                                    </div>
                                  </div>
                                </div>
                                <div className="col-md-4 m-4">
                                  <div className="form-outline">
                                    <input
                                      disabled={editInfoValue}
                                      type="text"
                                      className="form-control  form-control-lg"
                                      placeholder="CVV"
                                      name="cvv"
                                      value={item.cvv}
                                    />
                                  </div>
                                </div>
                                <div className="col-md-5 m-4">
                                  <div className="form-outline">
                                    <input
                                      disabled={editInfoValue}
                                      id="zip"
                                      type="text"
                                      className="form-control form-control-lg"
                                      placeholder="Zip"
                                      name="zip"
                                      value={item.zip}
                                    />
                                  </div>
                                </div>
                                <div className="col-md-10 m-4">
                                  <div className="form-outline">
                                    <input
                                      disabled={editInfoValue}
                                      type="text"
                                      className="form-control form-control-lg"
                                      placeholder="Country"
                                      name="country"
                                      value={item.country}
                                    />
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      ) : (
                        <div>
                          <div className="row">
                            {paymentInfoParse?.map((item) => {
                              return (
                                <>
                                  <div className="col-md-10 m-4">
                                    <div className="form-outline">
                                      <input
                                        disabled={editInfoValue}
                                        type="text"
                                        className={`form-control ${validationCardName} form-control-lg`}
                                        // placeholder={item.cardName}00
                                        onChange={onInputChange}
                                        name="cardName"
                                        value={editInfoValue.cardName}
                                        minLength={3}
                                      />
                                    </div>
                                  </div>
                                  <div className="col-md-10 m-4">
                                    <div className="form-outline">
                                      <input
                                        disabled={editInfoValue}
                                        type="tel"
                                        className={`form-control ${validationCardNumber} form-control-lg`}
                                        // placeholder={item.cardNumber}
                                        onChange={onInputChange}
                                        name="cardNumber"
                                        value={editInfoValue.cardNumber}
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
                                          disabled={editInfoValue}
                                          type="tel"
                                          className={`form-control ${validationExpirationDateMM} form-control-lg`}
                                          // placeholder={item.mm}
                                          onChange={onInputChange}
                                          name="mm"
                                          value={editInfoValue.mm}
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
                                          disabled={editInfoValue}
                                          type="tel"
                                          className={`form-control ${validationExpirationDateYY} form-control-lg`}
                                          // placeholder={item.yy}
                                          onChange={onInputChange}
                                          name="yy"
                                          value={editInfoValue.yy}
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
                                        disabled={editInfoValue}
                                        type="tel"
                                        className="form-control  form-control-lg"
                                        // placeholder={item.cvv}
                                        onChange={onInputChange}
                                        name="cvv"
                                        value={editInfoValue.cvv}
                                        maxLength={CVVMaxLength}
                                        minLength={3}
                                      />
                                    </div>
                                  </div>
                                  <div className="col-md-5 m-4">
                                    <div className="form-outline">
                                      <input
                                        disabled={editInfoValue}
                                        id="zip"
                                        type="tel"
                                        className={`form-control ${validationZip} form-control-lg`}
                                        // placeholder={item.zip}
                                        onChange={onInputChange}
                                        name="zip"
                                        value={editInfoValue.zip}
                                        minLength={4}
                                      />
                                    </div>
                                  </div>
                                  <div className="col-md-10 m-4">
                                    <div className="form-outline">
                                      <input
                                        disabled={editInfoValue}
                                        type="text"
                                        className={`form-control ${validationCountry} form-control-lg`}
                                        // placeholder={item.country}
                                        onChange={onInputChange}
                                        name="country"
                                        value={editInfoValue.country}
                                        minLength={3}
                                      />
                                    </div>
                                  </div>
                                </>
                              );
                            })}
                          </div>
                        </div>
                      )} */
}
