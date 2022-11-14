import React, { useEffect, useState } from "react";
import { CSVLink } from "react-csv";
import { devitrackApi } from "../../../apis/devitrackApi";
import { UserTable } from "../../../helper/UserTable";
import { Pagination } from "../ui/Pagination";
import { DeviceUsersHistory } from "./DeviceUsersHistory";

export const ReceiverStock = () => {
  const [listOfReceiver, setListOfReceiver] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingDownload, setLoadingDownload] = useState(false);
  const [receiverId, setReceiverId] = useState(null);
  const [receiverDetail, setReceiverDetail] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [receiverRenderedPerPage] = useState(4);
  const indexOfLastReceiverRendered = currentPage * receiverRenderedPerPage;
  const indexOfFirstReceiverRendered =
    indexOfLastReceiverRendered - receiverRenderedPerPage;
  const currentReceiversRendered = listOfReceiver.slice(
    indexOfFirstReceiverRendered,
    indexOfLastReceiverRendered
  );

  const paginate = (pageNumbers) => {
    setCurrentPage(pageNumbers);
  };

  const callApi = async () => {
    const response = await devitrackApi.get("/receiver/receiver-pool-list");
    if (response) {
      setListOfReceiver(response.data.receiversInventory);
      setLoading(true);
    }
  };
  useEffect(() => {
    const controller = new AbortController();
    callApi();
    getReceiverData();
    return () => {
      controller.abort();
    };
  }, [listOfReceiver.length, loading]);

  const getReceiverData = async () => {
    setLoadingDownload(true);
    try {
      const response = await devitrackApi.get("/receiver/receiver-pool-list");
      if (response) {
        setListOfReceiver(response.data.receiversInventory);
        setLoadingDownload(false);
      }
    } catch (error) {
      console.log("Error: ", error);
      setLoading(false);
    }
  };

  const headers = [
    { label: "Device", key: "device" },
    { label: "status", key: "status" },
    { label: "Activity", key: "activity" },
    { label: "Comment", key: "comment" },
    { label: "User", key: "user" },
  ];

  const fileName = "receiver-inventory";

  return (
    <div
      style={{
        width: "70%",
        display: "flex",
        columnGap: "2%",
        margin: "2% auto",
        height: "25%",
      }}
    >
      <div
        style={{
          width: "60%",
          border: "solid 2px #212529",
          borderRadius: "15px",
          padding: "20px",
        }}
      >
        <div>
          <h2>Stock</h2>
        </div>
        <div>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Device S/N</th>
                <th scope="col">Activity</th>
                <th scope="col">details</th>
              </tr>
            </thead>
            {loading !== false
              ? currentReceiversRendered?.map((receiver, index) => {
                  return (
                    <tbody key={receiver.id}>
                      <tr>
                        <th scope="row">{index + 1}</th>
                        <td>{receiver.device}</td>
                        <td>{receiver.activity}</td>
                        <td>
                          <button
                            onClick={() => {
                              setReceiverId(receiver.id);
                              setReceiverDetail(receiver.device);
                            }}
                          >
                            Detail
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  );
                })
              : ""}
          </table>
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
            <div>
              <Pagination
                childrenRenderedPerPage={receiverRenderedPerPage}
                totalChildren={listOfReceiver.length}
                paginate={paginate}
              />
            </div>
            <div>
              <button
                variant="contained"
                color="primary"
                className="export-btn"
                onClick={() => setLoadingDownload(false)}
              >
                <CSVLink
                  headers={headers}
                  data={listOfReceiver}
                  filename={fileName}
                  style={{ textDecoration: "none", color: "#fff" }}
                >
                  {loadingDownload ? "Loading csv..." : "Export Data"}
                </CSVLink>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        style={{
          width: "35%",
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
              padding: "5px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              alignItems: "center",
              textAlign: "left",
            }}
          >
            {listOfReceiver?.map((receiver, index) => {
              if (receiver.id === receiverId) {
                return (
                  <div key={receiver.id}>
                    <div>
                      <strong>Device: </strong>
                      {receiver.device}
                    </div>
                    <div>
                      <strong>Activity: </strong>
                      {receiver.activity}
                    </div>
                    <div>
                      <strong>Status: </strong>
                      {receiver.status}
                    </div>
                    <div>
                      <strong>Comment: </strong>
                      {receiver.comment}
                    </div>
                  </div>
                );
              }
            })}
          </div>
        </div>
        <DeviceUsersHistory
          receiverId={receiverId}
          receiverDetail={receiverDetail}
          listOfReceiver={listOfReceiver}
        />
      </div>
      <div className="d-none">
        <UserTable headers={headers} listOfReceiver={listOfReceiver} />
      </div>
    </div>
  );
};
