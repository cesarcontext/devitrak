import React, { useEffect, useState } from "react";
import { devitrackApi } from "../../../apis/devitrackApi";
import { Pagination } from "../ui/Pagination";
import "../../../style/pages/admin/setting.css";
import { useAdminStore } from "../../../hooks/useAdminStore";

export const SettingDetailInfo = ({ searchTerm }) => {
  const { user } = useAdminStore()
  const [adminUser, setAdminUser] = useState([]);
  const [sendObjectIdUser, setSendObjectIdUser] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [usersRenderedPerPage] = useState(4);

  const adminUserRole = user.role.at(-1)
  console.log("first", adminUserRole )
  useEffect(() => {
    devitrackApi
      .get("/staff/admin-users")
      .then((response) => response.data)
      .then((data) => setAdminUser(data.adminUsers));
  }, []);

  const indexOfLastUsersRendered = currentPage * usersRenderedPerPage;
  const indexOfFirstUsersRendered =
    indexOfLastUsersRendered - usersRenderedPerPage;
  const currentUsersRendered = adminUser.slice(
    indexOfFirstUsersRendered,
    indexOfLastUsersRendered
  );

  const paginate = (pageNumbers) => {
    setCurrentPage(pageNumbers);
  };

  return (
    <div
      style={{
        display: "flex",
        columnGap: "2%",
        margin: "2%",
        height: "25%",
      }}
    >
      <div
        style={{
          width: "60%",
          border: "solid 2px #212529",
          borderRadius: "15px",
          padding: "20px",
        }}
      >
        <div>
          <h2>Company Staff</h2>
        </div>
        <div>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Role</th>
                <th scope="col">Email</th>
                <th scope="col">More</th>
              </tr>
            </thead>
            {searchTerm.length < 2
              ? currentUsersRendered?.map((user) => {
                  return (
                    <tbody key={user._id}>
                      <tr>
                        <td>{user.name}</td>
                        <td>{user.role}</td>
                        <td>{user.email}</td>
                        <td>
                          <button onClick={() => setSendObjectIdUser(user._id)}>
                            Details <i className="bi bi-caret-right" />{" "}
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  );
                })
              : adminUser
                  ?.filter((item) =>
                    item.name.toLowerCase().includes(searchTerm.toLowerCase())
                  )
                  ?.map((user, item) => {
                    console.log(user);
                    return (
                      <tbody key={user._id}>
                        <tr>
                          <td>{user.name}</td>
                          <td>{user.role}</td>
                          <td>{user.email}</td>
                          <td>
                            <button
                              onClick={() => setSendObjectIdUser(user._id)}>
                              Details <i className="bi bi-caret-right" />{" "}
                            </button>
                          </td>
                        </tr>
                      </tbody>
                    );
                  })}
          </table>
          <div>
            <Pagination
              childrenRenderedPerPage={usersRenderedPerPage}
              totalChildren={adminUser.length}
              paginate={paginate}
            />
          </div>
        </div>
      </div>
      <div
        style={{
          width: "30%",
          border: "solid 2px #212529",
          borderRadius: "15px",
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <div
          style={{
            width: "100%",
            padding: "25px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            textAlign: "left",
          }}
        >
          {" "}
          <div
            style={{
              // width: "100%",
              padding: "5px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              alignItems: "center",
              textAlign: "left",
            }}
          >
            {adminUser?.map((user) => {
              if (user._id === sendObjectIdUser) {
                return (
                  <div key={user._id} className="container-admin-user-details">
                    <div className="container-admin-user-details-card">
                      <div>
                        {" "}
                        <h3>
                          {user.name} {user.lastName}
                        </h3>
                      </div>
                      <div>
                        <h6>{user.role}</h6>
                        {adminUserRole === "Approver" ? <i className="bi bi-pencil" />: null }
                      </div>
                    </div>
                    <div className="container-admin-user-details-card">
                      <h5>CONTACT INFO</h5>
                      <div>
                        <div>
                          <p>Phone</p>
                          {user.phoneNumber}
                        </div>
                        <div>
                          <p>Email</p>
                          {user.email}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
