import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FixedSizeList } from "react-window";
import { devitrackApi } from "../../../apis/devitrackApi";
import { useAdminStore } from "../../../hooks/useAdminStore";
import { ModalCreateUser } from "../ui/ModalCreateUser";
import "../../../style/component/admin/attendeesInfo.css";
import "../../../style/component/ui/paginate.css";
import "../../../style/component/admin/table.css";
import { useSelector } from "react-redux";
import { useBlockLayout, useSortBy, useTable } from "react-table";

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
  const callApiUser = useCallback(async () => {
    const response = await devitrackApi.get("/auth/users");
    if (response) {
      setUsers(response.data.users);
    }
  }, [choice]);

  useEffect(() => {
    callApiUser();
  }, [createUserButton, createTransactionForNoRegularUser, choice]);

  const data = useMemo(() => users, [users.length]);
  const columns = React.useMemo(
    () => [
      {
        Header: "First Name",
        accessor: "name",
      },
      {
        Header: "Last Name",
        accessor: "lastName",
      },
      {
        Header: "Email",
        accessor: "email",
      },
      {
        Header: "Detail",
        accessor: "id",
        Cell: (props) => (
          <button
            style={{ width: "fit-content" }}
            className="btn btn-create"
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
      useBlockLayout
    );

  const RenderRow = React.useCallback(
    ({ index, style }) => {
      const row = rows[index];
      prepareRow(row);
      return (
        <div
          {...row.getRowProps({
            style,
          })}
          className="tr"
        >
          {row.cells.map((cell) => {
            return (
              <div {...cell.getCellProps()} className="td">
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
          <div {...getTableProps()}
          //  className="table-data"
           >
            <div>
              {headerGroups.map((headerGroup) => (
                <div {...headerGroup.getHeaderGroupProps()} 
                // className="tr-data"
                >
                  {headerGroup.headers.map((column) => (
                    <div
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                      // className="th-data"
                    >
                      {column.render("Header")}
                      <span>
                        {column.isSorted
                          ? column.isSortedDesc
                            ? " 🔽"
                            : " 🔼"
                          : ""}
                      </span>
                    </div>
                  ))}
                </div>
              ))}
            </div>

            <div {...getTableBodyProps()}>
              <FixedSizeList height={400} itemCount={rows.length} itemSize={35}>
                {RenderRow}
              </FixedSizeList>
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
