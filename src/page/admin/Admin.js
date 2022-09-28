import { Outlet } from "react-router-dom";
import { Navbar } from "../../components/admin/Navbar";

export const Admin = () => {
  return (
    <div>
      <Navbar />
      <div>
        <h3></h3>
      </div>
      <div>{Outlet}</div>
    </div>
  );
};
