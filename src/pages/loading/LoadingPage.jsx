import { Grid, Typography } from "@mui/material";
import Logo from "../../assets/devitrak_logo.svg";
import Devitrak from "../../assets/Layer_1.svg";

const LoadingPage = () => {
  return (
        <Grid
          display={"flex"}
          flexDirection={"column"}
          alignItems={"center"}
          justifyContent={"center"}
          margin={"2rem auto"}
          container
        >
          <Grid
            display={"flex"}
            flexDirection={"column"}
            alignItems={"center"}
            justifyContent={"center"}
            item
            xs={10}
            margin={"2rem 0"}
          >
            <div style={{ display: "flex" }}>
              <div className="animate__animated animate__backInLeft animate__delay-0.8s">
                <img src={Logo} alt="logo" style={{ width: "50px" }} />
                {/* <img src={Devitrak} alt="name" style={{ width: "100px" }} /> */}
              </div>
              <div className="animate__animated animate__backInRight animate__delay-0.8s">
                {/* <img src={Logo} alt="logo" style={{ width: "50px" }} /> */}
                <img src={Devitrak} alt="name" style={{ width: "100px" }} />
              </div>
            </div>
            <br />
            <Typography
              color={"var(--gray-900, #101828)"}
              textAlign={"center"}
              fontFamily={"Inter"}
              fontSize={"14px"}
              fontStyle={"normal"}
              fontWeight={500}
              lineHeight={"20px"}
              style={{
                textWrap: "balance",
              }}
            >
              Safeguard your devices
            </Typography>
          </Grid>
        </Grid>
  );
};

export default LoadingPage;
