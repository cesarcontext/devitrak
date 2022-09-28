import React, { useState } from "react";
import { useDeviceCount } from "../../hooks/useDeviceCountStore";

export const Devices = () => {
  const [deviceNumber, setDeviceNumber] = useState(1)
  const {
    device,
    handleDecreaseDevice,
    handleIncreaseDevice,
    handleResetDevice,
    amountToDeposit,
  } = useDeviceCount();

  return (
    <section className="gradient-custom" style={{ paddingBottom: "1vh" }}>
      <div className="container">
        <div className="row justify-content-center align-items-center">
          <div
            className="card shadow-2-strong card-registration"
            style={{ border: "transparent" }}
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
                  <strong style={{ fontSize: "30px", width:"100%" }}>{device} {/*<input value={deviceNumber} name="device" onChange={(event)=> setDeviceNumber(event.target.value)} type="number" max={49999} /> */}</strong>
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
                    <strong>${amountToDeposit} {/*deviceNumber * 200*/}</strong>
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
