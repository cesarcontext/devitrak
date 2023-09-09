import {
  Button,
  Grid,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import "./DeviceSelection.css";
import { useState } from "react";
import { onAddMultipleDeviceSelection, onAddNewOrder, onAddNewOrderToHistory } from "../../store/slides/deviceSlides";
import { useNavigate } from "react-router-dom";

const SingleSelection = () => {
  const { consumer } = useSelector((state) => state.consumer);
  const { deviceSetup, eventInfoDetail } = useSelector((state) => state.event);
  const [numberNeeded, setNumberNeeded] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const lessNumber = () => {
    if (numberNeeded < 1) return setNumberNeeded(0);
    return setNumberNeeded((parseInt(numberNeeded) - 1));
  };
  const addNumber = () => {
    return setNumberNeeded((parseInt(numberNeeded) + 1));
  };
  const submitDeviceSelectionInfo = (event) => {
    event?.preventDefault();
    dispatch(
      onAddMultipleDeviceSelection({
        deviceType: deviceSetup.at(-1).deviceType,
        deviceNeeded: numberNeeded,
        deviceValue: deviceSetup.at(-1).deviceValue,
      })
    );
    dispatch(onAddNewOrder({
      deviceType: deviceSetup.at(-1).deviceType,
      deviceNeeded: numberNeeded,
      deviceValue: deviceSetup.at(-1).deviceValue,
    }))
    dispatch(onAddNewOrderToHistory({
      deviceType: deviceSetup.at(-1).deviceType,
      deviceNeeded: numberNeeded,
      deviceValue: deviceSetup.at(-1).deviceValue,
    }))
    if (!eventInfoDetail.merchant) {
      return navigate(`/qr-code-generation`);
    } else {
      return navigate(`/qr-code-generation`);
    }
  };
  return (
    <>
      <Grid
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"center"}
        alignItems={"center"}
        gap={2}
        container
      >
        <Grid
          display={"flex"}
          justifyContent={"center"}
          alignSelf={"stretch"}
          gap={2}
          container
        >
          <Grid display={"flex"} justifyContent={"center"} item xs={10}>
            <form
              style={{
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
              }}
              className="form"
            >
              <Grid
                display={"flex"}
                flexDirection={"column"}
                alignItems={"center"}
                alignSelf={"stretch"}
                justifyContent={"center"}
                item
                xs={12}
                margin={"1rem 0"}
              >
                <Typography
                  textTransform={"none"}
                  color={"var(--gray-900, #101828)"}
                  textAlign={"left"}
                  /* Display xs/Semibold */
                  fontFamily={"Inter"}
                  fontSize={"24px"}
                  fontStyle={"normal"}
                  fontWeight={600}
                  lineHeight={"32px"}
                >
                  Hi,{" "}
                  <span
                    style={{
                      textTransform: "capitalize",
                    }}
                  >
                    {consumer?.name}
                  </span>
                  ! Select amount{" "}
                </Typography>
              </Grid>
              <Grid
                display={"flex"}
                flexDirection={"column"}
                alignItems={"center"}
                alignSelf={"stretch"}
                justifyContent={"center"}
                item
                xs={12}
                margin={"1rem 0"}
              >
                <Typography
                  color={"var(--gray-600, #475467"}
                  textAlign={"center"}
                  /* Display xs/Semibold */
                  fontFamily={"Inter"}
                  fontSize={"16px"}
                  fontStyle={"normal"}
                  fontWeight={500}
                  lineHeight={"24px"}
                >
                  Select the amount of device you need.
                </Typography>
              </Grid>

              <Grid
                display={"flex"}
                flexDirection={"column"}
                alignItems={"center"}
                justifyContent={"center"}
                item
                xs={12}
                margin={"1rem 0"}
              >
                {/* <InputLabel style={{ marginBottom: "3px", width: "100%" }}>
                  <Typography
                    textTransform={"none"}
                    textAlign={"left"}
                    fontFamily={"Inter"}
                    fontSize={"14px"}
                    fontStyle={"normal"}
                    fontWeight={500}
                    lineHeight={"20px"}
                    color={"var(--gray-700, #344054)"}
                  >
                    Amount needed
                  </Typography>
                </InputLabel> */}
                <OutlinedInput
                  value={numberNeeded}
                  name="numberNeeded"
                  onChange={(e) => setNumberNeeded(e.target.value)}
                  style={{
                    borderRadius: "12px",
                    margin: "0.1rem auto 1rem",
                  }}
                  startAdornment={
                    <InputAdornment
                      onClick={() => lessNumber()}
                      position="start"
                    >
                      <Typography fontSize={"24px"}>-</Typography>
                    </InputAdornment>
                  }
                  endAdornment={
                    <InputAdornment onClick={() => addNumber()} position="end">
                      <Typography fontSize={"24px"}>+</Typography>
                    </InputAdornment>
                  }
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} margin={"1rem 0"}>
                <Button
                  onClick={submitDeviceSelectionInfo}
                  style={{
                    display: "flex",
                    padding: "12px 20px",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "8px",
                    alignSelf: "stretch",
                    borderRadius: "8px",
                    border: "1px solid var(--blue-dark-600, #155EEF)",
                    background: "var(--blue-dark-600, #155EEF)",
                    boxShadow: "0px 1px 2px 0px rgba(16, 24, 40, 0.05)",
                    width: "100%",
                  }}
                >
                  <Typography
                    textTransform={"none"}
                    fontFamily={"Inter"}
                    fontSize={"16px"}
                    fontStyle={"normal"}
                    fontWeight={600}
                    lineHeight={"24px"}
                    color={"var(--base-white, #FFF)"}
                  >
                    Continue{" "}
                  </Typography>
                </Button>
              </Grid>
            </form>
          </Grid>{" "}
        </Grid>
      </Grid>
    </>
  );
};

export default SingleSelection;
