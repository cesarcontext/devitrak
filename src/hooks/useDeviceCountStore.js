import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { increment, decrement, reset } from "../store/slices/deviceSlice";

export const useDeviceCount = () => {
  const device = useSelector((state) => state.device.value);
  const dispatch = useDispatch();

  localStorage.setItem("device", device);

  const handleIncreaseDevice = (event) => {
    event.preventDefault();
    dispatch(increment());
  };

  const handleDecreaseDevice = (event) => {
    event.preventDefault();
    dispatch(decrement());

    if (device <= 0) {
      return dispatch(reset());
    }
  };

  const handleResetDevice = (event) => {
    event.preventDefault();
    dispatch(reset());
  };

  const amountToDeposit = device * 200;

  const deviceSelected = localStorage.getItem("device");
  const deviceRented = Array.from(Array(parseInt(deviceSelected)), (_, x) => x);

  return {
    //* Propiedades
    device,
    amountToDeposit,
    deviceRented,
    deviceSelected,

    //* Métodos
    handleIncreaseDevice,
    handleDecreaseDevice,
    handleResetDevice,
  };
};
