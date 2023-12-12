import { BottomNavigation, Grid, Typography } from "@mui/material";
import { Progress } from "antd";
import "./IndicatorProgressBottom.css";
import "./BottomNavigation.css";
import { useSelector } from "react-redux";
import React, { useCallback } from "react";
const IndicatorProgressBottom = ({ current, steps }) => {
  const urlDetector = window.location.pathname;
  const { currentSelectionDevice } = useSelector(
    (state) => state.deviceHandler
  );
  const validPaths = ['/deviceSelection', '/payment']
  const { eventInfoDetail, deviceSetup } = useSelector((state) => state.event);

  const sumOfDevicesNeeded = useCallback(() => {
    const findRightValueOfDevice = () => {
      const result = new Set()
      for (let data of deviceSetup) {
        if (data.consumerUses) {
          result.add(Number(data.value))
        }
      }
      const values = [...result]
      return Math.max(...values)
    }    
    return findRightValueOfDevice() * currentSelectionDevice;
  }, [currentSelectionDevice, deviceSetup]);
  
  return (
    <BottomNavigation
      key={urlDetector}
      className="bottom-navigation"
      style={{
        display: "flex",
        width: "100%",
        height: "25dvh",
        flexDirection: "column",
        alignItems: "flex-start",
        gap: "10px",
        borderRadius: "20px 20px 0px 0px",
        background: "var(--base-white, #fff)",
        boxShadow: "0px -4px 4px 0px rgba(0, 0, 0, 0.05)",
      }}
    >
      {validPaths.includes(urlDetector) && eventInfoDetail.merchant && (
        <Grid
          style={{
            margin: "0rem 0rem 0.5rem",
          }}
          container
        >
          <Grid padding={"0 35px 0 35px"} item xs={12}>
            <Typography
              color={"var(--gray-900, #101828)"}
              /* Display xs/Semibold */
              fontFamily={"Inter"}
              fontSize={"24px"}
              fontStyle={"normal"}
              fontWeight={600}
              lineHeight={"32px"}
              padding={"25px 0px 10px 0px"}
            >
              Total deposit: ${sumOfDevicesNeeded()}
            </Typography>
            <Typography
              color={"var(--gray-600, #475467)"}
              /* Display xs/Semibold */
              fontFamily={"Inter"}
              fontSize={"16px"}
              fontStyle={"normal"}
              fontWeight={400}
              lineHeight={"24px"}
            >
              We will collect your deposit on the next page.
            </Typography>
          </Grid>
        </Grid>
      )}
      <Grid
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        margin={"0 auto 5svh"}
        item
        xs={10}
      >
        <Progress
          steps={steps}
          percent={current}
          showInfo={false}
          size={[70, 10]}
        />
      </Grid>
    </BottomNavigation>
  );
};

export default IndicatorProgressBottom;
