import React, { useEffect, useState } from "react";
import { NavbarBottom } from "../../components/ui/NavbarBottom";
import { StripeCheckoutElement } from "../../components/stripe/StripeCheckoutElement";
import { Navbar } from "../../components/ui/Navbar";
import { useStripeHook } from "../../hooks/useStripeHook";
import { useDeviceCount } from "../../hooks/useDeviceCountStore";
import { Devices } from "../../components/device/Devices";
import { devitrackApiStripe } from "../../apis/devitrackApi";
import { useSelector } from "react-redux";
import "../../style/pages/Checkout.css";

export const Checkout = () => {
  const [customerStripeId, setCustomerStripeId] = useState([]);
  const { device } = useDeviceCount();
  const { users } = useSelector((state) => state.contactInfo);
  const { startStripePaymentIntent, clientSecret, visibleButton } =
    useStripeHook();

  const userEmail = users.email;

  useEffect(() => {
    const callStripeCustomerFind = async () => {
      const response = await devitrackApiStripe.get("/customers", {
        email: users.email,
      });
      if (response) {
        return setCustomerStripeId(response.data.customer);
      }
    };
    return ()=> callStripeCustomerFind();
  }, [users.id, device]); // eslint-disable-next-line

  const handleOnSubmit = (event) => {
    event.preventDefault();
    let stripeId;
    for (let i = 0; i < customerStripeId.length; i++) {
      if (customerStripeId[i].email === users.email) {
        stripeId = customerStripeId[i].id;
      }
    }
    startStripePaymentIntent({ device, stripeId, userEmail });
    localStorage.setItem("device", device);
  };
  return (
    <div className="general-container">
      <Navbar />
      <div className="container-checkout">
        {!clientSecret ? <Devices /> : ""}
        {device > 0 ? (
          <div className={`button-wrapper d-${visibleButton}`}>
            <button className="btn" onClick={handleOnSubmit}>
              Submit
            </button>
          </div>
        ) : null}

        <div className="stripe-wrapper-checkout">
          <StripeCheckoutElement clientSecret={clientSecret} />
        </div>
      </div>
      <NavbarBottom />
    </div>
  );
};