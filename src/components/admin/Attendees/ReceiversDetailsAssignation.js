import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
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
  const [dispatchBatch, setDispatchBatch] = useState(false);
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
  const whatsappNotice = async ({ bodyMessage, to, alertMessage }) => {
    const whatsappNotification = devitrackApi.post(
      "/twilio/send-whatsapp-notification",
      {
        body: bodyMessage,
        to: to,
      }
    );
    if (whatsappNotification) {
      alert(alertMessage);
    }
  };
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
        whatsappNotice({
          bodyMessage: `Your ${paymentIntentDetailSelected.device} ${
            paymentIntentDetailSelected.device > 1 ? "devices" : "device"
          } are assigned to your account. Please keep in mind to return them all when the event finishes. Enjoy the event!`,
          to: `${paymentIntentDetailSelected.user.phoneNumber}`,
          alertMessage: `User was noticed about the action taken in the account`,
        });
      }
      rightDoneMessage(
        `Receivers were assigned to payment intent successfully`
      );
      window.location.reload();
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
        whatsappNotice({
          bodyMessage: `Your ${receiver.serialNumber} device was returned.`,
          to: `${paymentIntentDetailSelected.user.phoneNumber}`,
          alertMessage: `User was noticed that ${receiver.serialNumber} device was returned`,
        });
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
          whatsappNotice({
            bodyMessage: `All your ${replacementList.length} ${
              replacementList.length > 1 ? "devices" : "device"
            } were returned`,
            to: `${paymentIntentDetailSelected.user.phoneNumber}`,
            alertMessage: `User was noticed that ${replacementList.length} ${
              replacementList.length > 1 ? "devices were" : "device was"
            } returned`,
          });
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
    let receiverInPoolId;
    let index;
    for (let i = 0; i < paymentIntentReceiversAssigned[0].device.length; i++) {
      if (
        paymentIntentReceiversAssigned[0].device[i].serialNumber ===
          batchDevice &&
        paymentIntentReceiversAssigned[0].device[i].status === true
      ) {
        index = i;
      }
    }
    listOfDeviceInPool?.map((item) => {
      if (item.device === batchDevice) {
        return (receiverInPoolId = item.id);
      }
    });
    paymentIntentReceiversAssigned?.map((item) => {
      return (receiversAssignedListCopy = item.device);
    });
    const element_deleted = 1;
    const objectToReturn = {
      serialNumber: batchDevice,
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
      }
    } catch (error) {
      swalErrorMessage(error);
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
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          width: "80vw",
        }}
      >
        {paymentIntentReceiversAssigned?.length > 0 ? (
          paymentIntentReceiversAssigned?.at(-1).device?.length > 1 ? (
            <button
              className="btn btn-delete"
              style={{
                width: "fit-content",
                margin: "1% auto",
                padding: "5px",
              }}
              onClick={returnAllReceiversAtOnce}
            >
              RETURN ALL
            </button>
          ) : null
        ) : null}
        {paymentIntentReceiversAssigned?.length > 0 ? (
          paymentIntentReceiversAssigned?.at(-1).device?.length > 1 ? (
            dispatchBatch === false ? (
              <button
                className="btn btn-delete"
                style={{
                  width: "fit-content",
                  margin: "1% auto",
                  padding: "5px",
                }}
                onClick={() => setDispatchBatch(true)}
              >
                RETURN BATCH
              </button>
            ) : (
              <>
                <input
                  name="batchDevice"
                  value={batchDevice}
                  onChange={(event) => setBatchDevice(event.target.value)}
                  placeholder="Scan device here to return it"
                />
                {errorMessageForBatch !== null && (
                  <div style={{ border: "solid 1px #212529" }}>
                    <p>{errorMessageForBatch}</p>
                  </div>
                )}
                <button
                  className="btn btn-create"
                  style={{
                    width: "fit-content",
                    margin: "1% auto",
                    padding: "5px",
                  }}
                  onClick={() => setDispatchBatch(false)}
                >
                  DONE
                </button>
              </>
            )
          ) : null
        ) : null}
      </div>

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
