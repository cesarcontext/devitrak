import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { devitrackApi } from "../../../apis/devitrackApi";
import { useAdminStore } from "../../../hooks/useAdminStore";
import { swalErrorMessage } from "../../../helper/swalFireMessage";
import { nanoid } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
const customStyles = {
  content: {
    width: "50vw",
    minHeight: "20vh",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};
export const ModalCreateTransactionForNoRegularUser = ({
  createTransactionForNoRegularUser,
  setCreateTransactionForNoRegularUser,
  sendObjectIdUser,
}) => {
  const { errorMessage } = useAdminStore();
  const [receiversSelection, setReceiversSelection] = useState(0);
  const { user } = useSelector((state) => state.admin);
  if (createTransactionForNoRegularUser !== false) {
    Modal.setAppElement("#root");
  }
  function closeModal() {
    setCreateTransactionForNoRegularUser(false);
  }

  useEffect(() => {
    if (errorMessage !== undefined) {
      swalErrorMessage(errorMessage);
    }
  }, [errorMessage]);

  const stampTime = new Date();

  const createTransacitonAudit = useCallback(async (id) => {
    await devitrackApi.post("/transactionAuditLog/create-audit", {
      transaction: id,
      user: user.email,
      actionTaken: `Transaction with not payment required was created`,
      time: stampTime,
    });
  }, []);

  const onSubmitRegister = async (event) => {
    event.preventDefault();
    const id = nanoid(12);
    const max = 918273645;
    const transactionGenerated = "pi_"+ id
    try {
      const { data } = await devitrackApi.post(
        "/stripe/stripe-transaction-no-regular-user",
        {
          paymentIntent: transactionGenerated,
          clientSecret:
            receiversSelection +
            sendObjectIdUser +
            Math.floor(Math.random() * max),
          device: receiversSelection,
          user: sendObjectIdUser,
        }
      );
      if (data) {
        createTransacitonAudit(transactionGenerated);
        closeModal();
        setReceiversSelection(0);
        window.location.reload();
      }
    } catch (error) {
      console.log(
        "🚀 ~ file: ModalCreateUser.js ~ line 136 ~ onSubmitRegister ~ error",
        error
      );
      alert(error);
    }
  };
  return (
    <div>
      <Modal
        isOpen={createTransactionForNoRegularUser}
        onRequestClose={closeModal}
        style={customStyles}
        shouldCloseOnOverlayClick={false}
      >
        <div>
          <h2>Please select number of receivers: </h2>
          <form
            style={{
              margin: "auto",
              display: "flex",
              alignItems: "center",
            }}
            onSubmit={onSubmitRegister}
          >
            <div className="form-group mb-2">
              <input
                type="number"
                name="receiversSelection"
                value={receiversSelection}
                onChange={(event) => setReceiversSelection(event.target.value)}
              />
            </div>
            <div
              className="button-container"
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "space-around",
                alignItems: "center",
                width: "13vw",
              }}
            >
              <button
                className="btn btn-delete"
                style={{ width: "45%" }}
                onClick={closeModal}
              >
                Cancel
              </button>
              {receiversSelection > 0 && (
                <button
                  className="btn btn-create"
                  style={{ width: "45%" }}
                  type="submit"
                >
                  Register
                </button>
              )}
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
};
