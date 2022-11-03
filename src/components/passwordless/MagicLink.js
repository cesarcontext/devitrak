import { useStytch } from "@stytch/stytch-react";
import Swal from "sweetalert2";
import "../../style/component/passwrodless/MagicLink.css"

export const MagicLink = (magicLinkParam) => {
  const client = useStytch();

  const emailUserToPassToMagicLink = Object.values(magicLinkParam )
  let emailToPass;
  const emailString = emailUserToPassToMagicLink.map((item ) => emailToPass = item)
  const handleLogin = async () => {
    await client.magicLinks.email.loginOrCreate(emailToPass);

    Swal.fire({
      title: `An email has been sent to ${emailString}`,
      confirmButtonColor: "rgb(30, 115, 190)",
      showClass: {
        popup: "animate__animated animate__fadeInDown",
      },
      hideClass: {
        popup: "animate__animated animate__fadeOutUp",
      },
    });
  };
  return (
    <div className="email-sent-message-magic-link">
      <h4><strong>{emailToPass}</strong> is registered. Please log in.</h4>

      <button onClick={handleLogin}>Login</button>
    </div>
  );
};
