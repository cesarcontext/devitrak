import React from "react";
import { Navbar } from "../../components/ui/Navbar";
import { ContactInfo } from "../../components/contact/ContactInfo";

export const Home = () => { 
;
  return (
    <div className="general-container">
      <Navbar />
      <ContactInfo />
    </div>
  );
};