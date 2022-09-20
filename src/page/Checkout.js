import React from "react";
import { NavbarBottom } from "../components/ui/NavbarBottom";
import { PaymentForms } from "../components/creditCard/PaymentForms";

export const Checkout = () => {
  return (
    <>
      <PaymentForms />
      <NavbarBottom />
    </>
  );
};
