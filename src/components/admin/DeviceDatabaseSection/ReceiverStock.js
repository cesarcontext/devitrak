import React, { useEffect, useState } from "react";
import { devitrackApi } from "../../../apis/devitrackApi";
import { Pagination } from "../ui/Pagination";

export const ReceiverStock = () => {
  const [listOfReceiver, setListOfReceiver] = useState([]);
  const [loading, setLoading] = useState(false);
  const [receiverId, setReceiverId] = useState(null);
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
      console.log(
        "🚀 ~ file: ReceiverStock.js ~ line 10 ~ callApi ~ listOfReceiver",
        listOfReceiver
      );
      setLoading(true);
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    callApi();
    return () => {
      controller.abort();
    };
  }, [listOfReceiver.length, loading]);

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
                  console.log(
                    "🚀 ~ file: ReceiverStock.js ~ line 56 ~ ?listOfReceiver?.map ~ receiver",
                    receiver
                  );
                  return (
                    <tbody>
                      <tr key={receiver.id}>
                        <th scope="row">{index + 1}</th>
                        <td>{receiver.device}</td>
                        <td>{receiver.activity}</td>
                        <td>
                          <button onClick={() => setReceiverId(receiver.id)}>
                            Detail
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  );
                })
              : ""}
          </table>
          <div>
          <Pagination
            childrenRenderedPerPage={receiverRenderedPerPage}
            totalChildren={listOfReceiver.length}
            paginate={paginate}
          />
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
                      <strong>Serial #: </strong> {receiver.device}
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
                    <div>
                      <strong>User: </strong>
                      {receiver.user}
                    </div>
                  </div>
                );
              }
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
