import React from "react";
import { useDeviceCount } from "../../hooks/useDeviceCountStore";
import "../../style/component/device/Device.css"
export const Devices = () => {
  const {
    device,
    handleDecreaseDevice,
    handleIncreaseDevice,
    handleResetDevice,
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
            className="device-selection"
              style={{
                display: "flex",
                padding: "15px",
                justifyContent: "space-evenly",
              }}
            >
              <h6
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  textOrientation: "left"
                }}
              >
                HOW MANY RECEIVERS DO YOU NEED?
              </h6>
              <div
              className="button-selection"
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
                  <h3 style={{ fontSize: "30px", width:"100%" }}>{device} </h3>
                </div>
              </div>
              <div
              className="show-amount-section"
                style={{
                  display: "flex",
                  justifyContent: "space-evenly",
                  alignItems: "center",
                }}
              >
                <div
                  className="col-2"
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
  );
};
