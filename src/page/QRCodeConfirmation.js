import React, { useEffect } from "react"; //, { useEffect }
import QRCode from "react-qr-code";
import { Link } from "react-router-dom";
import { Navbar } from "../components/ui/Navbar";
import { NavbarBottom } from "../components/ui/NavbarBottom";
import { useDeviceCount } from "../hooks/useDeviceCountStore";
import { useStripeHook } from "../hooks/useStripeHook";

export const QRCodeConfirmation = () => {
  const { device } = useDeviceCount()

  const payment_intent = new URLSearchParams(window.location.search).get(
    "payment_intent"
  );

  const clientSecret = new URLSearchParams(window.location.search).get(
    "payment_intent_client_secret"
  );
  const { saveStripeTransaction } = useStripeHook();

  
  useEffect(() => {
    saveStripeTransaction({ payment_intent, clientSecret, device });
  }, []);

  const QRCodeGenerated = (
    <QRCode
      fgColor="#000"
      bgColor="#ffff"
      level="Q"
      size={150}
      value={clientSecret}
    />
  );
  return (
    <>
      <Navbar />
      <div
        style={{
          width: "50%",
          margin: "50px auto 150px",
          height: "calc(100% - 18vh)",
        }}
      >
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
          <div>
            <p>
              <span>
                Your devices are now ready! <br />
                Please proceed to Headset Distribuition Desk located at
                International registration.
              </span>
            </p>
          </div>
          <br />
          <div>
            <p>
              Please have your device open with the QR Code. This will be
              scanned and a receiver with reference number will be issued. For
              your reference the assigned receiver number will appear on the
              application.
            </p>
          </div>
        </div>
        <div className="qr-code-div" style={{ margin: "40px" }}>
          <div className="qr-code">{QRCodeGenerated}</div>
        </div>
        <div className="reference-number" style={{ margin: "40px" }}>
          <h4>Your reference number is:</h4>
          <span>{payment_intent}</span>
        </div>
        <div
          className="links-help"
          style={{
            margin: "40px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <div>
            <span>OTHER RESOURCES</span>
          </div>
          <Link to="/how_to_use_the_receiver">
            <div
              style={{
                margin: "10px",
              }}
            >
              <span>HOW TO USE THE RECEIVERS</span>
            </div>
          </Link>
          <Link to="/request_support_during_event">
            <div
              style={{
                margin: "10px",
              }}
            >
              <span>HOW TO REQUEST SUPPORT DURING THE EVENT</span>
            </div>
          </Link>
          <Link to="/how_to_return_the_devices">
            <div
              style={{
                margin: "10px",
              }}
            >
              <span>HOW TO RETURN DEVICES</span>
            </div>
          </Link>
        </div>
      </div>
      <NavbarBottom />
    </>
  );
};
