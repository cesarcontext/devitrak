import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { devitrackApi } from "../../../apis/devitrackApi";

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)

const customStyles = {
  content: {
    width: "55vw",
    minHeight: "50vh",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};
export const ModalHistoryTransaction = ({
  displayHistoryTransaction,
  setDisplayHistoryTransaction,
  transactionInfo,
}) => {
  const [transactionHistoryList, setTransactionHistoryList] = useState([]);
  if (displayHistoryTransaction !== false) {
    Modal.setAppElement("#root");
  }
  useEffect(() => {
    const callApiHistoryTransaction = async () => {
      const response = await devitrackApi.get("/transactionAuditLog/audit-log");
      if (response) {
        setTransactionHistoryList(response.data.transactionAuditLog);
      }
    };
    return () => {
      callApiHistoryTransaction();
    };
  }, [transactionInfo.paymentIntent]);

  const closeModal = () => {
    setDisplayHistoryTransaction(false);
  };
  return (
    <div>
      <Modal
        isOpen={displayHistoryTransaction}
        onRequestClose={closeModal}
        style={customStyles}
        shouldCloseOnOverlayClick={false}
      >
        <div className="container-modal-form">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
              borderBottom: "solid 1px",
            }}
          >
            <h3>Transaction Log</h3>
            <button
              onClick={closeModal}
              className="btn btn-delete"
              style={{
                width: "fit-content",
              }}
            >
              BACK
            </button>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
            }}
          >
            <table>
              <thead>
                <tr>
                  <th>ACTION</th>
                  <th>CREATED BY</th>
                  <th>TIME</th>
                </tr>
              </thead>
              <tbody>
                {" "}
                {transactionHistoryList?.map((item) => {
                  if (item.transaction === transactionInfo.paymentIntent) {
                    return (
                      <>
                        <tr>
                          <td>{item.actionTaken}</td>
                          <td><strong>{item.user}</strong></td>
                          <td>{item.time}</td>
                        </tr>
                      </>
                    );
                  }
                })}
              </tbody>
            </table>
          </div>
        </div>
      </Modal>
    </div>
  );
};
