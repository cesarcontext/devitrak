import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { increment, decrement, reset } from "../store/slices/deviceSlice";

export const useDeviceCount = () => {
  const device = useSelector((state) => state.device.value);
  const dispatch = useDispatch();

  const [moreDeviceRequested, setMoreDeviceRequested] = useState(0);

  const [deviceSelectionRecord, setDeviceSelectionRecord] = useState([]);

  const deviceRecord = []

  localStorage.setItem("device", device);
  localStorage.setItem("moreDeviceRequested", moreDeviceRequested);

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

  const handleIncreaseOriginalRequestDevice = (event) => {
    event.preventDefault();

    setMoreDeviceRequested(moreDeviceRequested + 1);
  };

  const handleDecreaseOriginalRequestDevice = (event) => {
    event.preventDefault();

    setMoreDeviceRequested(moreDeviceRequested - 1);
  };

  const handleResetOriginalRequestDevice = (event) => {
    event.preventDefault();
    setMoreDeviceRequested(0);
  };

  const amountToDeposit = device * 200;
  const amountToCollect = moreDeviceRequested * 200;

  const deviceSelected = localStorage.getItem("device");
  const deviceRented = Array.from(Array(parseInt(deviceSelected)), (_, x) => x);

  return {
    //* Propiedades
    device,
    amountToDeposit,
    moreDeviceRequested,
    amountToCollect,
    deviceRented,
    deviceSelected,

    //* Métodos
    handleIncreaseDevice,
    handleDecreaseDevice,
    handleResetDevice,
    handleIncreaseOriginalRequestDevice,
    handleDecreaseOriginalRequestDevice,
    handleResetOriginalRequestDevice,
  };
};
