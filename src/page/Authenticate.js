import { useStytch, useStytchSession } from "@stytch/stytch-react";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { rightDoneMessage } from "../helper/swalFireMessage";


export const Authenticate = () => {
  const client = useStytch();
  const session = useStytchSession();
  const navigate = useNavigate();

  useEffect(() => {
    if (session) {
      navigate("/checkout");
    } else {
      const token = new URLSearchParams(window.location.search).get("token");
      client.magicLinks
        .authenticate(token, {
          session_duration_minutes: 15,
        })
        .then(() => {
          rightDoneMessage(`Successfully authenticated`)
          navigate(0) //navigate to 0 to refrese page
        });
    }
  }, [client, session]);

  return (
    <>
      <h1>Loading...</h1>
      <p>Please wait until your session is loaded</p>
    </>
  );
};
