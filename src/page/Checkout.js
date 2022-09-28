import React, { useState } from "react";
import { NavbarBottom } from "../components/ui/NavbarBottom";
import { Devices } from "../components/device/Devices";
import { StripeCheckoutElement } from "../components/stripe/StripeCheckoutElement";
import { Navbar } from "../components/ui/Navbar";

export const Checkout = () => {
  const [confirmAmount, setConfirmAmount] = useState("none");

  return (
    <>
      <Navbar />
      <Devices />
        <StripeCheckoutElement confirmAmount={ confirmAmount } setConfirmAmount={ setConfirmAmount } />
      <NavbarBottom />
    </>
  );
};
