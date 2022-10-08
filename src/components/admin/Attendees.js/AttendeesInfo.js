import { current } from "@reduxjs/toolkit";
import React, { useEffect, useState } from "react";
import { devitrackApi } from "../../../apis/devitrackApi";
import { Pagination } from "../ui/Pagination";
import { StripeTransactionHistoryByUser } from "./StripeTransactionHistoryByUser";

export const AttendeesInfo = ({ searchTerm }) => {
  const [users, setUsers] = useState([]);
  const [sendObjectIdUser, setSendObjectIdUser] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [usersRenderedPerPage] = useState(4);

  useEffect(() => {
    devitrackApi
      .get("/auth/users")
      .then((response) => response.data)
      .then((data) => setUsers(data.users));
  }, []);

  const indexOfLastUsersRendered = currentPage * usersRenderedPerPage;
  const indexOfFirstUsersRendered = indexOfLastUsersRendered - usersRenderedPerPage;
  const currentUsersRendered = users.slice(
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
        height:"25%"
      }}
    >
      <div
        style={{
          width: "45%",
          border: "solid 2px #212529",
          borderRadius: "15px",
          padding: "20px",
        }}
      >
        <div>
          <h2>Users</h2>
        </div>
        <div>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">details</th>
              </tr>
            </thead>
            {searchTerm.length < 2 ? currentUsersRendered
              ?.map((user, item) => {
                // currentUsersRendered;
                return (
                  <tbody key={user.id}>
                    <tr>
                      <th scope="row">{item + 1}</th>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>
                        <button onClick={() => setSendObjectIdUser(user.id)}>
                          Details <i className="bi bi-caret-right" />{" "}
                        </button>
                      </td>
                    </tr>
                  </tbody>
                );
              }): users?.filter(( item )=> item.email.includes( searchTerm ))
              ?.map((user, item) => {
                // currentUsersRendered;
                return (
                  <tbody key={user.id}>
                    <tr>
                      <th scope="row">{item + 1}</th>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>
                        <button onClick={() => setSendObjectIdUser(user.id)}>
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
              totalChildren={users.length}
              paginate={paginate}
            />
          </div>
        </div>
      </div>
      <div
        style={{
          width: "70%",
          border: "solid 2px #212529",
          borderRadius: "15px",
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <div>
          <h2>Details</h2>
        </div>
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
                </div>
              );
            }
          })}
        </div>
        <div  style={{ width: "100%"}}>
          <div>Transactions</div>
          <div style={{ width: "100%"}}>
            <StripeTransactionHistoryByUser
              sendObjectIdUser={sendObjectIdUser}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
