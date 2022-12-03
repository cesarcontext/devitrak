import React, { useEffect } from "react";
import Modal from "react-modal";
import Swal from "sweetalert2";
import { devitrackApi } from "../../../apis/devitrackApi";
import { useAdminStore } from "../../../hooks/useAdminStore";
import { useForm } from "../../../hooks/useForm";
const customStyles = {
  content: {
    width: "20%",
    height: "26%",
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
  otherComment: "",
};
// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)

export const ModalReplaceReceiver = ({
  replaceStatus,
  setReplaceStatus,
  paymentIntentReceiversAssigned,
  paymentIntentDetailSelected,
  receiverObjectToReplace,
  replaceReceiverIndex,
  setLoading,
  receiverIdSavedInPool,
  listOfDeviceInPool,
}) => {
  const { errorMessage } = useAdminStore();
  const {
    serialNumber,
    reason,
    otherComment,
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

  const returnExistentReceiverInPool = async () => {
    // let receiverInPoolId;
    // await listOfDeviceInPool?.map((item) => {
    //   if (item.device === receiverObjectToReplace.serialNumbe) {
    //     return receiverInPoolId = item.id;
    //   }
    // });
    try {
      const response = await devitrackApi.put(
        `/receiver/receivers-pool-update/${receiverIdSavedInPool}`,
        {
          device: receiverObjectToReplace.serialNumber,
          status: reason,
          activity: "Stored",
          comment: otherComment,
        }
      );
      if( response ) {
        await devitrackApi.post(
          `/receiver/receiver-returned-issue`,
          {
            device: receiverObjectToReplace.serialNumber,
            status: reason,
            activity: "Stored",
            comment: otherComment,
            user: paymentIntentDetailSelected.user.email
          }
        );
      }
    } catch (error) {
      console.log(
        "🚀 ~ file: ModalReplaceReceiver.js ~ line 59 ~ changeStatusReceiverReplaced ~ error",
        error
      );
      alert(error);
    }
  };

  const returnExistentReceiverInTransaction = async () => {
    try {
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
      const id = paymentIntentReceiversAssigned.at(-1).id;
      const response = await devitrackApi.put(
        `/receiver/receiver-update/${id}`,
        {
          id: id,
          device: replacementList,
        }
      );
      if (response) {
        devitrackApi.post("/receiver/receivers-pool", {
          device: replaceReceiverFormFields.serialNumber,
          status: "Operational",
          activity: "In-use",
          comment: "No comment",
          user: paymentIntentDetailSelected.user.email,
        });
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
  const replaceDevice = async (event) => {
    event.preventDefault();
    await returnExistentReceiverInPool();
    await returnExistentReceiverInTransaction();
  };

  return (
    <div style={{margin:"auto"}}>
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
                <option defaultValue></option>
                <option value="Missing">Missing</option>
                <option value="Network">Network</option>
                <option value="Hardware">Hardware</option>
                <option value="Damage">Damage</option>
                <option value="Other">Other</option>
              </select>
              {reason === "Other" ? (
                <div>
                  <textarea
                    type="text"
                    className="form-control"
                    placeholder="Add comment"
                    name="otherComment"
                    value={otherComment}
                    onChange={onReplaceInputChange}
                  />
                </div>
              ) : (
                ""
              )}
            </div>
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap:"3%"
              }}
            >
              <button className="btn btn-delete" style={{ width:"45%"}} onClick={() => setReplaceStatus(false)}>Cancel</button>
              <button className="btn btn-create" style={{ width:"45%"}} type="submit">Save</button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
};
