import React from "react";
import { useDeviceCount } from "../../hooks/useDeviceCountStore";
import "../../style/component/device/Device.css";

export const Devices = () => {
  const {
    device,
    handleDecreaseDevice,
    handleIncreaseDevice,
    // handleResetDevice,
  } = useDeviceCount();

  return (
      <div className="container-device-selection">
        <div className="row justify-content-center align-items-center">
          {/* <div className="card shadow-2-strong card-registration"> */}
          <div className="device-selection">
            <p>HOW MANY RECEIVERS DO YOU NEED?</p>
            <div className="button-selection">
              {/* <div className="p-1"> */}
                <button id="button-less" onClick={handleDecreaseDevice}>-</button>
              {/* </div> */}
              <div className="device-selection-display">
                <p id="number-device-displayed">{device}</p>
              </div>
              {/* <div className="p-1"> */}
                <button id="button-plus" onClick={handleIncreaseDevice}>+</button>
              {/* </div> */}
            </div>
            {/* </div> */}
          </div>
        </div>
        <div className="show-amount-section">
          <p>DEPOSIT TOTAL:</p>
          <div className="col-2">
            <h3>
              <strong>${device * 200}</strong>
            </h3>
          </div>
        </div>
      </div>
  );
};
