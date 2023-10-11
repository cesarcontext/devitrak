import { Button, Grid, Typography } from "@mui/material";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const HandleErrorPage = () => {
  const navigate = useNavigate();
  const handle404ErrorPageTakingConsumerToInitialPage = () => {
    return navigate("/", { replace: true });
  };

  return (
    <Grid
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      alignSelf={"stretch"}
      container
    >
      <Grid
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        margin={"0.5rem auto"}
        item
        xs={10}
      >
        <Typography
          fontSize={"26px"}
          fontFamily={"Inter"}
          fontWeight={700}
          lineHeight={"38px"}
        >
          Opps
        </Typography>
      </Grid>
      <Grid
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        margin={"0.5rem auto"}
        item
        xs={10}
      >
        <Typography
          fontSize={"18px"}
          fontFamily={"Inter"}
          fontWeight={700}
          lineHeight={"28px"}
        >
          404 - Page not found.
        </Typography>
      </Grid>
      <Grid
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        margin={"0.5rem auto"}
        item
        xs={10}
      >
        <Typography
          textAlign={"center"}
          fontSize={"12px"}
          fontFamily={"Inter"}
          fontWeight={700}
          lineHeight={"22px"}
        >
          The page you are looking for might be removed, had its nme changed or
          is temporarily unavailable.{" "}
        </Typography>
      </Grid>
      <Grid
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        margin={"0.5rem auto"}
        item
        xs={10}
      >
        <Button style={{
          width:"fit-content",
          
        }} onClick={() => handle404ErrorPageTakingConsumerToInitialPage()}>
           <Typography
          textAlign={"center"}
          fontSize={"12px"}
          fontFamily={"Inter"}
          fontWeight={700}
          lineHeight={"22px"}
        >
          Click here to go to the main page.
        </Typography>
        </Button>
       
      </Grid>
    </Grid>
  );
};

export default HandleErrorPage;
