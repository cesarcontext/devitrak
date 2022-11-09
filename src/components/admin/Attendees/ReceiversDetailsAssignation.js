import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { devitrackApi, devitrackApiAdmin } from "../../../apis/devitrackApi";
import { Navbar } from "../ui/Navbar";
import {
  onAddPaymentIntentDetailSelected,
  onCheckReceiverPaymentIntent,
  onAddPaymentIntentSelected,
} from "../../../store/slices/stripeSlice";
import { useAdminStore } from "../../../hooks/useAdminStore";
import { NavLink } from "react-router-dom";
import { ModalReplaceReceiver } from "../ui/ModalReplaceReceiver";

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
  const [
    updateListAfterAddNewReceiverForNoRegularUser,
    setUpdateListAfterAddNewReceiverForNoRegularUser,
  ] = useState(false);
  const receiverObject = {
    serialNumber: receiverNumberAssgined,
    status: true,
  };

  const paymentIntentToCheck = paymentIntentDetailSelected.paymentIntent;

  useEffect(() => {
    const controller = new AbortController();
    checkReceiversAssignedToPaymentIntent(paymentIntentToCheck);
    if (
      paymentIntentReceiversAssigned !== undefined ||
      paymentIntentReceiversAssigned.data?.receiver?.length > 1
    ) {
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
    updateListAfterAddNewReceiverForNoRegularUser
  ]);

  useEffect(() => {
    const controller = new AbortController();
    devitrackApi
      .get("/receiver/receiver-pool-list")
      .then((data) => setListOfDeviceInPool(data.data.receiversInventory));
    return () => {
      controller.abort();
    };
  }, [
    paymentIntentDetailSelected.paymentIntent,
    loading,
    fetchedData,
    replaceStatus,
    updateListAfterAddNewReceiverForNoRegularUser
  ]);

  const addReceiver = async () => {
    const replacementList = [...receiversAssigned, receiverObject];
    if (replacementList.length <= paymentIntentDetailSelected.device) {
      await setReceiversAssigned(replacementList);
      await setReceiverNumberAssgined("");
    }
  };

  const addReceiverToNoRegularUser = async () => {
    const replacementList = [...receiversAssigned, receiverObject];
    await setReceiversAssigned(replacementList);
    await setReceiverNumberAssgined("");
  };

  let receiversAssignedListCopy;
  const removeReceiverBeforeSavedData = async (index) => {
    const result = receiversAssigned.splice(index, 1);
    if (result.length === 1) {
      return setReceiverNumberAssgined([]);
    }
    setReceiversAssigned(result);
  };

  const handleDataNoRegularUserSubmitted = async () => {
    try {
      const response = await devitrackApiAdmin.post("/receiver-assignation", {
        paymentIntent: paymentIntentDetailSelected.paymentIntent,
        device: receiversAssigned,
        user: paymentIntentDetailSelected.user,
        active: true,
      });
      if (response) {
        setFetchedData(response.data);
        setLoading(!loading);
        receiversAssigned?.map((item) => {
          devitrackApi.post("/receiver/receivers-pool", {
            device: item.serialNumber,
            status: "Operational",
            activity: "In-use",
            comment: "No comment",
            user: paymentIntentDetailSelected.user.email,
          });
        });
      }
      Swal.fire({
        title: "",
        width: 600,
        padding: "3em",
        text: `Receivers were assigned to payment intent successfully`,
        icon: "success",
        color: "#rgb(30, 115, 190)",
        background: "#fff",
        confirmButtonColor: "rgb(30, 115, 190)",
        backdrop: `
      	rgb(30, 115, 190)
        	url("../image/logo.jpg")
        	left top
        	no-repeat
      	`,
      });
      setSaveButtonDisplay(true);
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: "Upss something went wrong!!",
        width: 600,
        padding: "3em",
        text: `${error.response}`,
        icon: "error",
        color: "#rgb(30, 115, 190)",
        background: "#fff",
        confirmButtonColor: "rgb(30, 115, 190)",
        backdrop: `
        	rgb(30, 115, 190)
          	url("../image/logo.jpg")
          	left top
          	no-repeat
        	`,
      });
    }
  };
  const handleDataSubmitted = async () => {
    try {
      const response = await devitrackApiAdmin.post("/receiver-assignation", {
        paymentIntent: paymentIntentDetailSelected.paymentIntent,
        device: receiversAssigned,
        user: paymentIntentDetailSelected.user,
        active: true,
      });
      if (response) {
        setFetchedData(response.data);
        dispatch(onCheckReceiverPaymentIntent(fetchedData));
        setLoading(!loading);
        receiversAssigned?.map((item) => {
          devitrackApi.post("/receiver/receivers-pool", {
            device: item.serialNumber,
            status: "Operational",
            activity: "In-use",
            comment: "No comment",
            user: paymentIntentDetailSelected.user.email,
          });
        });
      }
      Swal.fire({
        title: "",
        width: 600,
        padding: "3em",
        text: `Receivers were assigned to payment intent successfully`,
        icon: "success",
        color: "#rgb(30, 115, 190)",
        background: "#fff",
        confirmButtonColor: "rgb(30, 115, 190)",
        backdrop: `
      	rgb(30, 115, 190)
        	url("../image/logo.jpg")
        	left top
        	no-repeat
      	`,
      });
      setSaveButtonDisplay(true);
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: "Upss something went wrong!!",
        width: 600,
        padding: "3em",
        text: `${error.response.data.msg}`,
        icon: "error",
        color: "#rgb(30, 115, 190)",
        background: "#fff",
        confirmButtonColor: "rgb(30, 115, 190)",
        backdrop: `
        	rgb(30, 115, 190)
          	url("../image/logo.jpg")
          	left top
          	no-repeat
        	`,
      });
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
        alert("Receiver returned");
      }
    } catch (error) {
      alert("Something went wrong, pelase try it later");
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
        alert("Receiver assigned");
      }
    } catch (error) {
      alert("Something went wrong, please try later");
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
      const response = await devitrackApi.put(
        `/receiver/receiver-update/${id}`,
        {
          id: id,
          device: replacementList,
        }
      );
      if (response) {
        setLoading(true);
        alert("Receivers returned");
      }
    } catch (error) {
      alert("Something went wrong, pelase try it later");
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
    }
  };

  const addMoreReceiverToNoRegularUser = async () => {
    try {
      let paymentIntentReceiversAssignedCopy = [];
      paymentIntentReceiversAssigned?.at(-1).device?.map((receiver) => {
        return paymentIntentReceiversAssignedCopy.push(receiver);
      });

      const listToAddToExistAssignedReceiversSaved = [
        ...paymentIntentReceiversAssignedCopy,
        receiverObject,
      ];
      const response = devitrackApi.put(
        `/receiver/receiver-update/${paymentIntentReceiversAssigned.at(-1).id}`,
        {
          id: paymentIntentReceiversAssigned.at(-1).id,
          device: listToAddToExistAssignedReceiversSaved,
        }
      );
      if (response) {
        devitrackApi.post("/receiver/receivers-pool", {
          device:receiverObject.serialNumber,
          status: "Operational",
          activity: "In-use",
          comment: "No comment",
          user: paymentIntentDetailSelected.user.email,
        });
        setLoading(true);
        setUpdateListAfterAddNewReceiverForNoRegularUser(!updateListAfterAddNewReceiverForNoRegularUser)
        alert("Receiver assigned");
      }
    } catch (error) {
      console.log(
        "🚀 ~ file: ReceiversDetailsAssignation.js ~ line 352 ~ addMoreReceiverToNoRegularUser ~ error",
        error
      );
    }
  };

  const cleanUpPaymentIntentDetailSelect = async () => {
    dispatch(onAddPaymentIntentDetailSelected({}));
    dispatch(onAddPaymentIntentSelected(""));
  };

  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div style={{ width: "5%" }}>
        <NavLink to="/admin/attendees">
          <button onClick={cleanUpPaymentIntentDetailSelect}>Back</button>
        </NavLink>
      </div>
      <div
        style={{
          border: "solid 2px #212529",
          borderRadius: "15px",
          width: "96%",
          margin: "2% auto",
        }}
      >
        <div style={{ display: "flex" }} key={paymentIntentDetailSelected.id}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
              margin: "1% 3%",
              width: "100%",
            }}
          >
            <div
              style={{
                display: "flex",
                felxDirection: "column",
                justifyContent: "space-between",
                alignContent: "center",
              }}
            >
              {" "}
              <label>Full Name: </label> <br />
              <h5>
                {paymentIntentDetailSelected.user.name}{" "}
                {paymentIntentDetailSelected.user.lastName}
              </h5>
            </div>
            <div
              style={{
                display: "flex",
                felxDirection: "column",
                justifyContent: "space-between",
                alignContent: "center",
              }}
            >
              <label>Email: </label> <br />
              <h5> {paymentIntentDetailSelected.user.email}</h5>
            </div>
            <div
              style={{
                display: "flex",
                felxDirection: "column",
                justifyContent: "space-between",
                alignContent: "center",
              }}
            >
              <label>Phone #: </label> <br />
              <h5> {paymentIntentDetailSelected.user.phoneNumber}</h5>
            </div>
            <div
              style={{
                display: "flex",
                felxDirection: "column",
                justifyContent: "space-between",
                alignContent: "center",
              }}
            >
              {" "}
              <label>Payment Intent ID: </label> <br />
              <h5> {paymentIntentDetailSelected.paymentIntent}</h5>
            </div>
            <div
              style={{
                display: "flex",
                felxDirection: "column",
                justifyContent: "space-between",
                alignContent: "center",
              }}
            >
              {" "}
              <label>Device Selected: </label> <br />
              <h5> {paymentIntentDetailSelected.device}</h5>
            </div>
          </div>
        </div>
      </div>
      <div>
        {paymentIntentDetailSelected.user?.category !== "No-regular" ? (
          <div>
            {loading !== true ? (
              <>
                {paymentIntentReceiversAssigned?.length < 1 ? (
                  <div
                    style={{ width: "40%", display: "flex", margin: "0 auto" }}
                  >
                    {receiversAssigned.length !==
                    paymentIntentDetailSelected.device ? (
                      <>
                        <input
                          style={{ width: "100%" }}
                          value={receiverNumberAssgined}
                          name="receiverNumberAssgined"
                          id="receiverNumberAssgined"
                          type="text"
                          onChange={(event) =>
                            setReceiverNumberAssgined(event.target.value)
                          }
                        />
                        <button style={{ width: "50%" }} onClick={addReceiver}>
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
                      width: "80%",
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
                                          onClick={() =>
                                            handleReturnDevice(receiver, index)
                                          }
                                        >
                                          Return
                                        </button>
                                      ) : (
                                        <button
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
        ) : (
          //!Redefine function to display saved data from user categor No-regular
          <div>
            {loading !== true ? (
              <>
                {paymentIntentReceiversAssigned?.length < 1 ? (
                  <div
                    style={{ width: "40%", display: "flex", margin: "0 auto" }}
                  >
                    <input
                      style={{ width: "100%" }}
                      value={receiverNumberAssgined}
                      name="receiverNumberAssgined"
                      id="receiverNumberAssgined"
                      type="text"
                      onChange={(event) =>
                        setReceiverNumberAssgined(event.target.value)
                      }
                    />
                    <button
                      style={{ width: "50%" }}
                      onClick={addReceiverToNoRegularUser}
                    >
                      Add receiver
                    </button>
                  </div>
                ) : (
                  <div
                    style={{ width: "40%", display: "flex", margin: "0 auto" }}
                  >
                    <input
                      style={{ width: "100%" }}
                      value={receiverNumberAssgined}
                      name="receiverNumberAssgined"
                      id="receiverNumberAssgined"
                      type="text"
                      onChange={(event) =>
                        setReceiverNumberAssgined(event.target.value)
                      }
                    />
                    <button
                      style={{ width: "50%" }}
                      onClick={addMoreReceiverToNoRegularUser}
                    >
                      Add more receiver
                    </button>
                  </div>
                )}
                <div>
                  <div
                    style={{
                      width: "80%",
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
                                          onClick={() =>
                                            handleReturnDevice(receiver, index)
                                          }
                                        >
                                          Return
                                        </button>
                                      ) : (
                                        <button
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
                {/*
                 */}
                <div style={{ width: "20%", margin: "0 auto" }}>
                  <button
                    disabled={saveButtonDisplay}
                    onClick={handleDataNoRegularUserSubmitted}
                  >
                    Save
                  </button>
                </div>
              </>
            ) : (
              <h6>Loading...</h6>
            )}
          </div>
        )}
      </div>

      {paymentIntentReceiversAssigned?.length > 0 ? (
        paymentIntentReceiversAssigned?.at(-1).device?.length > 1 ? (
          <button
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
