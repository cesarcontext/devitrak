import React, { useEffect, useState } from "react";

import { devitrackApi } from "../../../apis/devitrackApi";
import { useAdminStore } from "../../../hooks/useAdminStore";
import "../../../style/component/admin/attendeesInfo.css";
import "../../../style/component/ui/paginate.css";
import { ModalCreateUser } from "../ui/ModalCreateUser";
import { Link } from "react-router-dom";

export const AttendeesInfo = ({ searchTerm }) => {
  const { user } = useAdminStore();
  const [users, setUsers] = useState([]);
  const [userDetail, setUserDetail] = useState(null);
  const [createTransactionForNoRegularUser] = useState(false);
  const [sendObjectIdUser, setSendObjectIdUser] = useState();
  const [createUserButton, setCreateUserButton] = useState(false);
  const [ascense, setAscense] = useState(true);

  const callApiUser = async () => {
    const response = await devitrackApi.get("/auth/users");
    if (response) {
      setUsers(response.data.users);
    }
  };

  useEffect(() => {
    callApiUser();
  }, [createUserButton, createTransactionForNoRegularUser]);

  return (
    <div className="container-attendees">
      <div className="container-attendees-info">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          <h2>Users</h2>
          {user.role === "Administrator" ? (
            <div>
              <p
                className="create-new-user"
                onClick={() => setCreateUserButton(true)}
              >
                CREATE NEW USER <i className="bi bi-plus-circle" />
              </p>
            </div>
          ) : null}
          {/* </div> */}
        </div>
        <div
          style={{ overflow: "auto" }}
          className="container-attendees-info-table"
        >
          <table className="table">
            <caption></caption>
            <thead
              style={{
                position: "sticky",
                top: "0",
                background: "white",
              }}
            >
              <tr>
                <th scope="col">
                  Name{" "}
                  {ascense === true ? (
                    <i
                      onClick={() => setAscense(!ascense)}
                      className="bi bi-sort-down"
                    />
                  ) : (
                    <i
                      onClick={() => setAscense(!ascense)}
                      className="bi bi-sort-up"
                    />
                  )}
                </th>
                <th scope="col">Email </th>
                <th scope="col">Details</th>
              </tr>
            </thead>
            {ascense === true &&
              users
                ?.sort((a, b) => a.name.localeCompare(b.name))
                ?.map((user, item) => {
                  let background;
                  if (item === 0) {
                    background = "#ffff";
                  }
                  if (item % 2 === 0) {
                    background = "#F1F6F9";
                  }
                  return (
                    <tbody key={user.id}>
                      <tr style={{ background: `${background}` }}>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>
                        <Link to={`/admin/attendee/:${user.id}`}>
                          <button
                            style={{
                              width: "100%",
                            }}
                            className="btn btn-detail"
                            onClick={() => {
                              setSendObjectIdUser(user.id);
                              setUserDetail(user);
                            }}
                          >
                            Details <i className="bi bi-caret-right" />{" "}
                          </button>
                          </Link>
                        </td>
                      </tr>
                    </tbody>
                  );
                })}

            {ascense === false &&
              users
                ?.sort((a, b) => b.name.localeCompare(a.name))
                ?.map((user, item) => {
                  let background;
                  if (item === 0) {
                    background = "#ffff";
                  }
                  if (item % 2 === 0) {
                    background = "#F1F6F9";
                  }
                  return (
                    <tbody key={user.id}>
                      <tr style={{ background: `${background}` }}>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>
                          <Link to={`/admin/attendee/:${user.id}`}>
                       <button
                            style={{
                              width: "100%",
                            }}
                            className="btn btn-detail"
                            onClick={() => {
                              setSendObjectIdUser(user.id);
                              setUserDetail(user);
                            }}
                          >
                            Details <i className="bi bi-caret-right" />{" "}
                          </button>   </Link>
                          
                        </td>
                      </tr>
                    </tbody>
                  );
                })}
          </table>
        </div>
      </div>
      <ModalCreateUser
        createUserButton={createUserButton}
        setCreateUserButton={setCreateUserButton}
      />
      {/* <div>
        <DetailUser
          sendObjectIdUser={sendObjectIdUser}
          userDetail={userDetail}
        />
      </div> */}
    </div>
  );
};
