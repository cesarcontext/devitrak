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
  const [customerStripeId, setCustomerStripeId] = useState([])
  const { device } = useDeviceCount();
  const { users } = useSelector((state) => state.contactInfo);
  const { startStripePaymentIntent, clientSecret, visibleButton } =
    useStripeHook();

  const callStripeCustomerFind = async () => {
    const response = await devitrackApiStripe.get("/customers", {
      email: users.email,
    });
    if(response){
      return setCustomerStripeId(response.data.customer)
    }
  };

  useEffect(() => {
    callStripeCustomerFind();
  },[users.id, device]);

  const handleOnSubmit = (event) => {
    event.preventDefault();
    let stripeId;
    for ( let i = 0; i < customerStripeId.length; i++){
      if(customerStripeId[i].email === users.email){
        stripeId= customerStripeId[i].id
      }
    }
    startStripePaymentIntent({ device, stripeId });
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
              Submit
            </button>
          </div>
        )}

        <div className="stripe-wrapper-checkout">
          <StripeCheckoutElement clientSecret={clientSecret} />
        </div>
        {/* {clientSecret ? (
          <div className="checkout-amount-stripe-clientSecret">
            <h3>Deposit: ${device * 200},00</h3>
          </div>
        ) : (
          ""
        )} */}
      </div>
      <NavbarBottom />
    </div>
  );
};
