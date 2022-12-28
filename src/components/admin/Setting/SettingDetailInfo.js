import React, { useEffect, useState } from "react";
import { devitrackApi, devitrackApiAdmin } from "../../../apis/devitrackApi";
import { useAdminStore } from "../../../hooks/useAdminStore";
import Swal from "sweetalert2";
import { ModalAdminNewUser } from "../ui/Modal";

import "../../../style/pages/admin/setting.css";
import ReactPaginate from "react-paginate";
import { useInterval } from "interval-hooks";

export const SettingDetailInfo = ({ searchTerm }) => {
  const { user } = useAdminStore();
  const { editAdminPermission } = useAdminStore();
  const [adminUser, setAdminUser] = useState([]);
  const [sendObjectIdUser, setSendObjectIdUser] = useState();
  const [permissionStatus, setPermissionStatus] = useState(false);
  const [permissionUpdated, setPermissionUpdated] = useState("");
  const [reloadListAfterChange, setReloadListAfterChange] = useState(false);
  const [modalState, setModalState] = useState(false);
  const [currentItemsRendered, setCurrentItemsRendered] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 4;

  const adminUserRole = user.role;

  useEffect(() => {
    devitrackApi
      .get("/staff/admin-users")
      .then((response) => response.data)
      .then((data) => setAdminUser(data.adminUsers));
  }, [reloadListAfterChange, adminUser]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % adminUser.length;
    setItemOffset(newOffset);
  };

  useInterval(async () => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItemsRendered(adminUser.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(adminUser.length / itemsPerPage));
  }, 2_00);

  const handleEditAdminPermission = async () => {
    setPermissionStatus(!permissionStatus);
  };

  const updatePermission = async (permissionUpdated) => {
    await editAdminPermission({ role: permissionUpdated, sendObjectIdUser });
    await setPermissionStatus(!permissionStatus);
    await setReloadListAfterChange(!reloadListAfterChange);
  };
  return (
    <div className="container-setting-detail">
      <div className="container-company-staff">
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
              ? currentItemsRendered?.map((user, index) => {
                let background;
                if( index === 0){
                  background = "#ffff"
                }
                if(index % 2 === 0){
                  background = "#F1F6F9"
                } 
                  return (
                    <tbody key={user.id}>
                      <tr style={{background:`${background}`}}>
                        <td>{user.name}</td>
                        <td>{user.role}</td>
                        <td>{user.email}</td>
                        <td>
                          <button
                            className="btn btn-detail"
                            onClick={() => setSendObjectIdUser(user.id)}
                          >
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
                      <tbody key={user.id}>
                        <tr>
                          <td>{user.name}</td>
                          <td>{user.role}</td>
                          <td>{user.email}</td>
                          <td>
                            <button
                              className="btn btn-detail"
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
          <div className="container-section-pagination-button">
            <ReactPaginate
              breakLabel="..."
              nextLabel="next >"
              onPageChange={handlePageClick}
              pageRangeDisplayed={2}
              pageCount={pageCount}
              previousLabel="< prev"
              renderOnZeroPageCount={null}
              containerClassName="pagination"
              pageLinkClassName="page-num"
              previousLinkClassName="page-num"
              nextLinkClassName="page-num"
              activeLinkClassName="tab-active"
            />
            <div>
              {user.role === "Administrator" ? (
                <button
                  className="btn btn-create"
                  onClick={() => setModalState(true)}
                >
                  Create new user
                </button>
              ) : null}
            </div>
          </div>
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
                              className="btn btn-create"
                              onClick={() =>
                                updatePermission(permissionUpdated)
                              }
                            >
                              Save
                            </button>
                            <button
                              className="btn btn-delete"
                              onClick={handleEditAdminPermission}
                            >
                              Cancel
                            </button>
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </div>
                  <div className="container-admin-user-details-card">
                    <h5>CONTACT INFO</h5>
                    <div>
                      <label>Phone: </label> <span>{user.phoneNumber}</span>
                      <br />
                      <label>Email :</label> <span>{user.email}</span>
                    </div>
                  </div>
                </div>
              );
            }
          })}
        </div>
        {/* </div> */}
        {sendObjectIdUser !== undefined && user.role === "Administrator" ? (
          <div>
            <button
              className="btn btn-delete"
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
      <ModalAdminNewUser
        modalState={modalState}
        setModalState={setModalState}
      />
    </div>
  );
};
