import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { devitrackApi } from "../../../apis/devitrackApi";
import { useAdminStore } from "../../../hooks/useAdminStore";
import { swalErrorMessage } from "../../../helper/swalFireMessage"

const customStyles = {
  content: {
    width: "30%",
    height: "15%",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)

export const ModalCreateTransactionForNoRegularUser = ({
  createTransactionForNoRegularUser,
  setCreateTransactionForNoRegularUser,
  sendObjectIdUser,
}) => {
  const { errorMessage } = useAdminStore();
  const [receiversSelection, setReceiversSelection] = useState(0);
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

  const onSubmitRegister = async (event) => {
    event.preventDefault();
    const max = 918273645;
    try {
      const { data } = await devitrackApi.post(
        "/stripe/stripe-transaction-no-regular-user",
        {
          paymentIntent:
            Math.floor(Math.random() * max) +
            sendObjectIdUser +
            receiversSelection,
          clientSecret:
            receiversSelection +
            sendObjectIdUser +
            Math.floor(Math.random() * max),
          device: receiversSelection,
          user: sendObjectIdUser,
        }
      );
      if (data) closeModal();
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
                alignItems: "center",
                gap: "3%",
                width:"60%"
              }}
            >
              <button className="btn btn-delete" style={{ width: "45%"}} onClick={closeModal}>Cancel</button>
              <button className="btn btn-create" style={{ width: "45%"}} type="submit">Register</button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
};
