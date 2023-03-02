import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { devitrackApi } from "../../../apis/devitrackApi";
import { useStripeHook } from "../../../hooks/useStripeHook";
import { StripeCheckoutElement } from "../stripe/StripeCheckoutElement";

export const ModalTransactionPaidNoPaidSelection = ({
  createTransactionPaid,
  setCreateTransactionPaid,
  user,
}) => {
  const [devices, setDevices] = useState(0);
  console.log(
    "🚀 ~ file: ModalTransactionPaidNoPaidSelection.js:14 ~ devices",
    typeof devices
  );
  const [screenSize, setScreenSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const [customerStripeId, setCustomerStripeId] = useState([]);
  const { startStripePaymentIntent, clientSecret, visibleButton } =
    useStripeHook();

  const userEmail = user?.email;

  useEffect(() => {
    const callStripeCustomerFind = async () => {
      const response = await devitrackApi.get("/stripe/customers", {
        email: user.email,
      });
      if (response) {
        return setCustomerStripeId(response.data.customer);
      }
    };
    return () => {
      callStripeCustomerFind();
      handleResize();
    };
  }, []); // eslint-disable-next-line

  if (createTransactionPaid !== false) {
    Modal.setAppElement("#root");
  }
  function closeModal() {
    setCreateTransactionPaid(false);
  }
  const handleResize = () => {
    setScreenSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };

  const customeStyleBaseOnScreenSize = () => {
    let customStyles;
    if (screenSize.width < 1201) {
      return (customStyles = {
        content: {
          width: "50vw",
          height: "15%",
          top: "50%",
          left: "50%",
          right: "auto",
          bottom: "auto",
          marginRight: "-50%",
          transform: "translate(-50%, -50%)",
        },
      });
    } else {
      return (customStyles = {
        content: {
          width: "30%",
          height: "15%",
          top: "50%",
          left: "50%",
          right: "auto",
          bottom: "auto",
          marginRight: "-50%",
          transform: "translate(-50%, -50%)",
        },
      });
    }
  };
  customeStyleBaseOnScreenSize();
  const handleOnSubmit = async (event) => {
    event.preventDefault();
    let stripeId;
    for (let i = 0; i < customerStripeId.length; i++) {
      if (customerStripeId[i].email === user.email) {
        stripeId = customerStripeId[i].id;
      }
    }

    const response = await devitrackApi.post(
      "/stripe/create-payment-intent-customized",
      {
        customerEmail: userEmail,
        customerId: stripeId,
        total: devices * 200 * 100,
      }
    );
    // if (response) {
    //   devitrackApi.post("/stipe/stripe-transaction-admin", {});
    // }
  };
  return (
    <div>
      <Modal
        isOpen={createTransactionPaid}
        onRequestClose={closeModal}
        style={customeStyleBaseOnScreenSize()}
        shouldCloseOnOverlayClick={false}
      >
        <div className="container-checkout">
          {!clientSecret ? (
            <>
              <input
                type="number"
                name="devices"
                onChange={(event) => setDevices(parseInt(event.target.value))}
              />
              <button className="btn" onClick={handleOnSubmit}>
                Submit
              </button>{" "}
            </>
          ) : (
            ""
          )}

          <div className="stripe-wrapper-checkout">
            <StripeCheckoutElement
              devices={devices}
              clientSecret={clientSecret}
            />
          </div>
        </div>
      </Modal>
    </div>
  );
};
