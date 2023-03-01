import React, { useState } from "react";
import Modal from "react-modal";
import { devitrackApi } from "../../../apis/devitrackApi";
import { SMSNotice, whatsappNotice } from "../../../helper/Notifications";
// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
const customStyles = {
  content: {
    width: "50vw",
    height: "50vh",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

export const ModalNotification = ({
  userToDisplay,
  notificationActivation,
  setNotificationActivation,
}) => {
  const [message, setMessage] = useState("");
  if (notificationActivation !== false) {
    Modal.setAppElement("#root");
  }
  function closeModal() {
    setNotificationActivation(false);
  }

  const handleSubmitNotification = async (event) => {
    try {
      event.preventDefault();
      let info = `${userToDisplay?.phoneNumber}`;
      // const response = await devitrackApi.post(
      //   "/twilio/send-whatsapp-notification",
      //   {
      //     body: ,
      //     to: info,
      //   }
      // );
      // if (response) {
      await whatsappNotice({
        bodyMessage: message,
        to: info,
        alertMessage: `The notification was sent to ${info} successfully`,
      });
      await SMSNotice({
        bodyMessage: message,
        to: info,
        alertMessage: `The notification was sent to ${info} successfully`,
      });
      setMessage("");
      closeModal();
      // }
    } catch (error) {
      alert(error.response.data.msg);
    }
  };

  return (
    <div>
      <Modal
        isOpen={notificationActivation}
        onRequestClose={closeModal}
        style={customStyles}
        shouldCloseOnOverlayClick={false}
      >
        <form
          onSubmit={handleSubmitNotification}
          style={{
            margin: "0 auto",
            display: "flex",
            flexDirection: "column",
            height: "100%",
            justifyContent: "space-around",
          }}
        >
          <strong>To: {userToDisplay?.phoneNumber}</strong>

          <textarea
            name="message"
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            style={{ height: "35vh", border: "solid 1px" }}
          />
          <button type="submit">Send</button>
        </form>
      </Modal>
    </div>
  );
};
