//@ts-check
import React from "react";
import { useNavigate } from "react-router-dom";
import "../../style/component/passwrodless/MagicLink.css";

export const MagicLink = () => {
  /**
   * @description navigate - useNavigate function imported from react-router-dom library
   */
  const navigate = useNavigate();

  /**
   * @description function to take user once it is confirmed in database to check out page
   * @returns {Promise<void>}
   */
  const handleLogin = async () => {
    navigate("/select_event");
  };
  return (
    <div className="email-sent-message-magic-link">
      <p onClick={handleLogin}>
        <i className="bi bi-exclamation-diamond" /> Your email is already in the
        system. Please click this link to go to check out section.{" "}
        <i className="bi bi-chevron-right" />
      </p>
    </div>
  );
};
