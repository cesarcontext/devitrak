import { Grid } from "@mui/material";
import { useState } from "react";
import "react-phone-number-input/style.css";
import { useSelector } from "react-redux";
import ConsumerInitialForm from "./ConsumerInitialForm";
import "./ConsumerInitialForm.css";
import ExistingConsumerForm from "./ExistingConsumerForm";

const MainPage = () => {
  const [consumerInfoFound, setConsumerInfoFound] = useState([]);
  const { event } = useSelector((state) => state.event);
  const emailSentRef = {
    current: false,
  };

  const resettingFields = () => {
    setValue("email", "");
    setValue("firstName", "");
    setValue("lastName", "");
    setContactPhoneNumber("");
    setGroupName("");
    setConsumerInfoFound([]);
    return;
  };
  const resetForm = () => {
    emailSentRef.current = false;
    return resettingFields();
  };

  const renderButtonTitle = () => {
    if (event.eventInfoDetail.merchant) {
      return "Next step";
    } else {
      if (emailSentRef.current) {
        return "Send email again";
      }
      return "Send login email";
    }
  };
  return (
    <>
      <Grid
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"center"}
        alignItems={"center"}
        margin={"0 0 2rem"}
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
          {consumerInfoFound.length > 0 ? (
            <ExistingConsumerForm
              props={consumerInfoFound}
              resetForm={resetForm}
              renderButtonTitle={renderButtonTitle}
              setConsumerInfoFound={setConsumerInfoFound}
              emailSentRef={emailSentRef}
            />
          ) : (
            <ConsumerInitialForm
              resetForm={resetForm}
              renderButtonTitle={renderButtonTitle}
              setConsumerInfoFound={setConsumerInfoFound}
              emailSentRef={emailSentRef}
            />
          )}
        </Grid>
      </Grid>
    </>
  );
  // }
};

export default MainPage;
