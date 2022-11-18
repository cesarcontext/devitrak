import React, { useEffect } from "react";
import { Navbar } from "../components/ui/Navbar";
import { ContactInfo } from "../components/contact/ContactInfo";
import { UserConsentPrivacyPolicyModal } from "../components/ui/UserConsentPrivacyPolicyModal";

export const Home = () => {
  let prompt;
  const dispatchAction = (event) => {
    event.preventDefault();
    // prompt.prompt();
  };
  const askPermission = async () => {
    Notification.requestPermission().then((pemrission) => alert(pemrission));
  };
  useEffect(() => {
    const controller = new AbortController();
    setTimeout(async () => {
      await askPermission();
      window.addEventListener("beforeinstallprompt", function (e) {
        // Prevent the mini-infobar from appearing on mobile
        e.preventDefault();
        // Stash the event so it can be triggered later.
        prompt = e;
      });
    
    }, 6000);
    return () => {
      controller.abort();
    };
  }, []);

  return (
    <>
      <Navbar />
      <ContactInfo />
      <UserConsentPrivacyPolicyModal />
    </>
  );
};
