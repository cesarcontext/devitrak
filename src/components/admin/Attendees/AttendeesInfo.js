import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  useBlockLayout,
  useResizeColumns,
  useSortBy,
  useTable,
} from "react-table";
import { FixedSizeList } from "react-window";
import { devitrackApi } from "../../../apis/devitrackApi";
import { useAdminStore } from "../../../hooks/useAdminStore";
import { ModalCreateUser } from "../ui/ModalCreateUser";
import "../../../style/component/admin/attendeesInfo.css";
import "../../../style/component/ui/paginate.css";
import "../../../style/component/admin/table.css";

/**

AttendeesInfo Component - Displays attendees information
@return {JSX.Element}
*/
export const AttendeesInfo = () => {
  const { user } = useAdminStore();
  const { choice } = useSelector((state) => state.event);
  const [users, setUsers] = useState([]);
  const [createTransactionForNoRegularUser] = useState(false);
  const [createUserButton, setCreateUserButton] = useState(false);
  const navigate = useNavigate();

  /**

  Fetches user data from devitrack API
  @returns {Promise<void>}
  */
  const callApiUser =async () => {
    const response = await devitrackApi.get("/auth/users");
    if (response) {
      setUsers(response.data.users);
    }
  }

  useEffect(() => {
    callApiUser();
  }, [createUserButton, createTransactionForNoRegularUser, choice]);

  let resultByChoice = []
  if(users.length > 0){
    for(let data of users){
      if(data.eventSelected === choice){
       resultByChoice.push(data)
      }
    }
  }
  const data = useMemo(() => resultByChoice, [users.length]);
  const columns = useMemo(
    () => [
      {
        Header: "First Name",
        accessor: "name",
        width: 310,
      },
      {
        Header: "Last Name",
        accessor: "lastName",
        width: 310,
      },
      {
        Header: "Email",
        accessor: "email",
        width: 310,
      },
      {
        Header: "Detail",
        accessor: "id",
        width: 150,
        Cell: (props) => (
          <button
            style={{ width: "fit-content" }}
            className="btn btn-detail"
            onClick={() => handleShow(props)}
          >
            Detail
          </button>
        ),
      },
    ],
    []
  );

  const handleShow = (cell) => {
    return navigate(`/admin/attendee/:${cell?.row?.original.id}`);
  };

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(
      {
        data,
        columns,
      },
      useSortBy,
      useBlockLayout,
      useResizeColumns
    );

  const RenderRow = useCallback(
    ({ index, style }) => {
      if (index % 2 === 0) {
        style = {
          ...style,
          backgroundColor: "#ffff",
        };
      } else {
        style = {
          ...style,
          backgroundColor: "#d7d7d700",
        };
      }
      const row = rows[index];
      prepareRow(row);
      return (
        <div
          {...row.getRowProps({
            style,
          })}
        >
          {row.cells.map((cell) => {
            return (
              <div
                {...cell.getCellProps()}
                className="table-body-td-attendee-page"
              >
                {cell.render("Cell")}
              </div>
            );
          })}
        </div>
      );
    },
    [prepareRow, rows]
  );

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
        </div>
        <div
          style={{ overflow: "auto" }}
          className="container-attendees-info-table"
        >
          <div {...getTableProps()} className="table-data-attendees-page">
            <div>
              {headerGroups.map((headerGroup) => (
                <div
                  {...headerGroup.getHeaderGroupProps()}
                  className="table-data-header-attendees-page"
                >
                  {headerGroup.headers.map((column) => (
                    <div
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                      className="table-data-th-attendees-page"
                    >
                      {column.render("Header")}
                      <span>
                        {column.isSorted
                          ? column.isSortedDesc
                            ? "🔽"
                            : "🔼"
                          : ""}
                      </span>
                    </div>
                  ))}
                </div>
              ))}
            </div>

            <div
              className="table-data-body-attendees-page"
              {...getTableBodyProps()}
            >
              <div className="table-body-td-attendee-page">
                <FixedSizeList
                  height={400}
                  itemCount={rows.length}
                  itemSize={55}
                >
                  {RenderRow}
                </FixedSizeList>
              </div>
            </div>
          </div>
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
