import { useDispatch, useSelector } from "react-redux";
import { devitrackApi } from "../apis/devitrackApi";
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

  const savedReceiversPool = async (deviceInfo) => {
    try {
      const response = await devitrackApi.post("/receiver/receivers-pool", {
        deviceInfo
      })
    } catch (error) {
      console.log("🚀 ~ file: useDeviceCountStore.js ~ line 30 ~ savedReceiversPool ~ error", error)
      
    }
  };

  return {
    //* Propiedades
    device,

    //* Métodos
    handleIncreaseDevice,
    handleDecreaseDevice,
    handleResetDevice,
    savedReceiversPool,
  };
};
