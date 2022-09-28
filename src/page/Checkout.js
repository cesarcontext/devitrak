import React, { useState } from "react";
import { NavbarBottom } from "../components/ui/NavbarBottom";
import { StripeCheckoutElement } from "../components/stripe/StripeCheckoutElement";
import { Navbar } from "../components/ui/Navbar";
import { useStripeHook } from "../hooks/useStripeHook";
import { useDeviceCount } from "../hooks/useDeviceCountStore";

export const Checkout = () => {
  const {
    device,
    handleDecreaseDevice,
    handleIncreaseDevice,
    handleResetDevice,
  } = useDeviceCount();
  const { startStripePaymentIntent, clientSecret, visibleButton } =
    useStripeHook();

  const handleOnSubmit = (event) => {
    event.preventDefault();
    startStripePaymentIntent(device);
    localStorage.setItem("device", device);
  };
  const style = {
    display: "flex",
    padding: "15px",
    justifyContent: "space-evenly",
    width: "75%",
    margin: "0 auto",
    border: "solid 1px #212529",
    borderRadius: "15px",
  };

  return (
    <>
      <Navbar />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: "100%"
        }}
      >
        <section className="gradient-custom" style={{ marginTop: "5vh" }}>
          <div className="container">
            <div className="row justify-content-center align-items-center">
              <div
                className="card shadow-2-strong card-registration"
                style={{
                  width: "57%",
                  minWidth: "500px",
                  alignSelf: "center",
                  boxShadow:
                    "0px 0px 0px 0.5px rgb(50 50 93 / 10%), 0px 2px 5px 0px rgb(50 50 93 / 10%), 0px 1px 1.5px 0px rgb(0 0 0 / 7%)",
                  borderRadius: "7px",
                  padding: "40px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    padding: "15px",
                    justifyContent: "space-evenly",
                  }}
                >
                  <h5
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    HOW MANY RECEIVERS DO YOU NEED?
                  </h5>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      margin: "0  auto",
                      padding: "20px",
                    }}
                  >
                    <div
                      className="p-1"
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
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

                    <div
                      className="p-1"
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
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
                    <div
                      className="p-1"
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
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
                    <div
                      className="p-1"
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <strong style={{ fontSize: "30px", width: "100%" }}>
                        {device}{" "}
                        {/*<input value={deviceNumber} name="device" onChange={(event)=> setDeviceNumber(event.target.value)} type="number" max={49999} /> */}
                      </strong>
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
                      <h3
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <strong>${device * 200}</strong>
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {device < 1 ? (
          <></>
        ) : (
          <div
            // className={`d-${visibleButton}`}
            style={{ paddingTop: "1vh", display: `${visibleButton}` }}
          >
            <button
              style={{
                margin: "auto",
                backgroundColor: "rgba(69, 104, 220, 1)",
                color: "#ffff",
                height: "5vh",
                borderRadius: "10px",
                outline: "transparency",
                border: "rgba(69, 104, 220, 1)",
                width: "100%",
              }}
              onClick={handleOnSubmit}
            >
              Looks right?
            </button>
          </div>
        )}
        <StripeCheckoutElement clientSecret={clientSecret} />
      </div>
      <NavbarBottom />
    </>
  );
};
