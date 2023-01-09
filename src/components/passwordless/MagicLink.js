import { useStytch } from "@stytch/stytch-react";
import { rightDoneMessage } from "../../helper/swalFireMessage";
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
    Swal.fire({
      title: "",
      width: 600,
      padding: "3em",
      text: `${str}`,
      icon: "success",
      imageUrl: "https://imgpile.com/images/dhfGjS.png",
      imageWidth: 400,
      imageHeight: 200,
      imageAlt: "user aware",
      color: "#rgb(30, 115, 190)",
      background: "#fff",
      confirmButtonColor: "rgb(30, 115, 190)",
      backdrop: `
          rgb(30, 115, 190)
            url("../image/logo.jpg")
            left top
            no-repeat
          `,
    });
    // rightDoneMessage(`An email has been sent to ${emailString}`);
  };
  return (
    <div className="email-sent-message-magic-link">
      <p onClick={handleLogin}>
        <i className="bi bi-exclamation-diamond" /> Your email is already in the
        system. Please click this link to log in through your email inbox{" "}
        <i className="bi bi-chevron-right" />
      </p>
    </div>
  );
};
