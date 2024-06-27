import {
  Button,
  Grid,
  InputAdornment,
  OutlinedInput,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import "./DeviceSelection.css";
import { useState, useCallback } from "react";
import {
  onAddCurrentDeviceSelection,
  onAddMultipleDeviceSelection,
  onAddNewOrder,
  onAddNewOrderToHistory,
} from "../../store/slides/deviceSlides";
import { useNavigate } from "react-router-dom";
import IndicatorProgressBottom from "../../components/indicatorBottom/IndicatorProgressBottom";
import { message } from "antd";
import {
  onAddAmountStripeInfo,
  onAddPaymentIntent,
} from "../../store/slides/stripeSlide";
import { devitrackApi } from "../../devitrakApi";
const SingleSelection = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const { consumer } = useSelector((state) => state.consumer);
  const { deviceSetup, eventInfoDetail } = useSelector((state) => state.event);
  const { customerStripe } = useSelector((state) => state.stripe);
  const [numberNeeded, setNumberNeeded] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const lessNumber = () => {
    if (numberNeeded < 1) return setNumberNeeded(0);
    return setNumberNeeded(parseInt(numberNeeded) - 1);
  };
  const addNumber = () => {
    return setNumberNeeded(Number(numberNeeded) + 1);
  };
  const detectNumberDevice = useCallback(
    () => dispatch(onAddCurrentDeviceSelection(numberNeeded)),
    [numberNeeded, dispatch]
  );
  detectNumberDevice();
  const warning = () => {
    messageApi.open({
      type: "warning",
      content: (
        <Typography
          textTransform={"none"}
          color={"var(--blue-dark-600, #155EEF)"}
          textAlign={"left"}
          fontFamily={"Inter"}
          fontSize={"14px"}
          fontStyle={"normal"}
          fontWeight={400}
          lineHeight={"22px"}
        >
          Hi,{" "}
          <span
            style={{
              textTransform: "capitalize",
            }}
          >
            {consumer?.name}
          </span>
          !
          <br />
          Device selection must be bigger than 0!
        </Typography>
      ),
    });
  };

  const retrieveRightValueWhenThereAreMoreThanOneDeviceSetForConsumerInEvent = () => {
    const result = new Set()
    for (let data of deviceSetup) {
      if (data.consumerUses !== "Sale") {
        result.add(Number(data.value))
      }
    }
    const objToArray = Array.from(result)
    return Math.max(...objToArray)
  }

  const submitDeviceSelectionInfo = async (event) => {
    event?.preventDefault();
    if (numberNeeded === 0) {
      return warning();
    }
    const stripeProfile = {
      customerEmail: consumer.email,
      // customerId: customerStripe.stripeid,
      device: retrieveRightValueWhenThereAreMoreThanOneDeviceSetForConsumerInEvent() ? numberNeeded * retrieveRightValueWhenThereAreMoreThanOneDeviceSetForConsumerInEvent() : 0,
    };
    if (numberNeeded > 0 && consumer) {
      const respStripe = await devitrackApi.post(
        "/stripe/create-payment-intent",
        stripeProfile
      );
      if (respStripe) {
        dispatch(
          onAddMultipleDeviceSelection({
            // deviceType: deviceSetup.at(-1).deviceType,
            deviceNeeded: numberNeeded,
            deviceValue: retrieveRightValueWhenThereAreMoreThanOneDeviceSetForConsumerInEvent(),
          })
        );
        dispatch(
          onAddNewOrder({
            // deviceType: deviceSetup.at(-1).deviceType,
            deviceNeeded: numberNeeded,
            deviceValue: retrieveRightValueWhenThereAreMoreThanOneDeviceSetForConsumerInEvent(),
          })
        );
        dispatch(
          onAddNewOrderToHistory({
            // deviceType: deviceSetup.at(-1).deviceType,
            deviceNeeded: numberNeeded,
            deviceValue: retrieveRightValueWhenThereAreMoreThanOneDeviceSetForConsumerInEvent(),
          })
        );
        dispatch(onAddPaymentIntent(respStripe.data));
        dispatch(onAddAmountStripeInfo(Number(numberNeeded)));
        if (eventInfoDetail.merchant) {
          return navigate(`/payment`);
        } else {
          return navigate(`/qr-code-generation`);
        }
      }
    }
  };
  return (
    <>
      {contextHolder}
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
          height={"50svh"}
          margin={"0 auto 8svh"}
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
              id="3"
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
                  Select how many devices you need.
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
                <OutlinedInput
                  value={numberNeeded}
                  name="numberNeeded"
                  type="number"
                  id="input-single-selection"
                  onChange={(e) => setNumberNeeded(e.target.value)}
                  style={{
                    borderRadius: "12px",
                    margin: "0.1rem auto 1rem",
                    textAlign: "center",
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
      <Grid
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
        item
        xs={12}
      >
        <IndicatorProgressBottom
          steps={eventInfoDetail.merchant ? 3 : 2}
          current={eventInfoDetail.merchant ? 75 : 100}
        />
      </Grid>{" "}
    </>
  );
};

export default SingleSelection;
