import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
import { useContactInfoStore } from "../hooks/useContactInfoStore";

export const WelcomeEmail = ({ formValues, trigger }) => {
  const{ users } = useContactInfoStore()
  const form = useRef();

  const send = () => {
    emailjs
      .sendForm(
        "service_lnb61h6",
        "template_oqaxdeb",
        form.current,
        "HLFhc1viNaZVfckjP"
      )
      .then(
        (result) => {
          console.log("🚀 ~ file: WelcomeEmail.js:20 ~ send ~ result", result);
          console.log(result.text);
        },
        (error) => {
          console.log("🚀 ~ file: WelcomeEmail.js:24 ~ send ~ error", error);
          console.log(error.text);
        }
      );
  };

  if (trigger === true) {
    if(users.id !== ""){
      send()
    };
  }
  return (
    <form className="d-none" ref={form} onSubmit={send}>
      <label>Name</label>
      <input type="text" name="user_name" value={formValues.name} />
      <label>Email</label>
      <input type="email" name="user_email" value={formValues.email} />
      <label>Message</label>
      <textarea name="message" value="Welcome to Devitrak" />
    </form>
  );
};
