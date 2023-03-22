import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useContactInfoStore } from "../../hooks/useContactInfoStore";
import "../../style/component/passwrodless/MagicLink.css";

export const MagicLink = () => {
  const { provider, eventSelected } = useSelector(state => state.providerEvent)
  const { users } = useSelector(state => state.contactInfo)
  const { listOfEvents } = useContactInfoStore
  console.log("🚀 ~ file: MagicLink.js:11 ~ MagicLink ~ listOfEvents:", listOfEvents)
  /**
   * @description navigate - useNavigate function imported from react-router-dom library
   */
  const navigate = useNavigate();

  /**
   * @description function to take user once it is confirmed in database to check out page
   * @returns {Promise<void>}
   */
  const handleLogin = async () => {
    try {
      
    } catch (error) {
      
    }
    if(provider !== "Context Global") return navigate("/my_profile");
    
    return navigate("/checkout")
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
