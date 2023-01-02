import React from "react";
import { Navbar } from "../components/ui/Navbar";
import { ContactInfo } from "../components/contact/ContactInfo";
import { UserConsentPrivacyPolicyModal } from "../components/ui/UserConsentPrivacyPolicyModal";
import { AppDownloadModal } from "../helper/AppDownloadModal";

export const Home = () => { 
  return (
    <div className="general-container">
      <AppDownloadModal />
      <Navbar />
      <ContactInfo />
      <UserConsentPrivacyPolicyModal />
    </div>
  );
};
