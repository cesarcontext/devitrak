import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { increment, decrement, reset } from "../store/slices/deviceSlice";

export const useDeviceCount = () => {
  const device = useSelector((state) => state.device.value);
  const deviceSelected = localStorage.getItem("device")
  const dispatch = useDispatch();

  const handleIncreaseDevice = (event) => {
    event.preventDefault();
    dispatch(increment());
    localStorage.setItem("device", deviceSelected);
  };

  const handleDecreaseDevice = (event) => {
    event.preventDefault();
    dispatch(decrement());
    localStorage.setItem("device", deviceSelected);

    if (device <= 1) {
      dispatch(reset());
      localStorage.setItem("device", deviceSelected);
    }
  };

  const handleResetDevice = (event) => {
    event.preventDefault();
    dispatch(reset());
    localStorage.setItem("device", deviceSelected);
  };

  return {
    //* Propiedades
    device,
    deviceSelected,

    //* Métodos
    handleIncreaseDevice,
    handleDecreaseDevice,
    handleResetDevice,
  };
};
