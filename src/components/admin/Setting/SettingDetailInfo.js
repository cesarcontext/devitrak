import React, { useEffect, useState } from "react";
import { devitrackApi, devitrackApiAdmin } from "../../../apis/devitrackApi";
import { useAdminStore } from "../../../hooks/useAdminStore";
import Swal from "sweetalert2";
import { ModalAdminNewUser } from "../ui/Modal";

import "../../../style/pages/admin/setting.css";
/**
 * Renders the setting detail info component.
 * @param {object} searchTerm - the search term for filtering results
 * @returns {JSX.Element} - Returns the JSX element of the component.
 */
export const SettingDetailInfo = ({ searchTerm }) => {
  /**
   * Retrieves the user from the admin store.
   * @type {object}
   */
  const { user } = useAdminStore();
  /**
   * Retrieves the editAdminPermission from the admin store.
   * @type {function}
   */
  const { editAdminPermission } = useAdminStore();
  /**
   * Stores the admin user in the state.
   * @type {array}
   */
  const [adminUser, setAdminUser] = useState([]);
  /**
   * Stores the user object id in the state.
   * @type {string}
   */
  const [sendObjectIdUser, setSendObjectIdUser] = useState();
  /**
   * Stores the permission status in the state.
   * @type {boolean}
   */
  const [permissionStatus, setPermissionStatus] = useState(false);
  /**
   * Stores the permission updated in the state.
   * @type {string}
   */
  const [permissionUpdated, setPermissionUpdated] = useState("");
  /**
   * Reloads the list after a change has been made.
   * @type {boolean}
   */
  const [reloadListAfterChange, setReloadListAfterChange] = useState(false);
  /**
   * Stores the state of the modal.
   * @type {boolean}
   */
  const [modalState, setModalState] = useState(false);
  /**
   * Stores the admin user role in the state.
   * @type {string}
   */
  const adminUserRole = user.role;

  /**
   * Retrieves the admin user list from the server.
   * @type {function}
   * @returns {void}
   */
  useEffect(() => {
    devitrackApi
      .get("/staff/admin-users")
      .then((response) => response.data)
      .then((data) => setAdminUser(data.adminUsers));
  }, [reloadListAfterChange, adminUser]);

  /**
   * Toggles the permission status.
   * @type {function}
   * @returns {void}
   */
  const handleEditAdminPermission = async () => {
    setPermissionStatus(!permissionStatus);
  };

  /**
   * Updates the admin permission.
   * @type {function}
   * @param {string} permissionUpdated - the updated permission status
   * @returns {void}
   */
  const updatePermission = async (permissionUpdated) => {
    await editAdminPermission({ role: permissionUpdated, sendObjectIdUser });
    await setPermissionStatus(!permissionStatus);
    await setReloadListAfterChange(!reloadListAfterChange);
  };
  return (
    <div className="container-setting-detail">
      <div className="container-company-staff">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          <h2>Company Staff</h2>
          <div className="create-new-user">
            {user.role === "Administrator" ? (
              <p className="" onClick={() => setModalState(true)}>
                CREATE NEW STAFF MEMBER <i className="bi bi-plus-circle" />
              </p>
            ) : null}
          </div>{" "}
        </div>
        <div style={{ overflow: "auto" }}>
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
              ? adminUser?.map((user, index) => {
                  let background;
                  if (index === 0) {
                    background = "#ffff";
                  }
                  if (index % 2 === 0) {
                    background = "#F1F6F9";
                  }
                  return (
                    <>
                      <tbody key={user.id}>
                        <tr style={{ background: `${background}` }}>
                          <td>{user.name}</td>
                          <td>{user.role}</td>
                          <td>{user.email}</td>
                          <td>
                            <button
                              className="btn btn-detail"
                              style={{ width: "100%" }}
                              onClick={() => setSendObjectIdUser(user.id)}
                            >
                              Details <i className="bi bi-caret-right" />{" "}
                            </button>
                          </td>
                        </tr>
                      </tbody>
                    </>
                  );
                })
              : adminUser
                  ?.filter((item) =>
                    item.name.toLowerCase().includes(searchTerm.toLowerCase())
                  )
                  ?.map((user) => {
                    return (
                      <tbody key={user.id}>
                        <tr>
                          <td>{user.name}</td>
                          <td>{user.role}</td>
                          <td style={{ color: "#15AAF5" }}>{user.email}</td>
                          <td>
                            <button
                              className="btn btn-detail"
                              style={{ width: "100%" }}
                              onClick={() => setSendObjectIdUser(user.id)}
                            >
                              Details <i className="bi bi-caret-right" />{" "}
                            </button>
                          </td>
                        </tr>
                      </tbody>
                    );
                  })}
          </table>
        </div>
      </div>
      <div className="container-company-staff-detail">
        <div className="staff-detail">
          {adminUser?.map((user) => {
            if (user.id === sendObjectIdUser) {
              return (
                <div key={user.id} className="container-admin-user-details">
                  <div className="container-admin-user-details-card">
                    <div className="admin-user-details-card">
                      <h3>
                        {user.name} {user.lastName}
                      </h3>
                      <div className="edit-button">
                        {adminUserRole === "Approver" ||
                        adminUserRole === "Administrator" ? (
                          <>
                            <h6 onClick={handleEditAdminPermission}>
                              {user.role}
                            </h6>
                            <i className="bi bi-pencil" />
                          </>
                        ) : (
                          <h6>{user.role}</h6>
                        )}
                      </div>
                    </div>
                    <hr />
                    <div className="container-admin-role">
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
                          <div className="buttons-edit-permission">
                            <button
                              className="btn btn-delete"
                              style={{ width: "90%" }}
                              onClick={handleEditAdminPermission}
                            >
                              Cancel
                            </button>
                            <button
                              className="btn btn-create"
                              style={{ width: "90%" }}
                              onClick={() =>
                                updatePermission(permissionUpdated)
                              }
                            >
                              Save
                            </button>
                          </div>
                        ) : null}
                      </div>
                    </div>
                    <div className="container-admin-user-details-card">
                      <h5>CONTACT INFO</h5>
                      <div style={{ textAlign: "left" }}>
                        <label>Phone: </label>{" "}
                        <span>
                          &nbsp;
                          {user.phone ? user.phone : "XXX-XXX-XXXX"}
                        </span>
                        <br />
                        <label>Email :</label> <span>&nbsp;{user.email}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    {sendObjectIdUser !== undefined &&
                    adminUserRole === "Administrator" ? (
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "flex-start",
                          alignItems: "center",
                        }}
                      >
                        <p
                          className="delete-staff-member"
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
                                  devitrackApiAdmin.delete(
                                    `/${sendObjectIdUser}`
                                  );
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
                          DELETE <i className="bi bi-trash3" />
                        </p>
                      </div>
                    ) : null}
                  </div>
                </div>
              );
            }
          })}
        </div>
      </div>
      <ModalAdminNewUser
        modalState={modalState}
        setModalState={setModalState}
      />
    </div>
  );
};
