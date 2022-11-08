import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { devitrackApi } from "../../../apis/devitrackApi";
import { ModalCreateUser } from "../ui/ModalCreateUser";
import { Pagination } from "../ui/Pagination";
import { StripeTransactionHistoryByUser } from "./StripeTransactionHistoryByUser";
import { onAddPaymentIntentDetailSelected } from "../../../store/slices/stripeSlice";

export const AttendeesInfo = ({ searchTerm }) => {
  const [users, setUsers] = useState([]);
  const [sendObjectIdUser, setSendObjectIdUser] = useState();
  const [createUserButton, setCreateUserButton] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersRenderedPerPage] = useState(4);
  const dispatch = useDispatch()

  useEffect(() => {
    devitrackApi
      .get("/auth/users")
      .then((response) => response.data)
      .then((data) => setUsers(data.users));
  }, [createUserButton]);

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
            {searchTerm.length < 2
              ? currentUsersRendered?.map((user, item) => {
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
            <div>
              <button onClick={() => setCreateUserButton(true)}>
                Create user
              </button>
            </div>
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
        </div>
        <div style={{ width: "100%" }}>
          <div>Transactions</div>
          {users?.map((user) => {
            if (user.id === sendObjectIdUser) {
              if (user.category === "Regular") {
                return (
                  <div key={user.id}>
                    <StripeTransactionHistoryByUser
                      sendObjectIdUser={sendObjectIdUser}
                    />
                  </div>
                );
              }
              if (user.category === "No-regular") {
                return (
                  <div key={user.id}>
                    <div
                      style={{
                        width: "50%",
                        display: "flex",
                        flexWrap: "wrap",
                        justifyContent: "space-between",
                        alignItems: "center",
                        margin: "0 auto"
                      }}
                    >
                      <div>
                        <h6>User Category</h6>
                        {user.category}
                      </div>
                      <div>
                        <h6>Device</h6>
                        <NavLink to="/admin/attendees/receiver_assignation">
                          <button style={{ width: "90%", padding: "5px" }}
                          onClick={() => 
                            dispatch(
                            onAddPaymentIntentDetailSelected({user})
                          )}>
                            Assign Device
                          </button>
                        </NavLink>
                      </div>
                    </div>
                  </div>
                );
              }
            }
          })}
        </div>
      </div>
      <ModalCreateUser
        createUserButton={createUserButton}
        setCreateUserButton={setCreateUserButton}
      />
    </div>
  );
};
