import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { DetailSelectedUserFOrAssignReceiver } from "./DetailSelectedUserFOrAssignReceiver";
import { devitrackApi, devitrackApiAdmin } from "../../../apis/devitrackApi";
import { ModalReplaceReceiver } from "../ui/ModalReplaceReceiver";
import { Navbar } from "../ui/Navbar";
import { PaymentIntentTemplate } from "./PaymentIntentTemplate";
import { useAdminStore } from "../../../hooks/useAdminStore";
import {
  rightDoneMessage,
  swalErrorMessage,
} from "../../../helper/swalFireMessage";
import { onCheckReceiverPaymentIntent } from "../../../store/slices/stripeSlice";
import "../../../style/component/admin/receiversDetailsAssignation.css";

export const ReceiversDetailsAssignation = () => {
  const { paymentIntentDetailSelected, paymentIntentReceiversAssigned } =
    useSelector((state) => state.stripe);
  const dispatch = useDispatch();
  const { checkReceiversAssignedToPaymentIntent } = useAdminStore();
  const [receiversAssigned, setReceiversAssigned] = useState([]);
  const [fetchedData, setFetchedData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [receiverNumberAssgined, setReceiverNumberAssgined] = useState("");
  const [replaceStatus, setReplaceStatus] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [replaceReceiverIndex, setReplaceReceiverIndex] = useState();
  const [receiverObjectToReplace, setReceiverObjectToReplace] = useState(null);
  const [listOfDeviceInPool, setListOfDeviceInPool] = useState([]);
  const [receiverIdSavedInPool, setReceiverIdSavedInPool] = useState("");
  const [saveButtonDisplay, setSaveButtonDisplay] = useState(false);
  const paymentIntentToCheck = paymentIntentDetailSelected.paymentIntent;
  const receiverObject = {
    serialNumber: receiverNumberAssgined,
    status: true,
  };
  const inputReference = useRef(receiverNumberAssgined);

  useEffect(() => {
    const controller = new AbortController();
    checkReceiversAssignedToPaymentIntent(paymentIntentToCheck);
    if (paymentIntentReceiversAssigned !== []) {
      setLoading(false);
    }
    return () => {
      controller.abort();
    };
  }, [
    paymentIntentDetailSelected.paymentIntent,
    loading,
    fetchedData,
    replaceStatus,
  ]);

  useEffect(() => {
    const controller = new AbortController();
    devitrackApi
      .get("/receiver/receiver-pool-list")
      .then((data) => setListOfDeviceInPool(data.data.receiversInventory));
    return () => {
      controller.abort();
    };
  }, [paymentIntentToCheck, loading, fetchedData, replaceStatus]);

  const addReceiver = async () => {
    if (receiverObject.serialNumber === "") {
      swalErrorMessage(
        `An empty serial number was added. Please delete it before to continue.`
      );
    }
    const findDuplicate = {};
    const replacementList = [...receiversAssigned, receiverObject];
    for (let i = 0; i < replacementList.length; i++) {
      if (!findDuplicate[replacementList[i].serialNumber]) {
        findDuplicate[replacementList[i].serialNumber] =
          replacementList[i].serialNumber;
      } else {
        swalErrorMessage(
          `Serial # ${replacementList[i].serialNumber} is duplicated. Please delete it before to continue.`
        );
      }
    }
    if (replacementList.length <= paymentIntentDetailSelected.device) {
      setReceiversAssigned(replacementList);
      setReceiverNumberAssgined("");
      inputReference.current.focus();
    }
  };

  let receiversAssignedListCopy;
  const removeReceiverBeforeSavedData = async (index) => {
    const result = receiversAssigned.splice(index, 1);
    if (result.length === 1) {
      return setReceiverNumberAssgined([]);
    }
    setReceiversAssigned(result);
  };
  const objDeviceContainer = new Map();
  for (let i = 0; i < listOfDeviceInPool.length; i++) {
    objDeviceContainer.set(
      listOfDeviceInPool[i].device,
      listOfDeviceInPool[i].id
    );
  }
  const handleDataSubmitted = async () => {
    try {
      const response = await devitrackApiAdmin.post("/receiver-assignation", {
        paymentIntent: paymentIntentDetailSelected.paymentIntent,
        device: receiversAssigned,
        user: paymentIntentDetailSelected.user.email,
        active: true,
      });
      if (response) {
        receiversAssigned?.map((receiver) => {
          if (objDeviceContainer.has(receiver.serialNumber)) {
            devitrackApi.put(
              `/receiver/receivers-pool-update/${objDeviceContainer.get(
                receiver.serialNumber
              )}`,
              {
                status: "Operational",
                activity: "In-use",
                comment: "No comment",
              }
            );
          } else {
            devitrackApi.post("/receiver/receivers-pool", {
              device: receiver.serialNumber,
              status: "Operational",
              activity: "In-use",
              comment: "No comment",
            });
          }
        });
        setFetchedData(response.data);
        dispatch(onCheckReceiverPaymentIntent(fetchedData));
        setLoading(!loading);
        setSaveButtonDisplay(true);
      }
      rightDoneMessage(
        `Receivers were assigned to payment intent successfully`
      );
    } catch (error) {
      console.log(error);
      swalErrorMessage(error);
    }
  };
  const handleReturnDevice = async (receiver, index) => {
    let receiverInPoolId;
    listOfDeviceInPool?.map((item) => {
      if (item.device === receiver.serialNumber) {
        return (receiverInPoolId = item.id);
      }
    });
    paymentIntentReceiversAssigned?.map((item) => {
      return (receiversAssignedListCopy = item.device);
    });
    const element_deleted = 1;
    const objectToReturn = {
      serialNumber: receiver.serialNumber,
      status: false,
    };
    const replacementList = [...receiversAssignedListCopy];
    replacementList.splice(index, element_deleted, objectToReturn);
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
        devitrackApi.put(
          `/receiver/receivers-pool-update/${receiverInPoolId}`,
          {
            device: objectToReturn.serialNumber,
            status: "Operational",
            activity: "Stored",
            comment: "No comment",
          }
        );
        setLoading(true);
        rightDoneMessage("Receiver returned");
      }
    } catch (error) {
      swalErrorMessage(error);
    }
  };
  const handleAssignDevice = async (receiver, index) => {
    let receiverInPoolId;
    listOfDeviceInPool?.map((item) => {
      if (item.device === receiver.serialNumber) {
        return (receiverInPoolId = item.id);
      }
    });
    paymentIntentReceiversAssigned?.map((item) => {
      return (receiversAssignedListCopy = item.device);
    });
    const element_deleted = 1;
    const objectToReturn = {
      serialNumber: receiver.serialNumber,
      status: true,
    };
    const replacementList = [...receiversAssignedListCopy];
    replacementList.splice(index, element_deleted, objectToReturn);
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
        devitrackApi.put(
          `/receiver/receivers-pool-update/${receiverInPoolId}`,
          {
            device: objectToReturn.serialNumber,
            status: "Operational",
            activity: "In-use",
            comment: "No comment",
          }
        );
        setLoading(true);
        rightDoneMessage("Receiver assigned");
      }
    } catch (error) {
      swalErrorMessage(error);
    }
  };

  const returnAllReceiversAtOnce = async () => {
    paymentIntentReceiversAssigned?.map((item) => {
      return (receiversAssignedListCopy = item.device);
    });
    let replacementList = [];
    receiversAssignedListCopy.map((item) => {
      replacementList.push({
        ...item,
        status: false,
      });
    });
    try {
      const id = paymentIntentReceiversAssigned.at(-1).id;
      Swal.fire({
        title: "Are you sure?",
        text: "You will return all receivers at once in system",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, return them!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const response = await devitrackApi.put(
            `/receiver/receiver-update/${id}`,
            {
              id: id,
              device: replacementList,
            }
          );
          if (response) {
            setLoading(true);
            rightDoneMessage("Receivers returned");
            receiversAssignedListCopy.map((item) => {
              for (let i = 0; i < listOfDeviceInPool.length; i++) {
                if (item.serialNumber === listOfDeviceInPool[i].device) {
                  devitrackApi.put(
                    `/receiver/receivers-pool-update/${listOfDeviceInPool[i].id}`,
                    {
                      device: item.serialNumber,
                      status: "Operational",
                      activity: "Stored",
                      comment: "No comment",
                    }
                  );
                }
              }
            });
          }
          Swal.fire(
            "Returned!",
            "All receivers were returned successfully!",
            "success"
          );
        }
      });
    } catch (error) {
      swalErrorMessage(error);
    }
  };

  const replaceFunctionTrigger = (receiver, index) => {
    listOfDeviceInPool?.map((item) => {
      if (item.device === receiver.serialNumber) {
        setReceiverIdSavedInPool(item.id);
      }
    });
    try {
      setReceiverObjectToReplace({
        serialNumber: receiver.serialNumber,
        status: receiver.status,
      });
      setReplaceReceiverIndex(index);
      setReplaceStatus(true);
    } catch (error) {
      console.log(
        "🚀 ~ file: ReceiversDetailsAssignation.js ~ line 201 ~ replaceFunctionTrigger ~ error",
        error
      );
      swalErrorMessage(error);
    }
  };

  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div>
        <DetailSelectedUserFOrAssignReceiver />
      </div>
      <div>
        <PaymentIntentTemplate />
      </div>
      <div>
        <div>
          {loading !== true ? (
            <>
              {paymentIntentReceiversAssigned?.length < 1 ? (
                <div className="container-input-button">
                  {receiversAssigned.length !==
                  paymentIntentDetailSelected.device ? (
                    <>
                      <input
                        ref={inputReference}
                        value={receiverNumberAssgined}
                        name="receiverNumberAssgined"
                        id="receiverNumberAssgined"
                        type="text"
                        onChange={(event) =>
                          setReceiverNumberAssgined(event.target.value)
                        }
                      />
                      <button className="btn btn-create" onClick={addReceiver}>
                        Add receiver
                      </button>
                    </>
                  ) : (
                    ""
                  )}
                </div>
              ) : (
                <div>
                  <input
                    name="searcTerm"
                    value={searchTerm}
                    onChange={(event) => setSearchTerm(event.target.value)}
                    placeholder="Search receiver"
                  />
                </div>
              )}
              <div>
                <div
                  style={{
                    width: "60%",
                    margin: "0 auto",
                  }}
                >
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Serial Number</th>
                        <th scope="col">Type</th>
                        <th scope="col">Status</th>
                      </tr>
                    </thead>
                    {paymentIntentReceiversAssigned?.length > 0
                      ? paymentIntentReceiversAssigned
                          ?.at(-1)
                          .device?.map((receiver, index) => {
                            return (
                              <tbody key={index + 1}>
                                <tr>
                                  <th scope="row">{index + 1}</th>
                                  <td>{receiver.serialNumber}</td>
                                  <td>
                                    <span>Receiver</span>
                                  </td>
                                  <td>
                                    {receiver.status !== false
                                      ? "ACTIVATED"
                                      : "INACTIVATED"}
                                  </td>
                                  <td>
                                    <button
                                      className="btn btn-create"
                                      onClick={() =>
                                        replaceFunctionTrigger(receiver, index)
                                      }
                                    >
                                      Replace
                                    </button>
                                  </td>
                                  <td>
                                    {receiver.status !== false ? (
                                      <button
                                        className="btn btn-delete"
                                        onClick={() =>
                                          handleReturnDevice(receiver, index)
                                        }
                                      >
                                        Return
                                      </button>
                                    ) : (
                                      <button
                                        className="btn btn-create"
                                        onClick={() =>
                                          handleAssignDevice(receiver, index)
                                        }
                                      >
                                        Assign
                                      </button>
                                    )}
                                  </td>
                                </tr>
                              </tbody>
                            );
                          })
                      : receiversAssigned?.map((item, index) => {
                          return (
                            <tbody key={index + item}>
                              <tr>
                                <th scope="row">{index + 1}</th>
                                <td>{item.serialNumber}</td>
                                <td>
                                  <span>Receiver</span>
                                </td>
                                <td>
                                  <span>
                                    {item.status === true
                                      ? "ACTIVATED"
                                      : "INACTIVATED"}
                                  </span>
                                </td>
                                <td>
                                  <button
                                    className="btn btn-delete"
                                    onClick={() =>
                                      removeReceiverBeforeSavedData(index)
                                    }
                                  >
                                    Remove Receiver
                                  </button>
                                </td>
                              </tr>
                            </tbody>
                          );
                        })}
                  </table>
                </div>
              </div>
              <div style={{ width: "20%", margin: "0 auto" }}>
                {receiversAssigned?.length ===
                  paymentIntentDetailSelected.device && (
                  <button
                    className="btn btn-create"
                    disabled={saveButtonDisplay}
                    onClick={handleDataSubmitted}
                  >
                    Save
                  </button>
                )}
              </div>
            </>
          ) : (
            <h6>Loading...</h6>
          )}
        </div>
      </div>
      {paymentIntentReceiversAssigned?.length > 0 ? (
        paymentIntentReceiversAssigned?.at(-1).device?.length > 1 ? (
          <button
            className="btn btn-delete"
            style={{ width: "25%", margin: "2% auto", padding: "15px" }}
            onClick={returnAllReceiversAtOnce}
          >
            Return all
          </button>
        ) : null
      ) : null}
      {receiverObjectToReplace !== null && (
        <ModalReplaceReceiver
          paymentIntentDetailSelected={paymentIntentDetailSelected}
          receiverIdSavedInPool={receiverIdSavedInPool}
          listOfDeviceInPool={listOfDeviceInPool}
          setLoading={setLoading}
          receiverObjectToReplace={receiverObjectToReplace}
          replaceReceiverIndex={replaceReceiverIndex}
          paymentIntentReceiversAssigned={paymentIntentReceiversAssigned}
          replaceStatus={replaceStatus}
          setReplaceStatus={setReplaceStatus}
        />
      )}
    </div>
  );
};
