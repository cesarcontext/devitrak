import { useDispatch, useSelector } from "react-redux";
import { increment, decrement, reset } from "../store/slices/deviceSlice";


export const useDeviceCount = () => {

  const device = useSelector((state) => state.device.value);
  const dispatch = useDispatch()

  localStorage.setItem("device", device);

  // const deviceArray = new Array(device)

  const handleIncreaseDevice = (event) => {
    event.preventDefault();
    dispatch(increment());
  };

  const handleDecreaseDevice = (event) => {
    event.preventDefault();
    dispatch(decrement());

    if(device <= 0 ) {
      return dispatch( reset() )
    }

  };
  
  const handleResetDevice = (event) => {
    event.preventDefault();
    dispatch(reset());
  };

  const renderSpotToDevice = () => {

  }

  const amountToDeposit = device * 200


  return {
    //* Propiedades
    device,
    // deviceArray,
    amountToDeposit,


    //* Métodos
    renderSpotToDevice,
    handleIncreaseDevice,
    handleDecreaseDevice,
    handleResetDevice,
  };
};
