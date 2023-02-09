import React from "react";
import { AccordionListPaymentIntent } from "../../components/ui/AccordionListPaymentIntent";
import { Navbar } from "../../components/ui/Navbar";
import { NavbarBottom } from "../../components/ui/NavbarBottom";

export const Receipts = () => {
  return (
    <div>
      <Navbar />
      <div>
        <AccordionListPaymentIntent />
      </div>
      <NavbarBottom />
    </div>
  );
};
