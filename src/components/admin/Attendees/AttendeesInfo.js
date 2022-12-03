import React, { useEffect, useState } from "react";
import { devitrackApi } from "../../../apis/devitrackApi";
import { ModalCreateUser } from "../ui/ModalCreateUser";
import { Pagination } from "../ui/Pagination";
import { StripeTransactionHistoryByUser } from "./StripeTransactionHistoryByUser";
import { ModalCreateTransactionForNoRegularUser } from "../ui/ModalCreateTransactionForNoRegularUser";
import { useAdminStore } from "../../../hooks/useAdminStore";
import "../../../style/component/admin/attendeesInfo.css";

export const AttendeesInfo = ({ searchTerm }) => {
  const { user } = useAdminStore();
  const [users, setUsers] = useState([]);
  const [userDetail, setUserDetail] = useState(null);
  const [
    createTransactionForNoRegularUser,
    setCreateTransactionForNoRegularUser,
  ] = useState(false);
  const [sendObjectIdUser, setSendObjectIdUser] = useState();
  const [createUserButton, setCreateUserButton] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersRenderedPerPage] = useState(4);

  useEffect(() => {
    devitrackApi
      .get("/auth/users")
      .then((response) => response.data)
      .then((data) => setUsers(data.users));
  }, [createUserButton, createTransactionForNoRegularUser]);

  const indexOfLastUsersRendered = currentPage * usersRenderedPerPage;
  const indexOfFirstUsersRendered =
    indexOfLastUsersRendered - usersRenderedPerPage;
  const currentUsersRendered = users.slice(
    indexOfFirstUsersRendered,
    indexOfLastUsersRendered
  );

  const paginate = (pageNumbers) => {
    setCurrentPage(pageNumbers);
  };
  return (
    <div className="container-attendees">
      <div className="container-attendees-info">
        <div>
          <h2>Users</h2>
        </div>
        <div className="container-attendees-info-table">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">details</th>
              </tr>
            </thead>
            {searchTerm.length < 2
              ? currentUsersRendered?.map((user, item) => {
                  return (
                    <tbody key={user.id}>
                      <tr>
                        <th scope="row">{item + 1}</th>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>
                          <button
                          className="btn btn-detail"
                            onClick={() => {
                              setSendObjectIdUser(user.id);
                              setUserDetail(user.category);
                            }}
                          >
                            Details <i className="bi bi-caret-right" />{" "}
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  );
                })
              : users
                  ?.filter((item) => item.email.includes(searchTerm))
                  ?.map((user, item) => {
                    // currentUsersRendered;
                    return (
                      <tbody key={user.id}>
                        <tr>
                          <th scope="row">{item + 1}</th>
                          <td>{user.name}</td>
                          <td>{user.email}</td>
                          <td>
                            <button
                            className="btn btn-detail"
                              onClick={() => {
                                setSendObjectIdUser(user.id);
                                setUserDetail(user.category);
                              }}
                            >
                              Details <i className="bi bi-caret-right" />{" "}
                            </button>
                          </td>
                        </tr>
                      </tbody>
                    );
                  })}
          </table>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <Pagination
                childrenRenderedPerPage={usersRenderedPerPage}
                totalChildren={users.length}
                paginate={paginate}
              />
            </div>
            {user.role === "Administrator" ? (
              <div>
                <button className="btn btn-create" onClick={() => setCreateUserButton(true)}>
                  Create user
                </button>
              </div>
            ) : null}
          </div>
        </div>
      </div>
      <div className="container-attendees-info-detail">
        <div>
          <h2>Details</h2>
        </div>
        <div className="container-user-info-detail">
          {" "}
          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              {users?.map((user) => {
                if (user.id === sendObjectIdUser) {
                  return (
                    <div key={user.id}>
                      <div>
                        <strong>Fullname:</strong> {user.name} {user.lastName}
                      </div>
                      <div>
                        <strong>Email: </strong>
                        {user.email}
                      </div>
                      <div>
                        <strong>Phone: </strong>
                        {user.phoneNumber}
                      </div>
                      <div>
                        <strong>Category: </strong>
                        {user.category}
                      </div>
                    </div>
                  );
                }
              })}
            </div>
            <div>
              {user.role === "Administrator"
                ? users?.map((user) => {
                    if (user.id === sendObjectIdUser) {
                      return (
                        <button
                        className="btn btn-create"
                          onClick={() => {
                            setCreateTransactionForNoRegularUser(true);
                          }}
                        >
                          Create Transaction
                        </button>
                      );
                    }
                  })
                : null}
            </div>
          </div>
        </div>
        <div className="container-attendes-stripe-transaction-info">
          {users?.map((user) => {
            if (user.id === sendObjectIdUser) {
              return (
                <div
                  id="stripe-transaction-detail-per-user-id"
                  className="stripetransaction-detail-info"
                  key={user.id}
                >
                  <StripeTransactionHistoryByUser
                    sendObjectIdUser={sendObjectIdUser}
                    userDetail={userDetail}
                    createTransactionForNoRegularUser={
                      createTransactionForNoRegularUser
                    }
                  />
                </div>
              );
            }
          })}
        </div>
      </div>
      <ModalCreateUser
        createUserButton={createUserButton}
        setCreateUserButton={setCreateUserButton}
      />
      <ModalCreateTransactionForNoRegularUser
        createTransactionForNoRegularUser={createTransactionForNoRegularUser}
        setCreateTransactionForNoRegularUser={
          setCreateTransactionForNoRegularUser
        }
        sendObjectIdUser={sendObjectIdUser}
      />
    </div>
  );
};
