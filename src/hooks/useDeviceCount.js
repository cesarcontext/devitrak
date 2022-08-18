import { useDispatch, useSelector } from "react-redux";

export const useDeviceCount = () => {

  const device = useSelector((state) => state.device.value);

  const deviceArray = new Array(device)

  const renderSpotToDevice = () => {

  }


  return {
    //* Propiedades
    device,
    deviceArray,
    //* Métodos
    renderSpotToDevice
  };
};
