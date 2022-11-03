import React, { useEffect } from "react";
import Modal from "react-modal";
import Swal from "sweetalert2";
import { devitrackApi } from "../../../apis/devitrackApi";
import { useAdminStore } from "../../../hooks/useAdminStore";
import { useForm } from "../../../hooks/useForm";
const customStyles = {
  content: {
    width: "20%",
    height: "40%",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

let replaceReceiverFormFields = {
  serialNumber: "",
  reason: "",
};
// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)

export const ModalReplaceReceiver = ({
  replaceStatus,
  setReplaceStatus,
  paymentIntentReceiversAssigned,
  receiverObjectToReplace,
  replaceReceiverIndex,
  setLoading,
}) => {
  const { errorMessage } = useAdminStore();
  const {
    serialNumber,
    reason,
    onInputCHange: onReplaceInputChange,
  } = useForm(replaceReceiverFormFields);

  if (replaceStatus !== false) {
    Modal.setAppElement("#root");
  }
  function closeModal() {
    setReplaceStatus(false);
  }

  useEffect(() => {
    if (errorMessage !== undefined) {
      Swal.fire("Incorrect credentials", errorMessage, "error");
    }
  }, [errorMessage]);

  const replaceDevice = async (event) => {
    event.preventDefault();
    let receiversAssignedListCopy;
    paymentIntentReceiversAssigned?.map((item) => {
      return (receiversAssignedListCopy = item.device);
    });
    const element_deleted = 1;
    replaceReceiverFormFields = {
      serialNumber: serialNumber,
      status: true,
    };
    const replacementList = [...receiversAssignedListCopy];
    replacementList.splice(
      replaceReceiverIndex,
      element_deleted,
      replaceReceiverFormFields
    );
    try {
      const id = paymentIntentReceiversAssigned.at(-1).id;
      const response = await devitrackApi.put(
        `/receiver/receiver-update/${id}`,
        {
          id: id,
          device: replacementList,
        }
      );
      if (response) {
        setLoading(false);
        setReplaceStatus(false);
      }
      alert("New receiver assigned");
    } catch (error) {
      console.log(
        "🚀 ~ file: ReceiversDetailsAssignation.js ~ line 129 ~ handleAssignDevice ~ error",
        error
      );
      alert("Something went wrong, please try later");
    }
  };

  return (
    <div>
      <Modal
        isOpen={replaceStatus}
        onRequestClose={closeModal}
        style={customStyles}
        shouldCloseOnOverlayClick={false}
      >
        <div>
          <h2>Replace Device</h2>

          <form onSubmit={replaceDevice}>
            <div className="form-group mb-2">
              <span>
                Receiver to replace:{" "}
                <strong>{receiverObjectToReplace.serialNumber}</strong>
              </span>
            </div>
            <div className="form-group mb-2">
              <input
                type="text"
                className="form-control"
                placeholder="New serial number"
                name="serialNumber"
                value={serialNumber}
                onChange={onReplaceInputChange}
              />
            </div>
            <div className="form-group mb-2">
              <select
                name="reason"
                value={reason}
                onChange={onReplaceInputChange}
              >
                <option>Reason of return</option>
                <option>
                  <p>Operational</p>
                </option>
                <option>
                  <p>Missing</p>
                </option>
                <option>
                  <p>Network</p>
                </option>
                <option>
                  <p>Hardware</p>
                </option>
                <option>
                  <p>Damage</p>
                </option>
                <option>
                  <p></p>
                </option>
              </select>
              {/* <textarea
                type="text"
                className="form-control"
                placeholder="Reason"
              /> */}
            </div>
            <button onClick={() => setReplaceStatus(false)}>Cancel</button>
            <button type="submit">Save</button>
          </form>
        </div>
      </Modal>
    </div>
  );
};
