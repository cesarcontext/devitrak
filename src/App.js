import React from "react";
import { AdminRoutes } from "./routes/AdminRoutes";
import { UserRoutes } from "./routes/UserRoutes";
import "./App.css";


function App() {  
  return (
    <div className="App">
      <AdminRoutes />
      <UserRoutes />
    </div>
  );
}

export default App;
