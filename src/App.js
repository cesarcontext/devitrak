import React from "react";
import "./App.css";
import { UserRoutes } from "./routes/UserRoutes";
import { AdminRoutes } from "./routes/AdminRoutes";

function App() {  
  return (
    <div className="App">
      <UserRoutes />
      <AdminRoutes />
    </div>
  );
}

export default App;
