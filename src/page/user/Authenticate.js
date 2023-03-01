import { useStytch, useStytchSession } from "@stytch/stytch-react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { rightDoneMessage } from "../../helper/swalFireMessage";
import { blockLinks } from "../../store/slices/uiSlice";

export const Authenticate = () => {
  const client = useStytch();
  const session = useStytchSession();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (session) {
      navigate("/checkout");
      dispatch(blockLinks("auto"));
    } else {
      const token = new URLSearchParams(window.location.search).get("token");
      client.magicLinks
        .authenticate(token, {
          session_duration_minutes: 10080,
        })
        .then(() => {
          rightDoneMessage(`Successfully authenticated`);
          navigate(0); //navigate to 0 to refrese page
          dispatch(blockLinks("auto"));
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