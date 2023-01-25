import { useInterval } from "interval-hooks";
import React, { useEffect, useState } from "react";
import QRCode from "react-qr-code";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { devitrackApi, devitrackApiStripe } from "../apis/devitrackApi";
import { Navbar } from "../components/ui/Navbar";
import { NavbarBottom } from "../components/ui/NavbarBottom";
import { useDeviceCount } from "../hooks/useDeviceCountStore";
import { useStripeHook } from "../hooks/useStripeHook";
import { onAddNewPaymentIntent } from "../store/slices/stripeSlice";
import "../style/pages/QRCodeConfirmation.css";

export const QRCodeConfirmation = () => {
  const [stripeTransactions, setStripeTransactions] = useState([]);
  const { saveStripeTransaction } = useStripeHook();
  const { device } = useDeviceCount();
  const dispatch = useDispatch();
  const payment_intent = new URLSearchParams(window.location.search).get(
    "payment_intent"
  );

  const clientSecret = new URLSearchParams(window.location.search).get(
    "payment_intent_client_secret"
  );

  const callApiStripeTransaction = async () => {
    await devitrackApi
      .get("/admin/users")
      .then((response) => response.data)
      .then((data) => setStripeTransactions(data.stripeTransactions));
  };
  const confirmPaymentIntent = async () => {
    try {
      const response = await devitrackApi.get(
        `/stripe/payment_intents/${payment_intent}`
      );
      if (response) {
        saveStripeTransaction({ payment_intent, clientSecret, device });
        dispatch(onAddNewPaymentIntent(response.data));
      }
    } catch (error) {
      console.log(
        "🚀 ~ file: QRCodeConfirmation.js:43 ~ confirmPaymentIntent ~ error",
        error
      );
    }
  };

  useEffect(() => {
    confirmPaymentIntent();
  }, [payment_intent]);
  
  const QRCodeGenerated = (
    <QRCode
      fgColor="#000"
      bgColor="#ffff"
      level="Q"
      size={150}
      value={payment_intent}
    />
  );

  const removeDuplicatesStripePaymentIntent = async () => {
    const duplicates = {};
    for (let i = 0; i < stripeTransactions.length; i++) {
      if (!duplicates[stripeTransactions[i].paymentIntent]) {
        duplicates[stripeTransactions[i].paymentIntent] =
          stripeTransactions[i].paymentIntent;
      } else {
        await devitrackApiStripe.delete(
          `/remove-duplicate/${stripeTransactions[i].id}`
        );
      }
    }
  };

  useInterval(async () => {
    await callApiStripeTransaction();
    await removeDuplicatesStripePaymentIntent();
  }, 1_00);

  return (
    <div className="general-container">
      <Navbar />
      <div className="container-qr-code-confirmation">
        <div className="top-icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            fill="currentColor"
            className="bi bi-check-circle"
            viewBox="0 0 16 16"
          >
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
            <path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z" />
          </svg>
        </div>
        <div className="message-confirmation">
          <p id="first-paragraph">
            <span>Your devices are now ready!</span>
            <br />
            <span>
              Please proceed to Headset Distribuition Desk located at
              International registration.
            </span>
          </p>
          <p>
            Please have your device open with the QR Code. This will be scanned
            and a receiver with reference number will be issued. For your
            reference the assigned receiver number will appear on the
            application.
          </p>
        </div>
        <div className="qr-code-div">
          <div className="qr-code">{QRCodeGenerated}</div>
        </div>
        <div className="reference-number">
          <h4>Your reference number is:</h4>
          <span>{payment_intent}</span>
        </div>
        <div className="links-help-qr-code-confirmation-section">
          <div className="help-link-route">
            <span>OTHER RESOURCES</span>
          </div>
          <Link to="/more_info/how_to_use_the_receiver">
            <div className="help-link-route">
              <span>HOW TO USE THE RECEIVERS</span>
            </div>
          </Link>
          <Link to="/more_info/request_support_during_event">
            <div className="help-link-route">
              <span>HOW TO REQUEST SUPPORT DURING THE EVENT</span>
            </div>
          </Link>
          <Link to="/more_info/how_to_return_the_devices">
            <div className="help-link-route">
              <span>HOW TO RETURN DEVICES</span>
            </div>
          </Link>
        </div>
      </div>
      <NavbarBottom />
    </div>
  );
};
