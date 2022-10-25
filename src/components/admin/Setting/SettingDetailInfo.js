import React, { useEffect, useState } from "react";
import { devitrackApi, devitrackApiAdmin } from "../../../apis/devitrackApi";
import { Pagination } from "../ui/Pagination";
import { useAdminStore } from "../../../hooks/useAdminStore";
import Swal from "sweetalert2";
import { ModalAdminNewUser } from "../ui/Modal";

import "../../../style/pages/admin/setting.css";

export const SettingDetailInfo = ({ searchTerm }) => {
  const { user } = useAdminStore();
  const { editAdminPermission } = useAdminStore();
  const [adminUser, setAdminUser] = useState([]);
  const [sendObjectIdUser, setSendObjectIdUser] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [usersRenderedPerPage] = useState(4);
  const [permissionStatus, setPermissionStatus] = useState(false);
  const [permissionUpdated, setPermissionUpdated] = useState("");
  const [reloadListAfterChange, setReloadListAfterChange] = useState(false);
  const [modalState, setModalState] = useState(false)

  const adminUserRole = user.role;

  useEffect(() => {
    devitrackApi
      .get("/staff/admin-users")
      .then((response) => response.data)
      .then((data) => setAdminUser(data.adminUsers));
  }, [reloadListAfterChange, adminUser]);
  

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

  const handleEditAdminPermission = async () => {
    setPermissionStatus(!permissionStatus);
  };

  const updatePermission = async (permissionUpdated) => {
    await editAdminPermission({ role: permissionUpdated, sendObjectIdUser });
    await setPermissionStatus(!permissionStatus);
    await setReloadListAfterChange(!reloadListAfterChange);
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
                  ?.map((user) => {
                    return (
                      <tbody key={user._id}>
                        <tr>
                          <td>{user.name}</td>
                          <td>{user.role}</td>
                          <td>{user.email}</td>
                          <td>
                            <button
                              onClick={() => setSendObjectIdUser(user._id)}
                            >
                              Details <i className="bi bi-caret-right" />{" "}
                            </button>
                          </td>
                        </tr>
                      </tbody>
                    );
                  })}
          </table>
          <div className="container-section-pagination-button">
            <Pagination
              childrenRenderedPerPage={usersRenderedPerPage}
              totalChildren={adminUser.length}
              paginate={paginate}
            />
            <div>
            {user.role === "Administrator" ? <button onClick={() => setModalState(true)}>Create new user</button> : null}
          </div>
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
          // alignItems: "center",
        }}
      >
        <div
          style={{
            width: "100%",
            padding: "25px",
            display: "flex",
            justifyContent: "space-between",
            // alignItems: "center",
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
              // alignItems: "center",
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
                      <div className="container-admin-role">
                        <h6>{user.role}</h6>
                        <div>
                          <div className="edit-button">
                            {adminUserRole === "Approver" ||
                            adminUserRole === "Administrator" ? (
                              <button onClick={handleEditAdminPermission}>
                                Edit <i className="bi bi-pencil" />
                              </button>
                            ) : null}
                          </div>
                          <div>
                            {permissionStatus === true ? (
                              <>
                                <select
                                  onChange={(event) =>
                                    setPermissionUpdated(event.target.value)
                                  }
                                >
                                  <option defaultValue>
                                    Please select permission
                                  </option>
                                  <option value="Administrator">
                                    Administrator
                                  </option>
                                  <option value="Approver">Approver</option>
                                  <option value="Editor">Editor</option>
                                </select>
                              </>
                            ) : null}
                          </div>
                          <div>
                            {permissionStatus === true ? (
                              <div
                                style={{
                                  display: "flex",
                                  padding: "15px",
                                  justifyCotent: "space-between",
                                  algnItems: "center",
                                  gap: "5px",
                                }}
                              >
                                <button
                                  onClick={() =>
                                    updatePermission(permissionUpdated)
                                  }
                                >
                                  Save
                                </button>
                                <button onClick={handleEditAdminPermission}>
                                  Cancel
                                </button>
                              </div>
                            ) : null}
                          </div>
                        </div>
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
        {sendObjectIdUser !== undefined && user.role === "Administrator" ? (
          <div>
            <button
              onClick={() => {
                Swal.fire({
                  title: "Are you sure?",
                  text: "This data will be deleted permantly",
                  icon: "warning",
                  showCancelButton: true,
                  confirmButtonColor: "#3085d6",
                  cancelButtonColor: "#d33",
                  confirmButtonText: "Delete data",
                  backdrop: "rgba(0,0,123,0.4)",
                })
                  .then((result) => {
                    if (result.isConfirmed) {
                      devitrackApiAdmin.delete(`/${sendObjectIdUser}`);
                      Swal.fire(
                        "User data deleted",
                        "This user was deleted",
                        "success"
                      );
                    }
                  })
                  .catch((error) => {
                    console.log(error);
                    Swal.fire(
                      "Something went wrong",
                      "Please, try again later",
                      "error"
                    );
                  });
              }}
            >
              Delete
            </button>
          </div>
        ) : null}
      </div>    
      <ModalAdminNewUser modalState={ modalState } setModalState={ setModalState }/>
    </div>
  );
};
