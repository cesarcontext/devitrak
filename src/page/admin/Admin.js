import React from "react";
import { Navbar } from "../../components/admin/Navbar";
import { RegisteredUser } from "../../components/admin/RegisteredUser";

export const Admin = () => {
  return (
    <>
      <aside>
        <Navbar />
      </aside>
      <div>
        <RegisteredUser />
      </div>
    </>
  );
};
