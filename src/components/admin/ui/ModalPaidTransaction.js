import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { devitrackApi } from "../../../apis/devitrackApi";
import { NoticePaymentTransactionConfirmed } from "../../../page/admin/NoticePaymentTransactionConfirmed";
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
  userToDisplay,
}) => {
  const [device, setDevice] = useState(0);
  const [total, setTotal] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [customerStripeId, setCustomerStripeId] = useState("");
  const [displaySelection, setDisplaySelection] = useState(true);
  // const [displayCheckoutElement, setDisplayCheckoutElement] = useState(false)
  let stripeCustomerIdTouse = null;

  if (createTransactionPaid !== false) {
    Modal.setAppElement("#root");
  }
  function closeModal() {
    setCreateTransactionPaid(false);
  }
  const callStripeCustomerFind = async () => {
    const response = await devitrackApi.get("/stripe/customers");
    if (response) {
      return setCustomerStripeId(response.data.stripeCustomerSaved);
    }
  };
  useEffect(() => {
    callStripeCustomerFind();
  }, []); // eslint-disable-next-line

  if (device < 0) {
    return setDevice(0);
  }
  const stripeCustomersSaved = new Map();
  if (customerStripeId.length > 0) {
    for (let customer of customerStripeId) {
      stripeCustomersSaved.set(customer.email, customer.stripeid);
    }
  }

  const handleSubmitDeviceSelection = async (event) => {
    event.preventDefault();
    if (stripeCustomersSaved.has(userToDisplay?.email)) {
      return (stripeCustomerIdTouse = stripeCustomersSaved.get(
        userToDisplay.email
      ));
    }
    const response = await devitrackApi.post(
      "/stripe/create-payment-intent-customized",
      {
        total: total,
        customerId: stripeCustomerIdTouse,
        customerEmail: userToDisplay.email,
      }
    );
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
          <p className={`d-${displaySelection === true ? "auto" : "none"}`}>
            HOW MANY RECEIVERS DO YOU NEED?
          </p>
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
            className={`button-selection d-${
              displaySelection === true ? "auto" : "none"
            }`}
          >
            <span>
              AMOUNT TO CHARGE: <strong>$</strong>
            </span>
            <input
              style={{
                border: "transparent",
                borderBottom: "solid 1px",
                outline: "none",
              }}
              type="string"
              name="total"
              value={total}
              onChange={(event) => setTotal(event.target.value)}
            />
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
          <div className={`stripe-wrapper-checkout d-${
              displaySelection === true ? "none" : "auto"
            }`}>
            <StripeCheckoutElementAdmin
              clientSecret={clientSecret}
              total={total}
            />
          </div>
          <div className="d-none">
            <NoticePaymentTransactionConfirmed
              device={device}
              userToDisplay={userToDisplay}
            />
          </div>
        </div>
      </Modal>
    </div>
  );
};
