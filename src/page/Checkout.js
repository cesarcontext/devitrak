import React from "react";
import { NavbarBottom } from "../components/ui/NavbarBottom";
import { StripeCheckoutElement } from "../components/stripe/StripeCheckoutElement";
import { Navbar } from "../components/ui/Navbar";
import { useStripeHook } from "../hooks/useStripeHook";
import { useDeviceCount } from "../hooks/useDeviceCountStore";
import { Devices } from "../components/device/Devices";
import "../style/pages/Checkout.css";

export const Checkout = () => {
  const {
    device,
  } = useDeviceCount();
  const { startStripePaymentIntent, clientSecret, visibleButton } =
    useStripeHook();

  const handleOnSubmit = (event) => {
    event.preventDefault();
    startStripePaymentIntent(device);
    localStorage.setItem("device", device);
  };
  return (
    <>
      <Navbar />
      <div className="container-checkout">
        {!clientSecret ? (
            <Devices />
        ) : (
          ""
        )}
        {device < 1 ? (
          <></>
        ) : (
          <div className={`button-wrapper d-${visibleButton}`}>
            <button className="btn" onClick={handleOnSubmit}>Looks right?</button>
          </div>
        )}
        
        <div className="stripe-wrapper-checkout">
          <StripeCheckoutElement clientSecret={clientSecret} />
        </div>
        {clientSecret ? <div className="checkout-amount-stripe-clientSecret"><h3>Deposit: ${device * 200},00</h3></div> : ""}
      </div>
      <NavbarBottom />
    </>
  );
};
