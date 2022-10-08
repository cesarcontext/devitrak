import { useStytch } from "@stytch/stytch-react";
import Swal from "sweetalert2";

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
    <div style={{ paddingBottom: "25px"}}>
      <h4>{emailToPass} is registered. <br /> Please sign in.</h4>

      <button onClick={handleLogin}>Login</button>
    </div>
  );
};
