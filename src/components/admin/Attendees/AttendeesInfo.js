import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { useInterval } from "interval-hooks";
import { DetailUser } from "./DetailUser";
import { devitrackApi } from "../../../apis/devitrackApi";
import { useAdminStore } from "../../../hooks/useAdminStore";
import "../../../style/component/admin/attendeesInfo.css";
import "../../../style/component/ui/paginate.css";
import { ModalCreateUser } from "../ui/ModalCreateUser";

export const AttendeesInfo = ({ searchTerm }) => {
  const { user } = useAdminStore();
  const [users, setUsers] = useState([]);
  const [userDetail, setUserDetail] = useState(null);
  const [
    createTransactionForNoRegularUser,
    setCreateTransactionForNoRegularUser,
  ] = useState(false);
  const [currentItemsRendered, setCurrentItemsRendered] = useState([]);
  const [sendObjectIdUser, setSendObjectIdUser] = useState();
  const [createUserButton, setCreateUserButton] = useState(false);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 4;

  const callApiUser = async () => {
    const response = await devitrackApi.get("/auth/users");
    if (response) {
      setUsers(response.data.users);
    }
  };

  useEffect(() => {
    callApiUser();
  }, [createUserButton, createTransactionForNoRegularUser]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % users.length;
    setItemOffset(newOffset);
  };

  useInterval(async () => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItemsRendered(users.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(users.length / itemsPerPage));
  }, 2_00);

  return (
    <div className="container-attendees">
      <div className="container-attendees-info">
        <div>
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
                <th scope="col">details</th>
              </tr>
            </thead>
            {currentItemsRendered?.map((user, item) => {
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
            {user.role === "Administrator" ? (
              <div>
                <button
                  className="btn btn-create"
                  onClick={() => setCreateUserButton(true)}
                >
                  Create user
                </button>
              </div>
            ) : null}
          </div>
        </div>
      </div>
      <DetailUser sendObjectIdUser={sendObjectIdUser} userDetail={userDetail} />
      <ModalCreateUser
        createUserButton={createUserButton}
        setCreateUserButton={setCreateUserButton}
      />
    </div>
  );
};
