import { useStytch } from "@stytch/stytch-react";
import Swal from "sweetalert2";
import { swalErrorMessage } from "../../helper/swalFireMessage";
import "../../style/component/passwrodless/MagicLink.css";

export const MagicLink = (magicLinkParam) => {
  const client = useStytch();

  const emailUserToPassToMagicLink = Object.values(magicLinkParam);
  let emailToPass;
  const emailString = emailUserToPassToMagicLink.map(
    (item) => (emailToPass = item)
  );
  const handleLogin = async () => {
    await client.magicLinks.email.loginOrCreate(emailToPass);
    swalErrorMessage(`An email has been sent to ${emailString}`);
  };
  return (
    <div className="email-sent-message-magic-link">
      
      <p onClick={handleLogin}>
      <i className="bi bi-exclamation" />  Your email is already in the system. Please click this link to log in
        through your email inblox <i className="bi bi-chevron-right" />
      </p>
    </div>
  );
};
