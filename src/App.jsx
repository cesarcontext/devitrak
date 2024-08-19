import React from "react";
import AuthenticatedRoutes from "./route/AuthenticatedRoutes";
import "./App.css";
import InactivityLogout from "./components/utils/InactivityLogout";

function App() {
  return (
    <InactivityLogout>
      <AuthenticatedRoutes />
    </InactivityLogout>
  );
}

export default App;
