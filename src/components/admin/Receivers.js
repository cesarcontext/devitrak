import React, { useEffect } from "react";
import { useAdminStore } from "../../hooks/useAdminStore";
import { Navbar } from "./Navbar";

export const Receivers = () => {
  const { userRegitered, startLoadingUsers } = useAdminStore();

  useEffect(() => {
    startLoadingUsers();
  }, []);


  return (
    <div
      style={{
        marginLeft: "17%",
        width: "81%",
      }}
    >
      <aside>
        <Navbar />
      </aside>
      <div style={{
        paddingTop:"30px"
            }}>
      <h1>Receivers:</h1>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Serial Number</th>
            <th scope="col">User</th>
            <th scope="col">Payment ID</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
            <td>786254121</td>
          </tr>
          <tr>
            <th scope="row">2</th>
            <td>Jacob</td>
            <td>Thornton</td>
            <td>@fat</td>
            <td>786254121</td>
          </tr>
        </tbody>
      </table>
      </div>
    </div>
  );
};
