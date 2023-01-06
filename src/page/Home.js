import React,{ useEffect, useState} from "react";
import { Navbar } from "../components/ui/Navbar";
import { ContactInfo } from "../components/contact/ContactInfo";
// import { UserConsentPrivacyPolicyModal } from "../components/ui/UserConsentPrivacyPolicyModal";
import { AppDownloadModal } from "../helper/AppDownloadModal";

export const Home = () => { 
  const [isPwaInstalled, setIsPwaInstalled] = useState(false);
  useEffect(() => {
    const pwaInstalled = window.matchMedia('(display-mode: standalone)').matches;
    setIsPwaInstalled(pwaInstalled);
  }, []);
  return (
    <div className="general-container">
      {isPwaInstalled === false && <AppDownloadModal />}
      <Navbar />
      <ContactInfo />
      {/* <UserConsentPrivacyPolicyModal /> */}
    </div>
  );
};
