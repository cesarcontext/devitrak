import React from "react";
import { useDeviceCount } from "../../hooks/useDeviceCountStore";
import "../../style/component/device/Device.css";

export const Devices = () => {
  const { device, handleDecreaseDevice, handleIncreaseDevice } =
    useDeviceCount();

  return (
    <div className="device-selection">
      <p>HOW MANY RECEIVERS DO YOU NEED?</p>
      <div className="button-selection">
        <button id="button-less" onClick={handleDecreaseDevice}>
          -
        </button>
        <div className="device-selection-display">
          <p id="number-device-displayed">{device}</p>
        </div>
        <button id="button-plus" onClick={handleIncreaseDevice}>
          +
        </button>
      </div>
    </div>
  );
};
