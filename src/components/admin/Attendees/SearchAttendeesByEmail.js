import React, { useState, useEffect } from "react";
import { devitrackApi } from "../../../apis/devitrackApi";
import "../../../style/component/admin/attendeesInfo.css";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  onAddPaymentIntentDetailSelected,
  onAddPaymentIntentSelected,
} from "../../../store/slices/stripeSlice";

/**

Search attendees by email.
@function
@param {Object} props - Component props.
@param {string} props.searchTerm - Search term for attendees by email.
@returns {JSX.Element} - Rendered component.
*/
export const SearchAttendeesByEmail = ({ searchTerm }) => {
  const [users, setUsers] = useState([]);
  const [createTransactionForNoRegularUser] = useState(false);
  const dispatch = useDispatch();
/**

Calls the API to retrieve a list of users based on search term.
@async
@function
*/
  const callApiUser = async () => {
    const response = await devitrackApi.get("/auth/users");
    if (response) {
      setUsers(response.data.users);
    }
  };
/**

Calls the API to retrieve a list of users when the component is mounted
or when createTransactionForNoRegularUser is updated.
@effect
@function
*/
  useEffect(() => {
    callApiUser();
  }, [createTransactionForNoRegularUser]);

  return (
    <div className="container-attendees">
      <div className="container-attendees-info">
        <div style={{ textAlign: "left" }}>
          <h2>Users</h2>
        </div>
        <div className="container-attendees-info-table">
          <table className="table">
            <caption></caption>
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Details</th>
              </tr>
            </thead>
            {searchTerm.match(/@/) &&
              users
                ?.filter((user) => user.email.includes(searchTerm))
                ?.map((user, item) => {
                  return (
                    <tbody key={user.id}>
                      <tr>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>
                          <Link to={`/attendee/${user.id}`}>
                            <button
                              style={{
                                width: "100%",
                              }}
                              className="btn btn-detail"
                              onClick={() => {
                                dispatch(onAddPaymentIntentSelected(""));
                                dispatch(onAddPaymentIntentDetailSelected({}));
                              }}
                            >
                              Details <i className="bi bi-caret-right" />{" "}
                            </button>{" "}
                          </Link>
                        </td>
                      </tr>
                    </tbody>
                  );
                })}
            {users
              ?.filter((user) => user.name.toLowerCase().includes(searchTerm))
              ?.map((user, item) => {
                return (
                  <tbody key={user.id}>
                    <tr>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>
                        <Link to={`/attendee/${user.id}`}>
                          <button
                            style={{
                              width: "100%",
                            }}
                            className="btn btn-detail"
                            onClick={() => {
                              dispatch(onAddPaymentIntentSelected(""));
                              dispatch(onAddPaymentIntentDetailSelected({}));
                            }}
                          >
                            Details <i className="bi bi-caret-right" />{" "}
                          </button>{" "}
                        </Link>
                      </td>
                    </tr>
                  </tbody>
                );
              })}
          </table>
        </div>
      </div>
    </div>
  );
};
