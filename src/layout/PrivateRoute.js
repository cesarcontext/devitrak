import { useStytchSession } from "@stytch/stytch-react";
import { Navigate } from "react-router-dom";

export const PrivateRoute = ({ children }) => {
  const session = useStytchSession();

  if (session === null ) <Navigate to="/" replace />;

  return children;

};
