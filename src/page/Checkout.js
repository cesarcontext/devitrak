import React, { useEffect, useState } from "react";
import { NavbarBottom } from "../components/ui/NavbarBottom";
import { StripeCheckoutElement } from "../components/stripe/StripeCheckoutElement";
import { Navbar } from "../components/ui/Navbar";
import { useStripeHook } from "../hooks/useStripeHook";
import { useDeviceCount } from "../hooks/useDeviceCountStore";
import { Devices } from "../components/device/Devices";
import { devitrackApiStripe } from "../apis/devitrackApi";
import { useSelector } from "react-redux";
import "../style/pages/Checkout.css";

export const Checkout = () => {
  const [customerStripeId, setCustomerStripeId] = useState("")
  console.log("🚀 ~ file: Checkout.js:14 ~ Checkout ~ customerStripeId", customerStripeId)
  const { device } = useDeviceCount();
  const { users } = useSelector((state) => state.contactInfo);
  const { startStripePaymentIntent, clientSecret, visibleButton } =
    useStripeHook();

  const callStripeCustomerFind = async () => {
    const response = await devitrackApiStripe.get("/customers", {
      email: users.email,
    });
    if (response) {
      const emailReference = response.data.customer;
      console.log("🚀 ~ file: Checkout.js:27 ~ callStripeCustomerFind ~ emailReference", emailReference)
      for (let i = 0; i < emailReference.length; i++) {
        if (emailReference[i].email === users.email) {
          return setCustomerStripeId(emailReference[i].email);
        }
        return;
      }
    }
  };
  
  useEffect(() => {
    callStripeCustomerFind();
  },[users.id, device]);

  const handleOnSubmit = (event) => {
    event.preventDefault();
    startStripePaymentIntent({ device, customerStripeId });
    localStorage.setItem("device", device);
  };
  return (
    <div className="general-container">
      <Navbar />
      <div className="container-checkout">
        {!clientSecret ? <Devices /> : ""}
        {device < 1 ? (
          <></>
        ) : (
          <div className={`button-wrapper d-${visibleButton}`}>
            <button className="btn" onClick={handleOnSubmit}>
              Looks right?
            </button>
          </div>
        )}

        <div className="stripe-wrapper-checkout">
          <StripeCheckoutElement clientSecret={clientSecret} />
        </div>
        {clientSecret ? (
          <div className="checkout-amount-stripe-clientSecret">
            <h3>Deposit: ${device * 200},00</h3>
          </div>
        ) : (
          ""
        )}
      </div>
      <NavbarBottom />
    </div>
  );
};
