import { useQuery } from "@tanstack/react-query";
import { devitrackApi } from "../../devitrakApi";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import {
  onAddContactInfo,
  onAddDeviceSetup,
  onAddEventData,
  onAddEventInfoDetail,
  onAddEventStaff,
  onAddSubscriptionInfo,
  onSelectCompany,
  onSelectEvent,
} from "../../store/slides/eventSlide";
import { Grid, Typography } from "@mui/material";
import Logo from "../../assets/devitrak_logo.svg";
import Devitrak from "../../assets/Layer_1.svg";
import "animate.css";
import { detector } from "./OperatingSystemDetecting";
import { onDetectingBrowser } from "../../store/slides/helperSlide";
import { checkArray } from "../../components/utils/checkArray";
import { onAddCompanyInfo } from "../../store/slides/companySlide";
import { onResetConsumerInfo } from "../../store/slides/consumerSlide";

const Home = () => {
  const [existingEvent, setExistingEvent] = useState(false);
  const eventUrl = new URLSearchParams(window.location.search).get("event");
  const companyUrl = new URLSearchParams(window.location.search).get("company");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const listOfEventsQuery = useQuery({
    queryKey: ["listOfEvents"],
    queryFn: () =>
      devitrackApi.post("/event/event-list", {
        _id: eventUrl,
      }),
    refetchOnMount: false,
  });
  const companyEventQuery = useQuery({
    queryKey: ["companyInfoEvent"],
    queryFn: () =>
      devitrackApi.post("/company/search-company", {
        _id: companyUrl,
      }),
    refetchOnMount: false,
  });

  useEffect(() => {
    const controller = new AbortController();
    listOfEventsQuery.refetch();
    companyEventQuery.refetch();

    return () => {
      controller.abort();
    };
  }, [listOfEventsQuery.isLoading, companyEventQuery.isLoading]);

  const companyInformation = useCallback(() => {
    if (companyEventQuery.data) {
      const companyInfo = checkArray(companyEventQuery.data.data.company);
      return companyInfo;
    }
    return null;
  }, [companyEventQuery.data, companyUrl, eventUrl]);
  companyInformation();

  const foundEventInfo = useCallback(() => {
    if (listOfEventsQuery.data) {
      const eventInfo = checkArray(listOfEventsQuery.data.data.list);
      return eventInfo;
    }
    return null;
  }, [listOfEventsQuery.data, companyUrl, eventUrl]);
  foundEventInfo();

  const addEventInfoAndNavigate = () => {
    if (foundEventInfo() && companyInformation()) {
      if (foundEventInfo()?.active) {
        dispatch(onAddCompanyInfo(companyInformation()));
        dispatch(onAddEventData(foundEventInfo()));
        dispatch(onAddEventInfoDetail(foundEventInfo().eventInfoDetail));
        dispatch(onAddEventStaff(foundEventInfo().staff));
        dispatch(onSelectEvent(foundEventInfo().eventInfoDetail.eventName));
        dispatch(onSelectCompany(foundEventInfo().company));
        dispatch(onAddDeviceSetup(foundEventInfo().deviceSetup));
        dispatch(onAddContactInfo(foundEventInfo().contactInfo));
        dispatch(onAddSubscriptionInfo(foundEventInfo().subscription));
        setTimeout(() => {
          dispatch(onResetConsumerInfo())
          navigate("/initial-form");
        }, 2000);
      } else {
        return setExistingEvent(true);
      }
    }
  };
  useEffect(() => {
    const controller = new AbortController();
    addEventInfoAndNavigate();
    dispatch(onDetectingBrowser(detector()));
    return () => {
      controller.abort();
    };
  }, [listOfEventsQuery.isLoading, listOfEventsQuery.data]);
  if (listOfEventsQuery.data) {
    return (
      <Grid container>
        {existingEvent && (
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
              margin={"1rem 0"}
            >
              <Typography
                color={"red"}
                textAlign={"center"}
                fontFamily={"Inter"}
                fontSize={"14px"}
                fontStyle={"normal"}
                fontWeight={500}
                lineHeight={"20px"}
                style={{
                  textWrap: "balance",
                  textDecoration: "underline",
                }}
              >
                {foundEventInfo().eventInfoDetail.eventName} is already ended or
                does not exist.
              </Typography>
            </Grid>
          </Grid>
        )}
        <Grid
          display={"flex"}
          flexDirection={"column"}
          alignItems={"center"}
          justifyContent={"center"}
          margin={"2rem auto"}
          style={{
            position: "absolute",
            top: "25%",
            bottom: "25%",
          }}
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
            {" "}
            <Typography
              color={"var(--gray-900, #101828)"}
              textAlign={"center"}
              fontFamily={"Inter"}
              fontSize={"20px"}
              fontStyle={"normal"}
              fontWeight={600}
              lineHeight={"30px"}
              style={{
                textWrap: "balance",
              }}
            >
              Welcome to{" "}
            </Typography>
            <br />
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
      </Grid>
    );
  }
};

export default Home;
