import React, { useState } from "react";

import "./paymentInfo.css";

export const PaymentInfo = () => {
  const [nameOnCard, setNameOnCard] = useState("");
  const [creditCardNumber, setCreditCardNumber] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [securityCode, setSecurityCode] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [country, setCountry] = useState("");

  return (
    <div>
      <h3>ENTER YOUR CREDIT CARD INFORMATION</h3>
      <>
        <div className="container mt-5 px-5">
          <div className="row">
            <div className="col-md-8">
              <div className="card p-3">
                <h6 className="text-uppercase">Payment details</h6>
                <div className="inputbox mt-3">
                  {" "}
                  <input
                    type="text"
                    name="nameOnCard"
                    className="form-control"
                    required="required"
                    placeholder="Name on card"
                    value={nameOnCard}
                    onchange={(event) => setNameOnCard(event.target.value)}
                  />{" "}
                  <span></span>{" "}
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <div className="inputbox mt-3 mr-2">
                      {" "}
                      <input
                        type="text"
                        name="creditCardNumber"
                        className="form-control"
                        required="required"
                        placeholder="Credit card numbers"
                        value={creditCardNumber}
                        onchange={(event) =>
                          setCreditCardNumber(event.target.value)
                        }
                      />{" "}
                      <i className="fa fa-credit-card"></i>{" "}
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="d-flex flex-row">
                      <div className="inputbox mt-3 mr-2">
                        {" "}
                        <input
                          type="text"
                          name="name"
                          className="form-control"
                          required="required"
                          placeholder="Expiration date"
                          value={expirationDate}
                          onchange={(event) =>
                            setExpirationDate(event.target.value)
                          }
                        />{" "}
                      </div>

                      <div className="inputbox mt-3 mr-2">
                        {" "}
                        <input
                          type="text"
                          name="name"
                          className="form-control"
                          required="required"
                          placeholder="CVV"
                          value={securityCode}
                          onchange={(event) =>
                            setSecurityCode(event.target.value)
                          }
                        />{" "}
                      </div>
                      <div className="col-md-6">
                        <div className="inputbox mt-3 mr-2">
                          {" "}
                          <input
                            type="text"
                            name="name"
                            className="form-control"
                            required="required"
                            placeholder="Zip code"
                            value={zipCode}
                            onchange={(event) => setZipCode(event.target.value)}
                          />{" "}
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="inputbox mt-3 mr-2">
                          {" "}
                          <input
                            type="text"
                            name="name"
                            className="form-control"
                            required="required"
                            placeholder="Country"
                            value={country}
                            onchange={(event) => setCountry(event.target.value)}
                          />{" "}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    </div>
  );
};
