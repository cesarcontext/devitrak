import { BottomNavigation, Grid, Typography } from "@mui/material";
import { Progress } from "antd";
import "./IndicatorProgressBottom.css";
import "./BottomNavigation.css";
import { useSelector } from "react-redux";
import React from "react";
const IndicatorProgressBottom = ({ current }) => {
  const urlDetector = window.location.pathname;
  const { multipleDeviceSelection } = useSelector(
    (state) => state.deviceHandler
  );
  const { eventInfoDetail } = useSelector((state) => state.event);
  const sumOfDevicesNeeded = () => {
    let result = [];
    let index = 0;
    for (let data of multipleDeviceSelection) {
      result.splice(
        index,
        0,
        parseInt(data.deviceNeeded) * parseInt(data.deviceValue)
      );
      index++;
    }
    return result.reduce((accumulator, current) => accumulator + current, 0);
  };

  return (
    <BottomNavigation
      key={urlDetector}
      className="bottom-navigation"
      sx={{
        display: "flex",
        width: "100%",
        padding: "32px 0px",
        flexDirection: "column",
        alignItems: "flex-start",
        gap: "24px",
        borderRadius: "20px 20px 0px 0px",
        background: "var(--base-white, #fff)",
        boxShadow: "0px -4px 4px 0px rgba(0, 0, 0, 0.05)",
      }}
    >
      {urlDetector === "/deviceSelection" && eventInfoDetail.merchant && (
        <Grid
          style={{
            margin: "1.5rem 0 0.5rem 0",
          }}
          container
        >
          <Grid item xs={12}>
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
        margin={"0 auto"}
        item
        xs={10}
      >
        <Progress
          steps={2}
          percent={current}
          showInfo={false}
          size={[70, 10]}
        />
      </Grid>
    </BottomNavigation>
  );
};

export default IndicatorProgressBottom;
