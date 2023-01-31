import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { DetailSelectedUserFOrAssignReceiver } from "./DetailSelectedUserFOrAssignReceiver";
import { devitrackApi, devitrackApiAdmin } from "../../../apis/devitrackApi";
import { ModalReplaceReceiver } from "../ui/ModalReplaceReceiver";
import { useAdminStore } from "../../../hooks/useAdminStore";
import { onCheckReceiverPaymentIntent } from "../../../store/slices/stripeSlice";
import {
  rightDoneMessage,
  swalAlertMessage,
  swalErrorMessage,
} from "../../../helper/swalFireMessage";
import "../../../style/component/admin/receiversDetailsAssignation.css";
import { PaymentIntentTemplate } from "./PaymentIntentTemplate";

export const ReceiversDetailsAssignation = ({ searchTerm }) => {
  const { paymentIntentDetailSelected, paymentIntentReceiversAssigned } =
    useSelector((state) => state.stripe);
  const dispatch = useDispatch();
  const { checkReceiversAssignedToPaymentIntent } = useAdminStore();
  const [receiversAssigned, setReceiversAssigned] = useState([]);
  const [fetchedData, setFetchedData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [receiverNumberAssgined, setReceiverNumberAssgined] = useState("");
  const [replaceStatus, setReplaceStatus] = useState(false);
  const [searchTermField, setSearchTermField] = useState("");
  const [replaceReceiverIndex, setReplaceReceiverIndex] = useState();
  const [receiverObjectToReplace, setReceiverObjectToReplace] = useState(null);
  const [listOfDeviceInPool, setListOfDeviceInPool] = useState([]);
  const [receiverIdSavedInPool, setReceiverIdSavedInPool] = useState("");
  const [saveButtonDisplay, setSaveButtonDisplay] = useState(false);
  const paymentIntentToCheck = paymentIntentDetailSelected.paymentIntent;
  const inputReference = useRef();
  const [batchDevice, setBatchDevice] = useState("");
  const receiverObject = {
    serialNumber: receiverNumberAssgined,
    status: true,
  };

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
    if (receiverObject.serialNumber.length < 1) {
      setReceiverNumberAssgined("");
      inputReference.current.focus();
      return swalAlertMessage(`Empty serial number is not valid`);
    }
    for (let i = 0; i < receiversAssigned.length; i++) {
      if (receiverObject.serialNumber === receiversAssigned[i].serialNumber) {
        setReceiverNumberAssgined("");
        inputReference.current.focus();
        return swalAlertMessage(
          `Serial #${receiversAssigned[i].serialNumber} is duplicated`
        );
      }
    }
    const replacementList = [receiverObject, ...receiversAssigned];
    if (replacementList.length <= paymentIntentDetailSelected.device) {
      setReceiversAssigned(replacementList);
      setReceiverNumberAssgined("");
      inputReference.current.focus();
    }
  };
  if (receiverObject.serialNumber.length === 6) {
    addReceiver();
  }
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
      setSearchTermField("");
    } catch (error) {
      swalErrorMessage(error);
    }
  };

  let filteredResult = [];
  const filter = async () => {
    const devicesInPaymentIntent = paymentIntentReceiversAssigned?.device;
    for (let i = 0; i < devicesInPaymentIntent?.length; i++) {
      if (searchTermField === devicesInPaymentIntent[i].serialNumber) {
        return (filteredResult = [
          {
            ...devicesInPaymentIntent[i],
            index: i,
          },
        ]);
      }
    }
  };
  filter();
  let errorMessageForBatch = null;
  const returnDeviceAsBatch = async () => {
    for (let data of paymentIntentReceiversAssigned) {
      for (let device of data.device) {
        if (device.serialNumber === batchDevice && device.status === true) {
          console.log(device);
        } else {
          errorMessageForBatch = "Device does not belong to this batch";
          setBatchDevice("");
        }
      }
    }
  };
  if (batchDevice.length > 5) {
    returnDeviceAsBatch();
    setBatchDevice("");
  }
  return (
    <div>
      <div>
        {!paymentIntentReceiversAssigned ? "" : <PaymentIntentTemplate />}
      </div>
      <div>
        <div>
          {loading !== true ? (
            <>
              {/**Second condition to display add receiver function or search input field*/}
              {paymentIntentReceiversAssigned?.length < 1 ? (
                <div className="container-input-button">
                  {/**Second condition to check if all receivers were assigned or not*/}
                  {receiversAssigned.length !==
                  paymentIntentDetailSelected.device ? (
                    <>
                      <input
                        ref={inputReference}
                        className="form-control"
                        value={receiverNumberAssgined}
                        name="receiverNumberAssgined"
                        id="receiverNumberAssgined"
                        type="text"
                        onChange={(event) =>
                          setReceiverNumberAssgined(event.target.value)
                        }
                      />
                      <button
                        className="btn btn-create"
                        style={{ width: "fit-content" }}
                        onClick={addReceiver}
                      >
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
                    name="searchTermField"
                    value={searchTermField}
                    onChange={(event) => setSearchTermField(event.target.value)}
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
                      ? searchTermField !== ""
                        ? filteredResult?.map((result) => {
                            return (
                              <tbody key={result.index + 1}>
                                <tr>
                                  <th scope="row">{result.index + 1}</th>
                                  <td>{result.serialNumber}</td>
                                  <td>
                                    <span>Receiver</span>
                                  </td>
                                  <td>
                                    {result.status !== false
                                      ? "ACTIVATED"
                                      : "RETURNED"}
                                  </td>
                                  <td>
                                    <button
                                      className="btn btn-create"
                                      onClick={() =>
                                        replaceFunctionTrigger(
                                          result,
                                          result.index
                                        )
                                      }
                                    >
                                      Replace
                                    </button>
                                  </td>
                                  <td>
                                    {result.status !== false ? (
                                      <button
                                        className="btn btn-delete"
                                        onClick={() =>
                                          handleReturnDevice(
                                            result,
                                            result.index
                                          )
                                        }
                                      >
                                        Return
                                      </button>
                                    ) : (
                                      <button
                                        className="btn btn-create"
                                        onClick={() =>
                                          handleAssignDevice(
                                            result,
                                            result.index
                                          )
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
                        : paymentIntentReceiversAssigned
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
                                        : "RETURNED"}
                                    </td>
                                    <td>
                                      <button
                                        className="btn btn-create"
                                        onClick={() =>
                                          replaceFunctionTrigger(
                                            receiver,
                                            index
                                          )
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
                            <tbody key={item + 1}>
                              <tr>
                                <th scope="row">
                                  {receiversAssigned.length - index}
                                </th>
                                <td>{item.serialNumber}</td>
                                <td>
                                  <span>Receiver</span>
                                </td>
                                <td>
                                  <span>
                                    {item.status === true
                                      ? "ACTIVATED"
                                      : "RETURNED"}
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
      <input
        name="batchDevice"
        value={batchDevice}
        onChange={(event) => setBatchDevice(event.target.value)}
        placeholder="Scan device here to return it"
      />
      {errorMessageForBatch !== null && <strong>{errorMessageForBatch}</strong>}
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
