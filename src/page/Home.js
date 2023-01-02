import React from "react";
import { Navbar } from "../components/ui/Navbar";
import { ContactInfo } from "../components/contact/ContactInfo";
import { UserConsentPrivacyPolicyModal } from "../components/ui/UserConsentPrivacyPolicyModal";
import { AppDownloadModal } from "../helper/AppDownloadModal";
import { useEffect } from "react";
import { useState } from "react";

export const Home = () => {
  const [modalDisplay, setModalDisplay] = useState(false);
  const userAgent = navigator.userAgent;

  return (
    <div className="general-container">
      <Navbar />
      {userAgent.indexOf("Android") !== -1 ? (
        <AppDownloadModal
          modalDisplay={modalDisplay}
          setModalDisplay={setModalDisplay}
        />
      ) : (
        ""
      )}
      {userAgent.indexOf("iPhone") !== -1 ||
      userAgent.indexOf("iPad") !== -1 ? (
        <AppDownloadModal
          modalDisplay={modalDisplay}
          setModalDisplay={setModalDisplay}
        />
      ) : (
        ""
      )}
      <ContactInfo />
      <UserConsentPrivacyPolicyModal />
    </div>
  );
};
