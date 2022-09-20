import { Outlet } from "react-router-dom";
import { Navbar } from "../../components/admin/Navbar";

export const Admin = () => {
  return (
    <div style={{ display: "flex", marginLeft: "17%" }}>
      <aside>
        <Navbar />
      </aside>

      <h3>This is the main admin page</h3>
      <div>
        {Outlet}
      </div>
    </div>
  );
};
