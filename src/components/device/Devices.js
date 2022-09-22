import React, { useState } from "react";
import { useContactInfoStore } from "../../hooks/useContactInfoStore";
import { useDeviceCount } from "../../hooks/useDeviceCountStore";

export const Devices = ({ handleOnSubmit }) => {
  const { visibleButton } = useContactInfoStore();
  const {
    device,
    handleDecreaseDevice,
    handleIncreaseDevice,
    handleResetDevice,
    amountToDeposit,
  } = useDeviceCount();

  return (
    <section className="gradient-custom" style={{ paddingBottom: "1vh"}}>
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
                        padding: "15px",
                        justifyContent: "space-evenly",
                      }}
                    >
                      <h5>HOW MANY RECEIVERS DO YOU NEED?</h5>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          margin: "0  auto",
                          padding: "20px",
                        }}
                      >
                        <div className="p-1">
                          <button
                            onClick={handleDecreaseDevice}
                            style={{
                              padding: "15px",
                              borderRadius: "15px 0 0 15px",
                            }}
                          >
                            -
                          </button>
                        </div>

                        <div className="p-1">
                          <button
                            onClick={handleIncreaseDevice}
                            style={{
                              padding: "15px",
                              borderRadius: "0 15px 15px 0",
                            }}
                          >
                            +
                          </button>
                        </div>
                        <div className="p-1">
                          <button
                            onClick={handleResetDevice}
                            style={{
                              padding: "15px",
                              borderRadius: "15px",
                            }}
                          >
                            Reset
                          </button>
                        </div>
                        <div className="p-1">
                          <strong>{device}</strong>
                        </div>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-evenly",
                          alignItems: "center",
                        }}
                      >
                        <div
                          className="col-4"
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            jsutifyContent: "space-around",
                            padding: "35px",
                          }}
                        >
                          <div>
                            <h5 style={{ display: "flex" }}>TOTAL</h5>
                          </div>
                          <h3 style={{ display: "flex" }}>
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
      </div>
    </section>
  );
};
