import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { devitrackApi, devitrackApiAdmin } from "../../../apis/devitrackApi";
import { Navbar } from "../ui/Navbar";
import { onCheckReceiverPaymentIntent } from "../../../store/slices/stripeSlice";
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
  }, [paymentIntentDetailSelected.paymentIntent, loading, fetchedData]);

  const addReceiver = async () => {
    const replacementList = [...receiversAssigned, receiverObject];
    if (replacementList.length <= paymentIntentDetailSelected.device) {
      await setReceiversAssigned(replacementList);
      await setReceiverNumberAssgined("");
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
        // //*located receiverPoolId to pass it
        // devitrackApi.put(`/receiver/receivers-pool-update/${receiverPoolId}`, {
        //   device: objectToReturn.serialNumber,
        //   status: "Operational",
        //   activity: "Stored",
        // });
        setLoading(true);
            alert("Receiver returned");
}
    } catch (error) {
      alert("Something went wrong, pelase try it later");
    }
  };
  const handleAssignDevice = async (receiver, index) => {
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
        // //*located receiverPoolId to pass it
        // devitrackApi.put(`/receiver/receivers-pool-update/${receiverPoolId}`, {
        //   device: objectToReturn.serialNumber,
        //   status: "Operational",
        //   activity: "In-use",
        // });
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
        // replacementList?.map((item) => {
        //   //*located receiverPoolId to pass it
        //   devitrackApi.put(
        //     `/receiver/receivers-pool-update/${receiverPoolId}`,
        //     {
        //       device: item.serialNumber,
        //       status: "Operational",
        //       activity: "Stored",
        //     }
        //   );
        // });
        setLoading(true);
        alert("Receivers returned");
      }
    } catch (error) {
      alert("Something went wrong, pelase try it later");
    }
  };

  const replaceFunctionTrigger = (receiver, index) => {
    try {
      setReceiverObjectToReplace({
        serialNumber: receiver.serialNumber,
        status: receiver.status,
      });
      setReplaceReceiverIndex(index);
      setReplaceStatus(true);
      console.log(replaceStatus);
    } catch (error) {
      console.log(
        "🚀 ~ file: ReceiversDetailsAssignation.js ~ line 201 ~ replaceFunctionTrigger ~ error",
        error
      );
    }
  };
  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div style={{ width: "5%" }}>
        <NavLink to="/admin/attendees">
          <button>Back</button>
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
      {loading !== true ? (
        <>
          {paymentIntentReceiversAssigned?.length < 1 ? (
            <div style={{ width: "40%", display: "flex", margin: "0 auto" }}>
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
                                    replaceFunctionTrigger(receiver, index)
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
              <button onClick={handleDataSubmitted}>Save</button>
            )}
          </div>
        </>
      ) : (
        <h6>Loading...</h6>
      )}
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
/**
 * replaceStatus,
  setReplaceStatus,
  paymentIntentReceiversAssigned,
  receiverObjectToReplace,
  replaceReceiverIndex,
  setLoading,
 */
