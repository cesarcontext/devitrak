import { useStytch } from "@stytch/stytch-react";
import { rightDoneMessage } from "../../helper/swalFireMessage";
import "../../style/component/passwrodless/MagicLink.css";

export const MagicLink = (magicLinkParam) => {
  console.log("🚀 ~ file: MagicLink.js:6 ~ MagicLink ~ magicLinkParam", magicLinkParam)
  
  const client = useStytch();

  const emailUserToPassToMagicLink = Object.values(magicLinkParam);
  console.log("🚀 ~ file: MagicLink.js:11 ~ MagicLink ~ emailUserToPassToMagicLink", emailUserToPassToMagicLink)
  let emailToPass;
  const emailString = emailUserToPassToMagicLink.map(
    (item) => (emailToPass = item)
  );
  const handleLogin = async () => {
    await client.magicLinks.email.loginOrCreate(emailToPass);
    rightDoneMessage(`An email has been sent to ${emailString}`);
  };
  return (
    <div className="email-sent-message-magic-link">
      
      <p onClick={handleLogin}>
      <i className="bi bi-exclamation-diamond" />  Your email is already in the system. Please click this link to log in
        through your email inbox <i className="bi bi-chevron-right" />
      </p>
    </div>
  );
};
