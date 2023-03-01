<<<<<<< HEAD
import React, { useEffect, useState } from "react";
import { CSVLink } from "react-csv";
import { useInterval } from "interval-hooks";
import ReactPaginate from "react-paginate";
import { devitrackApi } from "../../apis/devitrackApi";
import { DeviceUsersHistory } from "../../components/admin/DeviceDatabaseSection/DeviceUsersHistory";
import { Navbar } from "../../components/admin/ui/Navbar";
import "../../style/component/admin/DeviceDatabase.css";

export const DeviceInUse = ({ searchTerm }) => {
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
  const [currentItemsRendered, setCurrentItemsRendered] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 6;

  const callApi = async () => {
    const response = await devitrackApi.get("/receiver/receiver-pool-list");
    if (response) {
      setListOfReceiver(response.data.receiversInventory);
    }
  };
  const callApiListOfReceiverAssigned = async () => {
    const response = await devitrackApi.get("/receiver/receiver-assigned-list");
    if (response) {
      setListOfReceiverAssigned(response.data.listOfReceivers);
    }
  };
  const callApiReceierReturnedByIssue = async () => {
    const response = await devitrackApi.get(
      "/receiver/list-receiver-returned-issue"
    );
    if (response) {
      setListReceiverReturnedByIssue(response.data.record);
    }
  };
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

  useEffect(() => {
    if (dispatch === true) {
      mergingData();
    }
    setLoading(true);
  }, [dispatch]);

  const mergingData = async () => {
    let usersPerDevice = [];
    for (let node of listOfReceiver) {
      for (let data of listOfReceiverAssigned) {
        return data.device.map((item, index) => {
          if (item.serialNumber === node.device) {
            return usersPerDevice.push({
              ...node,
              user: data.user,
              phone: data.phoneNumber,
            });
          }
        });
      }
    }
    setUserDataMerged(usersPerDevice);
  };
  useInterval(() => {
    setDispatch(!dispatch);
  }, 3_00);

  let totalDataMergedToExcel = userDataMerged.concat(
    listReceiverReturnedByIssue
  );

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
    { label: "User", key: "user" },
  ];

  const fileName = "receiver-inventory";
  let conditionReturned = null;

  const filter = async () => {
    let filteredResult = [];
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
    return filteredResult
  };
  filter();

  return (
    <>
      <Navbar />
      <div className="container-stock-device">
        <div className="container-stock-device-list">
          <div>
            <h2>Device In-use</h2>
          </div>
          <div className="container-device-info-table">
            <table className="table">
              <caption></caption>
              <thead>
                <tr>
                  <th scope="col">Device S/N</th>
                  <th scope="col">Activity</th>
                  <th scope="col">details</th>
                </tr>
              </thead>
              {currentItemsRendered?.map((receiver, index) => {
                if (receiver.activity === "In-use") {
                  // let background;
                  // if (index === 0) {
                  //   background = "#ffff";
                  // }
                  // if (index % 2 === 0) {
                  //   background = "#F1F6F9";
                  // }

                  return (
                    <tbody key={receiver.id}>
                      <tr
                      //  style={{ background: `${background}` }}
                      >
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
                            Details <i className="bi bi-caret-right" />{" "}
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  );
                }
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
              <p variant="contained" onClick={() => setLoadingDownload(false)}>
                <CSVLink
                  headers={headers}
                  data={totalDataMergedToExcel}
                  filename={fileName}
                  className="export-btn"

                  // style={{ textDecoration: "none", color: "#fff" }}
                >
                  {loadingDownload ? "Loading csv..." : "EXPORT DATA"}
                </CSVLink>
              </p>
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
      </div>
    </>
  );
};
=======
// import React, { useEffect, useState } from "react";
// import { CSVLink } from "react-csv";
// import { useInterval } from "interval-hooks";
// import ReactPaginate from "react-paginate";
// import { devitrackApi } from "../../apis/devitrackApi";
// import { DeviceUsersHistory } from "../../components/admin/DeviceDatabaseSection/DeviceUsersHistory";
// import { Navbar } from "../../components/admin/ui/Navbar";
// import "../../style/component/admin/DeviceDatabase.css";

// export const DeviceInUse = ({ searchTerm }) => {
//   const [dispatch, setDispatch] = useState(false);
//   const [userDataMerged, setUserDataMerged] = useState([]);
//   const [listOfReceiver, setListOfReceiver] = useState([]);
//   const [listOfReceiverAssigned, setListOfReceiverAssigned] = useState([]);
//   const [listReceiverReturnedByIssue, setListReceiverReturnedByIssue] =
//     useState([]);
//   const [loading, setLoading] = useState(false);
//   const [loadingDownload, setLoadingDownload] = useState(false);
//   const [receiverId, setReceiverId] = useState(null);
//   const [receiverDetail, setReceiverDetail] = useState("");
//   const [currentItemsRendered, setCurrentItemsRendered] = useState([]);
//   const [pageCount, setPageCount] = useState(0);
//   const [itemOffset, setItemOffset] = useState(0);
//   const itemsPerPage = 6;

//   const callApi = async () => {
//     const response = await devitrackApi.get("/receiver/receiver-pool-list");
//     if (response) {
//       setListOfReceiver(response.data.receiversInventory);
//     }
//   };
//   const callApiListOfReceiverAssigned = async () => {
//     const response = await devitrackApi.get("/receiver/receiver-assigned-list");
//     if (response) {
//       setListOfReceiverAssigned(response.data.listOfReceivers);
//     }
//   };
//   const callApiReceierReturnedByIssue = async () => {
//     const response = await devitrackApi.get(
//       "/receiver/list-receiver-returned-issue"
//     );
//     if (response) {
//       setListReceiverReturnedByIssue(response.data.record);
//     }
//   };
//   useEffect(() => {
//     const controller = new AbortController();
//     callApi();
//     callApiListOfReceiverAssigned();
//     callApiReceierReturnedByIssue();
//     getReceiverData();
//     return () => {
//       controller.abort();
//     };
//   }, [listOfReceiver.length, loading]);

//   useEffect(() => {
//     if (dispatch === true) {
//       mergingData();
//     }
//     setLoading(true);
//   }, [dispatch]);

//   const mergingData = async () => {
//     let usersPerDevice = [];
//     for (let node of listOfReceiver) {
//       for (let data of listOfReceiverAssigned) {
//         return data.device.map((item, index) => {
//           if (item.serialNumber === node.device) {
//             return usersPerDevice.push({
//               ...node,
//               user: data.user,
//               phone: data.phoneNumber,
//             });
//           }
//         });
//       }
//     }
//     setUserDataMerged(usersPerDevice);
//   };
//   useInterval(() => {
//     setDispatch(!dispatch);
//   }, 3_00);

//   let totalDataMergedToExcel = userDataMerged.concat(
//     listReceiverReturnedByIssue
//   );

//   const handlePageClick = (event) => {
//     const newOffset = (event.selected * itemsPerPage) % listOfReceiver.length;
//     setItemOffset(newOffset);
//   };

//   useInterval(async () => {
//     const endOffset = itemOffset + itemsPerPage;
//     setCurrentItemsRendered(listOfReceiver.slice(itemOffset, endOffset));
//     setPageCount(Math.ceil(listOfReceiver.length / itemsPerPage));
//   }, 2_00);

//   const getReceiverData = async () => {
//     setLoadingDownload(true);
//     try {
//       const response = await devitrackApi.get("/receiver/receiver-pool-list");
//       if (response) {
//         setListOfReceiver(response.data.receiversInventory);
//         setLoadingDownload(false);
//       }
//     } catch (error) {
//       console.log("Error: ", error);
//       setLoading(false);
//     }
//   };

//   const headers = [
//     { label: "Device", key: "device" },
//     { label: "status", key: "status" },
//     { label: "Activity", key: "activity" },
//     { label: "Comment", key: "comment" },
//     { label: "User", key: "user" },
//   ];

//   const fileName = "receiver-inventory";
//   let conditionReturned = null;

//   const filter = async () => {
//     let filteredResult = [];
//     for (let i = 0; i < listOfReceiver.length; i++) {
//       if (searchTerm === listOfReceiver[i].device) {
//         return (filteredResult = [
//           {
//             ...listOfReceiver[i],
//             index: i,
//           },
//         ]);
//       }
//     }
//     return filteredResult
//   };
//   filter();

//   return (
//     <>
//       <Navbar />
//       <div className="container-stock-device">
//         <div className="container-stock-device-list">
//           <div>
//             <h2>Device In-use</h2>
//           </div>
//           <div className="container-device-info-table">
//             <table className="table">
//               <caption></caption>
//               <thead>
//                 <tr>
//                   <th scope="col">Device S/N</th>
//                   <th scope="col">Activity</th>
//                   <th scope="col">details</th>
//                 </tr>
//               </thead>
//               {currentItemsRendered?.map((receiver, index) => {
//                 if (receiver.activity === "In-use") {
//                   // let background;
//                   // if (index === 0) {
//                   //   background = "#ffff";
//                   // }
//                   // if (index % 2 === 0) {
//                   //   background = "#F1F6F9";
//                   // }

//                   return (
//                     <tbody key={receiver.id}>
//                       <tr
//                       //  style={{ background: `${background}` }}
//                       >
//                         <td>{receiver.device}</td>
//                         <td>{receiver.activity}</td>
//                         <td>
//                           <button
//                             className="btn btn-detail"
//                             style={{ width: "100%" }}
//                             onClick={() => {
//                               setReceiverId(receiver.id);
//                               setReceiverDetail(receiver.device);
//                             }}
//                           >
//                             Details <i className="bi bi-caret-right" />{" "}
//                           </button>
//                         </td>
//                       </tr>
//                     </tbody>
//                   );
//                 }
//               })}
//             </table>
//             <div className="container-section-pagination-button">
//               <ReactPaginate
//                 breakLabel="..."
//                 nextLabel="next >"
//                 onPageChange={handlePageClick}
//                 pageRangeDisplayed={2}
//                 pageCount={pageCount}
//                 previousLabel="< prev"
//                 renderOnZeroPageCount={null}
//                 containerClassName="pagination"
//                 pageLinkClassName="page-num"
//                 previousLinkClassName="page-num"
//                 nextLinkClassName="page-num"
//                 activeLinkClassName="tab-active"
//               />
//               <p variant="contained" onClick={() => setLoadingDownload(false)}>
//                 <CSVLink
//                   headers={headers}
//                   data={totalDataMergedToExcel}
//                   filename={fileName}
//                   className="export-btn"

//                   // style={{ textDecoration: "none", color: "#fff" }}
//                 >
//                   {loadingDownload ? "Loading csv..." : "EXPORT DATA"}
//                 </CSVLink>
//               </p>
//             </div>
//           </div>
//         </div>

//         <div className="container-stock-device-details">
//           <div>
//             <h2>Details</h2>
//           </div>
//           <div className="detail-history-container">
//             {" "}
//             <div className="device-detail-section">
//               {listOfReceiver?.map((receiver, index) => {
//                 if (receiver.id === receiverId) {
//                   if (
//                     receiver.activity === "Stored" &&
//                     receiver.status !== "Operational"
//                   ) {
//                     conditionReturned = receiver.device;
//                   }
//                   return (
//                     <div key={receiver.id}>
//                       <div>
//                         <strong>Device: </strong>
//                         {receiver.device}
//                       </div>
//                       <div>
//                         <strong>Activity: </strong>
//                         {receiver.activity}
//                       </div>
//                       <div>
//                         <strong>Status: </strong>
//                         {receiver.status}
//                       </div>
//                       <div>
//                         <strong>Comment: </strong>
//                         {receiver.comment}
//                       </div>
//                     </div>
//                   );
//                 }
//               })}
//             </div>
//             <DeviceUsersHistory
//               receiverId={receiverId}
//               receiverDetail={receiverDetail}
//               listOfReceiver={listOfReceiver}
//               conditionReturned={conditionReturned}
//             />{" "}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };
>>>>>>> origin
