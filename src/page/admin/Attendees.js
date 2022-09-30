import React from "react";
import { PaymentIntentTemplate } from "../../components/admin/DeviceDatabaseSection/PaymentIntentTemplate";
import { Navbar } from "../../components/admin/Navbar";

export const Attendees = () => {
  return (
    <div>
      <div>
        <Navbar />
        <PaymentIntentTemplate />
      </div>
    </div>
  );
};
