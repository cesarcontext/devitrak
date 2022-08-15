import React, { useState } from "react";

const initalState = 1;

export const Devices = () => {
  const [device, setDevice] = useState(initalState);
  const [disable, setDisable] = useState(true)

  const handleIncreaseDevice = (event) => {
    event.preventDefault();
    setDevice(device + 1);
  };

  const handleDecreaseDevice = (event) => {
    event.preventDefault();
    setDevice(device - 1);
   

    if (device > initalState ) {
      return setDisable( false );
    } else {
      setDisable(true)
    }
    
  };

  const handleResetDevice = (event) => {
    event.preventDefault();
    setDevice(initalState);
  };

  const amountToDeposit = device * 200
  
  return (
    <div className="container">
      <div style={{ display: "flex", margin: '0 auto' }}>
        <h5>HOW MANY RECEIVERS DO YOU NEED?</h5>
        <button onClick={handleIncreaseDevice}>+</button>
        {device}
        <button disabled={ disable } onClick={handleDecreaseDevice}>-</button>
        <button onClick={handleResetDevice}>Reset</button>
      </div>

      <div>
        <h5>DEPOSIT TOTAL:</h5><h3><strong>${amountToDeposit}</strong></h3>
      </div>
    </div>
  );
};
