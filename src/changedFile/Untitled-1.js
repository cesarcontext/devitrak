<section className="gradient-custom">
                          <div className="container py-5 h-100">
                            <div className="row justify-content-center align-items-center">
                              <div className="col-12 col-lg-9 col-xl-7">
                                <div
                                  className="card shadow-2-strong card-registration"
                                  style={{ bordeRadius: "15px" }}
                                >
                                  <div className="card-body p-4 p-md-5">
                                    <StripeCheckoutForm />
                                </div>
                              </div>
                            </div>
                          </div>
                        </section>  

  
  
  
  
  
  
  
  
  
  
  
  
  
  
  {/* <div className="container">
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
                    {userParseStored?.map((user) => {
                      console.log({ user });
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
                                              placeholder={user.phone}
                                              name="phoneNumber"
                                              value={user.phone}
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
                    <div className="container" style={{ marginBottom: "10vh" }}>
                      <form onSubmit={onSubmitEditPaymentInfo}>
                        <section className="gradient-custom">
                          <div className="container">
                            <div className="row justify-content-center align-items-center">
                              <div className="col-12 col-lg-9 col-xl-7">
                                <div className="row">
                                  <div className="col-md-12 mt-4 mb-2">
                                    <div className="form-outline">
                                      <div
                                        className="card shadow-2-strong card-registration"
                                        style={{ bordeRadius: "15px" }}
                                      >
                                        <div
                                          style={{
                                            display: "flex",
                                            // flexDirection: "column",
                                            justifyContent: "space-evenly",
                                          }}
                                        >
                                          <h5>
                                            HOW MANY RECEIVERS DO YOU NEED?
                                          </h5>
                                          <div
                                            style={{
                                              display: "flex",
                                              justifyContent: "space-between",
                                              margin: "0  auto",
                                            }}
                                          >
                                            <button
                                              onClick={handleDecreaseDevice}
                                            >
                                              -
                                            </button>
                                            <div>
                                              <strong>{device}</strong>
                                            </div>
                                            <button
                                              onClick={handleIncreaseDevice}
                                            >
                                              +
                                            </button>
                                            <button onClick={handleResetDevice}>
                                              Reset
                                            </button>
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
                                              <strong>
                                                ${amountToDeposit}
                                              </strong>
                                            </h3>
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
                          <div className="container">
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
                                              type="tel"
                                              className="form-control form-control-lg cardNumber"
                                              placeholder="Card number"
                                              onChange={onInputChange}
                                              name="cardNumber"
                                              value={
                                                editInfoValue.cardNumber
                                              }
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
                                                onChange={onInputChange}
                                                name="mm"
                                                value={editInfoValue.mm}
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
                                              type="tel"
                                              className="form-control  form-control-lg"
                                              placeholder="CVV"
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
                                              id="zip"
                                              type="tel"
                                              className={`form-control ${validationZip}  form-control-lg`}
                                              placeholder="Zip"
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
                                              type="text"
                                              className={`form-control ${validationCountry}  form-control-lg`}
                                              placeholder="Country"
                                              onChange={onInputChange}
                                              name="country"
                                              value={editInfoValue.country}
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
                              Lorem ipsum dolor sit amet, consectetur adipiscing
                              elit, sed do eiusmod tempor incididunt ut labore
                              et dolore magna aliqua. Sit amet nisl suscipit
                              adipiscing bibendum est ultricies integer.
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
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div> */}

/*

<div className="container" style={{ marginBottom: "10vh"}}>
<form onSubmit={onSubmitEditPaymentInfo}>
  <section className="gradient-custom">
    <div className="container">
      <div className="row justify-content-center align-items-center">
        <div className="col-12 col-lg-9 col-xl-7">
          <div className="row">
            <div className="col-md-12 mt-4 mb-2">
              <div className="form-outline">
                <div
                  className="card shadow-2-strong card-registration"
                  style={{ bordeRadius: "15px" }}
                >
                  <div
                    style={{
                      display: "flex",
                      // flexDirection: "column",
                      justifyContent: "space-evenly",
                      
                    }}
                  >
                    <h5>HOW MANY RECEIVERS DO YOU NEED?</h5>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        margin: "0  auto",
                      }}
                    >
                      <button onClick={handleDecreaseDevice}>-</button>
                      <div>
                        <strong>{device}</strong>
                      </div>
                      <button onClick={handleIncreaseDevice}>+</button>
                      <button onClick={handleResetDevice}>Reset</button>
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <section className="gradient-custom">
    <div className="container">
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
*/
