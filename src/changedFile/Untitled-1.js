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
  