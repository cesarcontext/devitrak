import { useInterval } from "interval-hooks";
import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { devitrackApi } from "../../apis/devitrackApi";
import { SMSNotice, whatsappNotice } from "../../helper/Notifications";
import "../../style/component/ui/ReturnDeviceAlert.css";

export const ReturnDeviceAlert = () => {
  const { users } = useSelector((state) => state.contactInfo);

  const [language, setLanguage] = useState(false);
  const [poolReceivers, setPoolReceivers] = useState([]);
  const [remainingDays, setRemainingDays] = useState(0);
  const [remainingHours, setRemainingHours] = useState(0);
  const notificationSent = useRef(0);

  const checkActivatedReceivers = async () => {
    const response = await devitrackApi.get("/receiver/receiver-assigned-list");
    if (response) {
      setPoolReceivers(response.data.listOfReceivers);
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    checkActivatedReceivers();
    return () => {
      controller.abort();
    };
  }, []);

  useInterval(() => {
    const dueDate = new Date("2023-02-07 17:13:00");
    const currentDate = new Date();
    const timeDifference = dueDate.getTime() - currentDate.getTime();
    console.log("🚀 ~ file: ReturnDeviceAlert.js:36 ~ useInterval ~ timeDifference", timeDifference)
    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    if (notificationSent.current < 1) {
      if (timeDifference < 0 && timeDifference > -500) {
        return (
          <>
            {whatsappNotice({
              bodyMessage:
                "This is a friendly reminder about to return your device(s)",
              to: `${users.phoneNumber}`,
              alertMessage: `A whatsapp notification has been sent to ${users.name}, phone # ${users.phoneNumber}`,
            })}
            {SMSNotice({
              bodyMessage:
                "This is a friendly reminder about to return your device(s)",
              to: `${users.phoneNumber}`,
              alertMessage: `A SMS notification has been sent to ${users.name}, phone # ${users.phoneNumber}`,
            })}
            {notificationSent.current = 1}
          </>
        );
      }
    }
    setRemainingDays(days);
    setRemainingHours(hours);
  }, 1_000);

  const listOfDevice = new Map();
  const selectDevicePerUser = async () => {
    poolReceivers?.map((transaction) => {
      if (transaction.user === users.email) {
        transaction.device.map((item) => {
          if (item.status === true) {
            listOfDevice.set(item.serialNumber, item.status);
          }
        });
      }
    });
    return listOfDevice;
  };
  selectDevicePerUser();
  const changeLanguage = () => {
    setLanguage(!language);
  };
  return (
    <div>
      <div className="container-alert-info">
        {language === false ? (
          listOfDevice.size > 0 ? (
            <div className="alert-message-loading-true">
              <div
                className="alert alert-danger d-flex align-items-center"
                role="alert"
              >
                {" "}
                <p onClick={changeLanguage}>
                  {language === true ? "English" : "Portuguese"}
                </p>{" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="50"
                  height="35"
                  fill="currentColor"
                  className="bi bi-exclamation-triangle"
                  viewBox="0 0 16 16"
                >
                  <path d="M7.938 2.016A.13.13 0 0 1 8.002 2a.13.13 0 0 1 .063.016.146.146 0 0 1 .054.057l6.857 11.667c.036.06.035.124.002.183a.163.163 0 0 1-.054.06.116.116 0 0 1-.066.017H1.146a.115.115 0 0 1-.066-.017.163.163 0 0 1-.054-.06.176.176 0 0 1 .002-.183L7.884 2.073a.147.147 0 0 1 .054-.057zm1.044-.45a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566z" />
                  <path d="M7.002 12a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 5.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995z" />
                </svg>
                <div>
                  <h4>
                    You need to return {listOfDevice.size}{" "}
                    {listOfDevice.size > 1 ? "devices" : "device"}
                  </h4>
                  <span>
                    <span style={{ textDecoration: "underline" }}>
                      You have {remainingDays} days and {remainingHours} hours
                      remaining{" "}
                    </span>
                    <br />
                    Devices not returned on <strong>Jan 17th</strong> will be
                    charged to your credit card on file.
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div
              className="alert alert-success d-flex align-items-center"
              role="alert"
            >
              <p onClick={changeLanguage}>
                {language === true ? "English" : "Portuguese"}
              </p>{" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="50"
                height="35"
                fill="currentColor"
                className="bi bi-check-circle-fill"
                viewBox="0 0 16 16"
              >
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
              </svg>
              <div>
                <h4>There is not pending devices.</h4>
                <span>You have returned all your devices.</span>
              </div>
            </div>
          )
        ) : listOfDevice.size > 0 ? (
          <div className="alert-message-loading-true">
            <div
              className="alert alert-danger d-flex align-items-center"
              role="alert"
            >
              <p onClick={changeLanguage}>
                {language === true ? "English" : "Portuguese"}
              </p>{" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="50"
                height="35"
                fill="currentColor"
                className="bi bi-exclamation-triangle"
                viewBox="0 0 16 16"
              >
                <path d="M7.938 2.016A.13.13 0 0 1 8.002 2a.13.13 0 0 1 .063.016.146.146 0 0 1 .054.057l6.857 11.667c.036.06.035.124.002.183a.163.163 0 0 1-.054.06.116.116 0 0 1-.066.017H1.146a.115.115 0 0 1-.066-.017.163.163 0 0 1-.054-.06.176.176 0 0 1 .002-.183L7.884 2.073a.147.147 0 0 1 .054-.057zm1.044-.45a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566z" />
                <path d="M7.002 12a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 5.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995z" />
              </svg>
              <div>
                <h4>
                  Você precisa voltar {listOfDevice.size}{" "}
                  {listOfDevice.size > 1 ? "dispositivos" : "dispositivo"}
                </h4>
                <span>
                  <span style={{ textDecoration: "underline" }}>
                    você tem {remainingDays} dias e {remainingHours} horas
                    restantes{" "}
                  </span>
                  <br />
                  Os dispositivos não devolvidos em{" "}
                  <strong>17 de Janeiro</strong> serão cobrados em seu cartão de
                  crédito registrado.
                </span>
              </div>
            </div>
          </div>
        ) : (
          <div
            className="alert alert-success d-flex align-items-center"
            role="alert"
          >
            {" "}
            <p onClick={changeLanguage}>
              {language === true ? "English" : "Portuguese"}
            </p>{" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="50"
              height="35"
              fill="currentColor"
              className="bi bi-check-circle-fill"
              viewBox="0 0 16 16"
            >
              <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
            </svg>
            <div>
              <h4>Não há dispositivos pendentes.</h4>
              <span>Você devolveu todos os seus dispositivos.</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
