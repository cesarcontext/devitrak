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
import { Select } from "antd";
import { Icon } from "@iconify/react";
import { useState } from "react";
import {
  onAddMultipleDeviceSelection,
  onAddNewOrder,
  onAddNewOrderToHistory,
} from "../../store/slides/deviceSlides";
import TableMultipleDeviceType from "./TableMultipleDeviceType.jsx";
import { useNavigate } from "react-router-dom";

const MultipleSelection = () => {
  const { consumer } = useSelector((state) => state.consumer);
  const { deviceSetup, eventInfoDetail } = useSelector((state) => state.event);
  const { multipleDeviceSelection } = useSelector(
    (state) => state.deviceHandler
  );
  const [numberNeeded, setNumberNeeded] = useState(0);
  const [deviceTypeSelected, setDeviceTypeSelected] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const lessNumber = () => {
    if (numberNeeded < 1) return setNumberNeeded(0);
    return setNumberNeeded(numberNeeded - 1);
  };
  const addNumber = () => {
    return setNumberNeeded(numberNeeded + 1);
  };
  const onChange = (value) => {
    const valueParse = JSON.parse(value)
    return setDeviceTypeSelected(valueParse);
  };

  const options = deviceSetup?.map((device) => {
    if (device?.consumerUses) {
      return {
        value: JSON.stringify(device),
        label: device.group,
      };
    }
    return null;
  });

  const addDeviceTypeAndNumberOfDeviceNeeded = (event) => {
    event?.preventDefault();
    dispatch(
      onAddMultipleDeviceSelection({
        deviceType: deviceTypeSelected.group,
        deviceNeeded: numberNeeded,
        deviceValue: deviceTypeSelected.value,
      })
    );

    setNumberNeeded(0);
    setDeviceTypeSelected(null);
    return window.location.reload();
  };
  const submitDeviceSelectionInfo = (event) => {
    event?.preventDefault();
    dispatch(onAddNewOrder(multipleDeviceSelection));
    dispatch(onAddNewOrderToHistory(multipleDeviceSelection));
    if (!eventInfoDetail.merchant) {
      return navigate("/qr-code-generation");
    } else {
      return navigate("/qr-code-generation");
    }
  };
  return (
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
                textAlign={"center"}
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
                Select the amount of devices you need.
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
              <InputLabel style={{ marginBottom: "3px", width: "100%" }}>
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
                  Device type
                </Typography>
              </InputLabel>
              <Select
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  fontSize: "1rem",
                  lineHeight: "1.4375em",
                  height: "3rem",
                  borderRadius: " 12px",
                }}
                showSearch
                placeholder="Select the type of device your need"
                optionFilterProp="children"
                onChange={onChange}
                filterOption={(input, option) =>
                  (option?.label ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                options={options}
              />
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
              <InputLabel style={{ marginBottom: "3px", width: "100%" }}>
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
              </InputLabel>
              <OutlinedInput
                value={numberNeeded}
                name="numberNeeded"
                onChange={(e) => setNumberNeeded(e.target.value)}
                style={{
                  borderRadius: "12px",
                  margin: "0.1rem auto 1rem",
                }}
                startAdornment={
                  <InputAdornment onClick={() => lessNumber()} position="start">
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
            <Grid
              display={"flex"}
              alignItems={"center"}
              justifyContent={"center"}
              item
              xs={12}
              margin={"1rem 0"}
            >
              <Button
                onClick={() => addDeviceTypeAndNumberOfDeviceNeeded()}
                style={{
                  display: "flex",
                  padding: "16px 10px",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "8px",
                  alignSelf: "stretch",
                  borderRadius: "8px",
                  border: "1px solid 1px solid var(--blue-dark-50, #EFF4FF)",
                  background: "var(--blue-dark-100, #D1E0FF)",
                  boxShadow: "0px 1px 2px 0px rgba(16, 24, 40, 0.05)",
                  width: "75%",
                }}
              >
                <Typography
                  textTransform={"none"}
                  fontFamily={"Inter"}
                  fontSize={"14px"}
                  fontStyle={"normal"}
                  fontWeight={600}
                  lineHeight={"20px"}
                  color={"var(--blue-dark-800, #0040C1)"}
                  display={"flex"}
                  alignItems={"center"}
                >
                  <Icon icon="ic:baseline-plus" width={20} height={20} />
                  &nbsp;Add another device type
                </Typography>
              </Button>
            </Grid>
            <TableMultipleDeviceType />
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
  );
};

export default MultipleSelection;
