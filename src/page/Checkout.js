import React from "react";
import { NavbarBottom } from "../components/ui/NavbarBottom";
import { PaymentForms } from "../components/creditCard/PaymentForms";
import { Devices } from "../components/device/Devices";

export const Checkout = () => {
  return (
    <>
      <Devices />
      <PaymentForms />
      <NavbarBottom />
    </>
  );
};
