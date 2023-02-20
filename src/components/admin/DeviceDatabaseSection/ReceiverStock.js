import React, { useEffect, useState } from "react";
import { CSVLink } from "react-csv";
import { devitrackApi } from "../../../apis/devitrackApi";
import { DeviceUsersHistory } from "./DeviceUsersHistory";
import { useInterval } from "interval-hooks";
import "../../../style/component/admin/DeviceDatabase.css";

/**

@typedef {Object} ReceiverStockProps
@property {string} searchTerm - the search term used to filter the list of receivers
*/
/**

Component for displaying the list of available receivers.
@param {ReceiverStockProps} props - Component props
@returns {JSX.Element}
*/
export const ReceiverStock = ({ searchTerm }) => {
  const [dispatch, setDispatch] = useState(false);
  const [userDataMerged, setUserDataMerged] = useState([]);
  const [listOfReceiver, setListOfReceiver] = useState([]);
  const [listOfReceiverAssigned, setListOfReceiverAssigned] = useState([]);
  const [listReceiverReturnedByIssue, setListReceiverReturnedByIssue] =
    useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingDownload, setLoadingDownload] = useState(false);
  const [receiverId, setReceiverId] = useState(null);
  const [receiverDetail, setReceiverDetail] = useState("");
  const [sortUp, setSortUp] = useState(true);
  const [sortActivity, setSortActivity] = useState(null);

  /**
   * Calls the API to get the list of receivers.
   * @async
   * @function
   * @returns {Promise<void>} Returns a promise that resolves with no value when the list of receivers is set.
   */
  const callApi = async () => {
    const response = await devitrackApi.get("/receiver/receiver-pool-list");
    if (response) {
      setListOfReceiver(response.data.receiversInventory);
    }
  };

  /**
   * Calls the API to get the list of assigned receivers.
   * @async
   * @function
   * @returns {Promise<void>} Returns a promise that resolves with no value when the list of assigned receivers is set.
   */
  const callApiListOfReceiverAssigned = async () => {
    const response = await devitrackApi.get("/receiver/receiver-assigned-list");
    if (response) {
      setListOfReceiverAssigned(response.data.listOfReceivers);
    }
  };

  /**
   * Calls the API to get the list of receivers returned by issue.
   * @async
   * @function
   * @returns {Promise<void>} Returns a promise that resolves with no value when the list of receivers returned by issue is set.
   */
  const callApiReceierReturnedByIssue = async () => {
    const response = await devitrackApi.get(
      "/receiver/list-receiver-returned-issue"
    );
    if (response) {
      setListReceiverReturnedByIssue(response.data.record);
    }
  };

  /**

Runs on initial mount and when the dependencies change. It initializes an AbortController to abort a fetch
request when the component unmounts. Calls multiple API functions to set state data for the component.
@function
@returns {undefined}
*/
  useEffect(() => {
    const controller = new AbortController();
    callApi();
    callApiListOfReceiverAssigned();
    callApiReceierReturnedByIssue();
    getReceiverData();
    return () => {
      controller.abort();
    };
  }, [listOfReceiver.length, loading]);

  /**

Runs when dispatch changes. Calls the mergingData function and sets loading to true.
@function
@returns {undefined}
*/
  useEffect(() => {
    if (dispatch === true) {
      mergingData();
    }
    setLoading(true);
  }, [dispatch]);

  /**

Merges data from listOfReceiver and listOfReceiverAssigned and sets the result to userDataMerged.
@async
@function mergingData
*/
  const mergingData = async () => {
    let usersPerDevice = [];
    for (let node of listOfReceiver) {
      for (let data of listOfReceiverAssigned) {
        data.device.map((item, index) => {
          if (item.serialNumber === node.device) {
            usersPerDevice.push({
              ...node,
              user: data.user,
            });
          }
        });
      }
    }
    setUserDataMerged(usersPerDevice);
  };

  /**

Sets up an interval for calling setDispatch(!dispatch) every 3 seconds.
@function useInterval
@param {function} callback - The function to be called at each interval.
@param {number} delay - The delay between each interval in milliseconds.
*/
  useInterval(() => {
    setDispatch(!dispatch);
  }, 3_00);

  let totalDataMergedToExcel = userDataMerged.concat(
    listReceiverReturnedByIssue
  );

  /**

Retrieves the list of all receivers from the backend API
and sets the listOfReceiver state with the response.
@async
@function getReceiverData
@returns {Promise<void>}
*/
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
  let conditionReturned = null;
  let currentActivity = null;

  let filteredResult = [];

  /**

Filter the list of receivers based on the search term
@async
@function filter
@returns {Promise<Array>} An array of objects representing the filtered receivers
*/
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
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          <h2>Stock</h2>
          <p className="export-btn" onClick={() => setLoadingDownload(false)}>
            {" "}
            <CSVLink
              headers={headers}
              data={totalDataMergedToExcel}
              filename={fileName}
            >
              {loadingDownload ? (
                "Loading csv..."
              ) : (
                <p>
                  IMPORT DATA <i className="bi bi-plus-circle" />
                </p>
              )}{" "}
            </CSVLink>{" "}
          </p>
        </div>
        <div
          style={{ overflow: "auto" }}
          className="container-device-info-table"
        >
          <table className="table">
            <caption></caption>
            <thead
              style={{
                position: "sticky",
                top: "0",
                background: "white",
              }}
            >
              <tr>
                <th scope="col">
                  DEVICE S/N{" "}
                  {sortUp === true ? (
                    <i
                      onClick={() => {
                        setSortUp(!sortUp);
                        setSortActivity(null);
                      }}
                      className="bi bi-sort-down"
                    />
                  ) : (
                    <i
                      onClick={() => {
                        setSortUp(!sortUp);
                        setSortActivity(null);
                      }}
                      className="bi bi-sort-up"
                    />
                  )}
                </th>
                <th scope="col">ACTIVITY </th>
                <th scope="col">DETAIL</th>
              </tr>
            </thead>
            {searchTerm === "" &&
              sortUp === true &&
              listOfReceiver
                ?.sort((a, b) => a.device.localeCompare(b.device))
                .map((receiver, index) => {
                  let background;
                  if (index === 0) {
                    background = "#ffff";
                  }
                  if (index % 2 === 0) {
                    background = "#F1F6F9";
                  }

                  return (
                    <tbody key={receiver.id}>
                      <tr style={{ background: `${background}` }}>
                        <td>{receiver.device}</td>
                        <td>{receiver.activity}</td>
                        <td>
                          <button
                            className="btn btn-detail"
                            style={{ width: "100%" }}
                            onClick={() => {
                              setReceiverId(receiver.id);
                              setReceiverDetail(receiver.device);
                            }}
                          >
                            Detail <i className="bi bi-caret-right" />{" "}
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  );
                })}

            {searchTerm === "" &&
              sortUp === false &&
              listOfReceiver
                ?.sort((a, b) => b.device.localeCompare(a.device))
                .map((receiver, index) => {
                  let background;
                  if (index === 0) {
                    background = "#ffff";
                  }
                  if (index % 2 === 0) {
                    background = "#F1F6F9";
                  }

                  return (
                    <tbody key={receiver.id}>
                      <tr style={{ background: `${background}` }}>
                        <td>{receiver.device}</td>
                        <td>{receiver.activity}</td>
                        <td>
                          <button
                            className="btn btn-detail"
                            style={{ width: "100%" }}
                            onClick={() => {
                              setReceiverId(receiver.id);
                              setReceiverDetail(receiver.device);
                            }}
                          >
                            Detail <i className="bi bi-caret-right" />{" "}
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  );
                })}
            {searchTerm === "" &&
              sortUp === null &&
              sortActivity === true &&
              listOfReceiver
                ?.sort((a, b) => a.activity.localeCompare(b.activity))
                .map((receiver, index) => {
                  let background;
                  if (index === 0) {
                    background = "#ffff";
                  }
                  if (index % 2 === 0) {
                    background = "#F1F6F9";
                  }

                  return (
                    <tbody key={receiver.id}>
                      <tr style={{ background: `${background}` }}>
                        <td>{receiver.device}</td>
                        <td>{receiver.activity}</td>
                        <td>
                          <button
                            className="btn btn-detail"
                            style={{ width: "100%" }}
                            onClick={() => {
                              setReceiverId(receiver.id);
                              setReceiverDetail(receiver.device);
                            }}
                          >
                            Detail <i className="bi bi-caret-right" />{" "}
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  );
                })}

            {searchTerm !== "" &&
              filteredResult.map((receiver) => {
                return (
                  <tbody key={receiver.id}>
                    <tr>
                      <td>{receiver.device}</td>
                      <td>{receiver.activity}</td>
                      <td>
                        <button
                          className="btn btn-detail"
                          style={{ width: "100%" }}
                          onClick={() => {
                            setReceiverId(receiver.id);
                            setReceiverDetail(receiver.device);
                          }}
                        >
                          Detail <i className="bi bi-caret-right" />{" "}
                        </button>
                      </td>
                    </tr>
                  </tbody>
                );
              })}
          </table>
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
                currentActivity = receiver.activity;
                return (
                  <div>
                    <div className="table-detail" key={receiver.id}>
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
                  </div>
                );
              }
            })}
          </div>
          <DeviceUsersHistory
            currentActivity={currentActivity}
            receiverId={receiverId}
            receiverDetail={receiverDetail}
            listOfReceiver={listOfReceiver}
            conditionReturned={conditionReturned}
          />{" "}
        </div>
      </div>
    </div>
  );
};
