import { devitrackApi } from "../apis/devitrackApi";

export const whatsappNotice = async ({ bodyMessage, to, alertMessage }) => {
  const whatsappNotification = devitrackApi.post(
    "/twilio/send-whatsapp-notification",
    {
      body: bodyMessage,
      to: to,
    }
  );
  if (whatsappNotification) {
    alert(alertMessage);
  }
};


export const SMSNotice = async ({ bodyMessage, to, alertMessage }) => {
    const whatsappNotification = devitrackApi.post(
      "/twilio/send-sms-notification",
      {
        body: bodyMessage,
        to: to,
      }
    );
    if (whatsappNotification) {
      alert(alertMessage);
    }
  };
  