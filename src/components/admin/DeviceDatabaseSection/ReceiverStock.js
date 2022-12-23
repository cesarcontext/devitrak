import React, { useEffect, useState } from "react";
import { CSVLink } from "react-csv";
import { devitrackApi } from "../../../apis/devitrackApi";
import { UserTable } from "../../../helper/UserTable";
import { DeviceUsersHistory } from "./DeviceUsersHistory";
import "../../../style/component/admin/DeviceDatabase.css";
import { useInterval } from "interval-hooks";
import ReactPaginate from "react-paginate";

export const ReceiverStock = ({ searchTerm }) => {
  const [listOfReceiver, setListOfReceiver] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingDownload, setLoadingDownload] = useState(false);
  const [receiverId, setReceiverId] = useState(null);
  const [receiverDetail, setReceiverDetail] = useState("");
  const [currentItemsRendered, setCurrentItemsRendered] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 4;

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

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % listOfReceiver.length;
    setItemOffset(newOffset);
  };

  useInterval(async () => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItemsRendered(listOfReceiver.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(listOfReceiver.length / itemsPerPage));
  }, 2_00);

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
  ];

  const fileName = "receiver-inventory";
  let conditionReturned = null;

  let filteredResult = [];

  const filter = async () => {
    for (let i = 0; i < listOfReceiver.length; i++) {
      if (searchTerm === listOfReceiver[i].device) {
        return (filteredResult = [
          {
            ...listOfReceiver[i],
            index: i,
          },
        ]);
      }
    }
  };
  filter();

  return (
    <div className="container-stock-device">
      <div className="container-stock-device-list">
        <div>
          <h2>Stock</h2>
        </div>
        <div className="container-device-info-table">
          <table className="table">
            <caption></caption>
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Device S/N</th>
                <th scope="col">Activity</th>
                <th scope="col">details</th>
              </tr>
            </thead>
            {searchTerm === ""
              ? currentItemsRendered?.map((receiver, index) => {
                  return (
                    <tbody key={receiver.id}>
                      <tr>
                        <th scope="row">{index + 1}</th>
                        <td>{receiver.device}</td>
                        <td>{receiver.activity}</td>
                        <td>
                          <button
                            className="btn btn-detail"
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
              : filteredResult.map((receiver) => {
                  return (
                    <tbody key={receiver.id}>
                      <tr>
                        <th scope="row">{receiver.index + 1}</th>
                        <td>{receiver.device}</td>
                        <td>{receiver.activity}</td>
                        <td>
                          <button
                            className="btn btn-detail"
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
            <button
              style={{ width: "12vw", padding: "2px" }}
              variant="contained"
              color="primary"
              className="export-btn btn-delete"
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

      <div className="container-stock-device-details">
        <div>
          <h2>Details</h2>
        </div>
        <div className="detail-history-container">
          {" "}
          <div className="device-detail-section">
            {listOfReceiver?.map((receiver, index) => {
              if (receiver.id === receiverId) {
                if (
                  receiver.activity === "Stored" &&
                  receiver.status !== "Operational"
                ) {
                  conditionReturned = receiver.device;
                }
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
          <DeviceUsersHistory
            receiverId={receiverId}
            receiverDetail={receiverDetail}
            listOfReceiver={listOfReceiver}
            conditionReturned={conditionReturned}
          />{" "}
        </div>
      </div>
      <div className="d-none">
        {loadingDownload === true ? (
          <UserTable headers={headers} listOfReceiver={listOfReceiver} />
        ) : null}
      </div>
    </div>
  );
};
