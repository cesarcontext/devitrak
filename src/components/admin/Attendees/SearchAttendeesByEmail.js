import React, { useState, useEffect } from 'react'
import { devitrackApi } from '../../../apis/devitrackApi';
import { DetailUser } from './DetailUser';
import "../../../style/component/admin/attendeesInfo.css"

export const SearchAttendeesByEmail = ({searchTerm}) => {
    const [users, setUsers] = useState([]);
    const [userDetail, setUserDetail] = useState(null);
    const [
      createTransactionForNoRegularUser
    ] = useState(false);
    const [sendObjectIdUser, setSendObjectIdUser] = useState();
  
  
    const callApiUser = async () => {
      const response = await devitrackApi.get("/auth/users");
      if (response) {
        setUsers(response.data.users);
      }
    };
  
    useEffect(() => {
      callApiUser();
    }, [createTransactionForNoRegularUser]);
  
  
    return (
      <div className="container-attendees">
        <div className="container-attendees-info">
          <div style={{textAlign:"left"}}>
            <h2>Users</h2>
          </div>
          <div className="container-attendees-info-table">
            <table className="table">
              <caption></caption>
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Details</th>
                </tr>
              </thead>
              {users?.filter(user => user.email.includes(searchTerm))?.map((user, item) => {                  
                return (
                  <tbody key={user.id}>
                     <tr>
                      <th scope="row">{item + 1}</th>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>
                        <button
                        style={{
                          width:"100%"
                        }}
                          className="btn btn-detail"
                          onClick={() => {
                            setSendObjectIdUser(user.id);
                            setUserDetail(user);
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
          </div>
        </div>
        <DetailUser sendObjectIdUser={sendObjectIdUser} userDetail={userDetail} />
      </div>
    );
  };
  
