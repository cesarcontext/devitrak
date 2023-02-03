import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { devitrackApi } from "../../../apis/devitrackApi";
import { NoticeTransactionWentTrue } from "../../../page/admin/NoticeTransactionWentTrue";
import { StripeCheckoutElementAdmin } from "../../stripe/StripeCheckoutElementAdmin";
import "../../stripe/checkoutStyles.css";

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
let customStyles = {
  content: {
    width: "25vw",
    height: "60vh",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};
export const ModalPaidTransaction = ({
  createTransactionPaid,
  setCreateTransactionPaid,
  userData,
}) => {
  const userEmail = userData.email;
  const [device, setDevice] = useState(0);
  const [clientSecret, setClientSecret] = useState("");
  const [customerStripeId, setCustomerStripeId] = useState([]);

  const [displaySelection, setDisplaySelection] = useState(true);
  if (createTransactionPaid !== false) {
    Modal.setAppElement("#root");
  }
  function closeModal() {
    setCreateTransactionPaid(false);
  }

  useEffect(() => {
    const callStripeCustomerFind = async () => {
      const response = await devitrackApi.get("/stripe/customers");
      if (response) {
        return setCustomerStripeId(response.data.customer);
      }
    };
    return () => callStripeCustomerFind();
  }, [userData.id, device]); // eslint-disable-next-line

  let stripeId;

  useEffect(() => {
    for (let i = 0; i < customerStripeId.length; i++) {
      if (customerStripeId[i].email === userEmail) {
        console.log((stripeId = customerStripeId[i].id));
      }
    }
  }, [device]);

  if (device < 0) {
    return setDevice(0);
  }
  const handleSubmitDeviceSelection = async (event) => {
    event.preventDefault();

    const response = await devitrackApi.post("/stripe/create-payment-intent", {
      device: device,
      customerId: stripeId,
      customerEmail: userEmail,
    });
    if (response) {
      setClientSecret(response.data.clientSecret);
      setDisplaySelection(false);
    }
  };
  return (
    <div>
      <Modal
        isOpen={createTransactionPaid}
        onRequestClose={closeModal}
        style={customStyles}
        shouldCloseOnOverlayClick={false}
      >
        <div
          className="device-selection"
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            margin: "2vh auto",
          }}
        >
          <p className={`d-${
              displaySelection === true ? "auto" : "none"
            }`}>HOW MANY RECEIVERS DO YOU NEED?</p>
          <div
            className={`button-selection d-${
              displaySelection === true ? "auto" : "none"
            }`}
          >
            <button id="button-less" onClick={() => setDevice(device - 1)}>
              -
            </button>
            <div className="device-selection-display">
              <p id="number-device-displayed">{device}</p>
            </div>
            <button id="button-plus" onClick={() => setDevice(device + 1)}>
              +
            </button>
          </div>
          <div
            style={{ marginTop: "2vh" }}
            className={`box-submit-button d-${
              displaySelection === true ? "auto" : "none"
            }`}
          >
            {device > 0 && (
              <button
                style={{
                  backgroundColor: "var(--main-colorsbluetiful)",
                  color: "var(--bs-body-bg)",
                }}
                onClick={handleSubmitDeviceSelection}
                className="btn btn-create"
              >
                Submit
              </button>
            )}
          </div>
          <div className="stripe-wrapper-checkout">
            <StripeCheckoutElementAdmin
              device={device}
              clientSecret={clientSecret}
            />
          </div>
          <div className="d-none">
            <NoticeTransactionWentTrue device={device} userData={userData} />
          </div>
        </div>
      </Modal>
    </div>
  );
};
