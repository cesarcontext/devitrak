import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import Swal from "sweetalert2";
import { devitrackApi } from "../../../apis/devitrackApi";
import { useAdminStore } from "../../../hooks/useAdminStore";

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
}) => {
  const { errorMessage } = useAdminStore();
  const [displayed, setDisplayed] = useState(true);
  const [serialNumber, setSerialNumber] = useState("");
  const [reason, setReason] = useState("");
  const [otherComment, setOtherComment] = useState("");
  const [customStyles, setCustomStyles] = useState({
    content: {
      width: "",
      height: "",
      top: "",
      left: "",
      right: "",
      bottom: "",
      marginRight: "",
      transform: "",
    },
  });
  const [screenSize, setScreenSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  if (replaceStatus !== false) {
    Modal.setAppElement("#root");
  }
  function closeModal() {
    setReplaceStatus(false);
  }

  const buttonBehaviorChange = () => {
    if (reason.length > 0 && serialNumber.length > 0) {
      return setDisplayed(false);
    }
  };

  const handleResize = () => {
    setScreenSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };

  const customeStyleBaseOnScreenSize = () => {
    if (screenSize.width < 1301) {
      return setCustomStyles({
        content: {
          width: "50vw",
          height: "25vh",
          top: "50%",
          left: "50%",
          right: "auto",
          bottom: "auto",
          marginRight: "-50%",
          transform: "translate(-50%, -50%)",
        },
      });
    } else {
      return setCustomStyles({
        content: {
          width: "30%",
          height: "25vh",
          top: "50%",
          left: "50%",
          right: "auto",
          bottom: "auto",
          marginRight: "-50%",
          transform: "translate(-50%, -50%)",
        },
      });
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    buttonBehaviorChange();
    customeStyleBaseOnScreenSize();
    return () => {
      controller.abort();
    };
  }, [reason]);

  useEffect(() => {
    handleResize();
    if (errorMessage !== undefined) {
      Swal.fire("Incorrect credentials", errorMessage, "error");
    }
  }, [errorMessage]);

  const returnExistentReceiverInPool = async () => {
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
      if (response) {
        await devitrackApi.post(`/receiver/receiver-returned-issue`, {
          device: receiverObjectToReplace.serialNumber,
          status: reason,
          activity: "Stored",
          comment: otherComment,
          user: paymentIntentDetailSelected.user.email,
        });
      }
    } catch (error) {
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
      let replaceReceiverFormFields = {
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
          device: serialNumber,
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
      alert("Something went wrong, please try later");
    }
  };
  const replaceDevice = async (event) => {
    event.preventDefault();
    await returnExistentReceiverInPool();
    await returnExistentReceiverInTransaction();
    setSerialNumber("");
    setReason("");
    setOtherComment("");
    setDisplayed(true);
  };

  return (
    <div style={{ margin: "auto" }}>
      <Modal
        isOpen={replaceStatus}
        onRequestClose={closeModal}
        style={customeStyles}
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
                onChange={(event) => setSerialNumber(event.target.value)}
              />
            </div>
            <div className="form-group mb-2">
              <select
                name="reason"
                onChange={(event) => setReason(event.target.value)}
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
                    onChange={(event) => setOtherComment(event.target.value)}
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
                gap: "3%",
              }}
            >
              <button
                disabled={displayed}
                className="btn btn-delete"
                style={{ width: "45%" }}
                onClick={() => setReplaceStatus(false)}
              >
                Cancel
              </button>
              <button
                disabled={displayed}
                className="btn btn-create"
                style={{ width: "45%" }}
                type="submit"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
};
