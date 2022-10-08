import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { increment, decrement, reset } from "../store/slices/deviceSlice";

export const useDeviceCount = () => {
  const device = useSelector((state) => state.device.value);
  const dispatch = useDispatch();

  const handleIncreaseDevice = (event) => {
    event.preventDefault();
    dispatch(increment());
  };

  const handleDecreaseDevice = (event) => {
    event.preventDefault();
    dispatch(decrement());

    if (device <= 1) {
      dispatch(reset());
    }
  };

  const handleResetDevice = (event) => {
    event.preventDefault();
    dispatch(reset());
  };

  return {
    //* Propiedades
    device,

    //* Métodos
    handleIncreaseDevice,
    handleDecreaseDevice,
    handleResetDevice,
  };
};
