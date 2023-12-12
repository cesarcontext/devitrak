import { Grid, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import "./SupportMainPage.css";
const SupportMainPage = () => {
  const { event } = useSelector((state) => state.event);

  const beginDateRef = new Date(`${event.eventInfoDetail.dateBegin}`)
    .toString()
    .split(" ")
    .slice(0, 5)
    .join()
    .replaceAll(",", " ");
  const endDateRef = new Date(`${event.eventInfoDetail.dateEnd}`)
    .toString()
    .split(" ")
    .slice(0, 5)
    .join()
    .replaceAll(",", " ");

  return (
    <Grid
      container
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Grid margin={"0.5rem auto 1rem"} container>
        <Grid
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
          item
          xs={12}
          margin={"0.5rem auto 0"}
        >
          <Typography
            color={"var(--gray-900, #101828)"}
            textAlign={"center"}
            fontFamily={"Inter"}
            fontSize={"18px"}
            fontStyle={"normal"}
            fontWeight={600}
            lineHeight={"28px"}
            style={{
              textWrap: "balance",
            }}
          >
            Support
          </Typography>
        </Grid>
        <Grid
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
          item
          xs={12}
          margin={"0.5rem auto 0"}
        >
          <Typography
            color={"var(--gray-600, #475467)"}
            textAlign={"center"}
            fontFamily={"Inter"}
            fontSize={"16px"}
            fontStyle={"normal"}
            fontWeight={500}
            lineHeight={"24px"}
            style={{
              textWrap: "balance",
            }}
          >
            Our friendly team is here to help.
          </Typography>
        </Grid>
        <Grid
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
          item
          xs={12}
          margin={"0.5rem auto 0"}
        >
          <Typography
            color={"var(--blue-dark-700, #004EEB)"}
            textAlign={"center"}
            fontFamily={"Inter"}
            fontSize={"16px"}
            fontStyle={"normal"}
            fontWeight={600}
            lineHeight={"24px"}
            style={{
              textWrap: "balance",
            }}
          >
            {event.contactInfo.email}
          </Typography>
        </Grid>
      </Grid>
      <Grid container>
        <Grid
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
          item
          xs={12}
          margin={"0.5rem auto 0"}
        >
          <Typography
            color={"var(--gray-900, #101828)"}
            textAlign={"center"}
            fontFamily={"Inter"}
            fontSize={"18px"}
            fontStyle={"normal"}
            fontWeight={600}
            lineHeight={"28px"}
            style={{
              textWrap: "balance",
            }}
          >
            Phone
          </Typography>
        </Grid>
        <Grid
          display={"flex"}
          flexDirection={"column"}
          alignItems={"center"}
          justifyContent={"center"}
          item
          xs={12}
          margin={"0.5rem auto 0"}
        >
          <Grid
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
            item
            xs={12}
            margin={"0.5rem auto 0"}
          >
            <Typography
              color={"var(--gray-600, #475467)"}
              textAlign={"center"}
              fontFamily={"Inter"}
              fontSize={"16px"}
              fontStyle={"normal"}
              fontWeight={500}
              lineHeight={"24px"}
              style={{
                textWrap: "balance",
              }}
            >
              {beginDateRef}
            </Typography>
          </Grid>
          <Grid
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
            item
            xs={12}
            margin={"0.5rem auto 0"}
          >
            <Typography
              color={"var(--gray-600, #475467)"}
              textAlign={"center"}
              fontFamily={"Inter"}
              fontSize={"16px"}
              fontStyle={"normal"}
              fontWeight={500}
              lineHeight={"24px"}
              style={{
                textWrap: "balance",
              }}
            >
              {endDateRef}
            </Typography>
          </Grid>
        </Grid>
        <Grid
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
          item
          xs={12}
          sm={12}
          md={6}
          margin={"1rem auto 0"}
        >
          <Typography
            color={"var(--blue-dark-700, #004EEB)"}
            textAlign={"center"}
            fontFamily={"Inter"}
            fontSize={"16px"}
            fontStyle={"normal"}
            fontWeight={600}
            lineHeight={"24px"}
            style={{
              textWrap: "balance",
            }}
          >
            <PhoneInput
              disabled
              className="phone-input-form"
              value={`${event.eventInfoDetail.phoneNumber}`}
            />
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};
export default SupportMainPage;
