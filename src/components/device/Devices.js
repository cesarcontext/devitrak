import React, { useState } from "react";
import { deviceMessageAlert } from "../../helper/swalFireMessage";
import { useDeviceCount } from "../../hooks/useDeviceCountStore";
import "../../style/component/device/Device.css";

export const Devices = () => {
  const { device, handleDecreaseDevice, handleIncreaseDevice } =
    useDeviceCount();
    const [blockButton, setBlockButton] = useState(false)

    if(device > 6){
      setBlockButton(true)
      alert("For more than 5 devices, please contact the staff")
    }
  return (
    <div className="col-md-11 m-4 mb-0">
      <div className="device-selection">
        <p>HOW MANY RECEIVERS DO YOU NEED?</p>
        <div className="button-selection">
          <button id="button-less" onClick={handleDecreaseDevice}>
            -
          </button>
          <div className="device-selection-display">
            <p id="number-device-displayed">{device}</p>
          </div>
          <button disabled={blockButton} id="button-plus" onClick={handleIncreaseDevice}>
            +
          </button>
        </div>
      </div>
    </div>
  );
};
