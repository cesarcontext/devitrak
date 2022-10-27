import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { devitrackApi, devitrackApiAdmin } from "../../../apis/devitrackApi";
import { Navbar } from "../ui/Navbar";
import { NavLink } from "react-router-dom";
import { onCheckReceiverPaymentIntent } from "../../../store/slices/stripeSlice";
import { useAdminStore } from "../../../hooks/useAdminStore";

export const ReceiversDetailsAssignation = () => {
  const { paymentIntentDetailSelected, paymentIntentReceiversAssigned } =
    useSelector((state) => state.stripe);
  const dispatch = useDispatch();
  const { checkReceiversAssignedToPaymentIntent } = useAdminStore();
  const [receiversAssigned, setReceiversAssigned] = useState([]);
  const [fetchedData, setFetchedData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [receiverNumberAssgined, setReceiverNumberAssgined] = useState("");
  const [receiverStatusAssigned, setReceiverStatusAssigned] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [replacementList, setReplacementList] = useState([]);

  const receiverObject = {
    serialNumber: receiverNumberAssgined,
    status: receiverStatusAssigned,
  };

  const paymentToCheck = paymentIntentDetailSelected.paymentIntent;

  useEffect(() => {
    checkReceiversAssignedToPaymentIntent(paymentToCheck);
  }, [paymentIntentDetailSelected.paymentIntent, loading]);

  useEffect(() => {
    const controller = new AbortController();
    if (
      paymentIntentReceiversAssigned !== undefined ||
      paymentIntentReceiversAssigned.data?.receiver?.length > 1
    ) {
      setLoading(false);
    }
    return () => {
      controller.abort();
    };
  }, [paymentIntentDetailSelected.paymentIntent, loading]);

  const addReceiver = async () => {
    replacementList = [...receiversAssigned, receiverObject];
    if (replacementList.length <= paymentIntentDetailSelected.device) {
      await setReceiversAssigned(replacementList);
      await setReceiverNumberAssgined("");
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
  const handleReturnDevice = async (index, receiver) => {
    const id = paymentIntentReceiversAssigned.at(-1).id;
    const response = await devitrackApi.put(`/receiver/receiver-update/${id}`, {
      id: id,
      device: {
        serialNumber: index.serialNumber,
        status: false,
      },
    });
    setLoading(true);
  };

  const handleAssignDevice = async (receiver) => {
    const id = paymentIntentReceiversAssigned.at(-1).id;
    const response = await devitrackApi.put(`/receiver/receiver-update/${id}`, {
      id: id,
      device: {
        serialNumber: receiver.serialNumber,
        status: true,
      },
    });
    setLoading(true);
  };

  const replaceReceiverAssignedFetchedUpdate = async () => {};

  const removeReceiverBeforeSavedData = async (index) => {
    const result = receiversAssigned.splice(index, 1);
    if (result.length === 1) {
      return setReceiverNumberAssgined([]);
    }
    setReceiversAssigned(result);
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
                        {/**
                      .filter((item) =>
                        item.serialNumber.includes(searchTerm)
                      )
                       */}
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
                                    replaceReceiverAssignedFetchedUpdate(
                                      receiver
                                    )
                                  }
                                >
                                  Replace
                                </button>
                              </td>
                              <td>
                                {receiver.status !== false ? (<button
                                  onClick={() =>
                                    // handleReturnDevice(index, receiver)
                                    handleReturnDevice(receiver)
                                  }
                                >
                                  Return
                                </button>) : (<button
                                  onClick={() =>
                                    // handleReturnDevice(receiver, receiver)
                                    handleAssignDevice(receiver)
                                  }
                                >
                                  ASSIGN
                                </button>)}
                                
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
            {(paymentIntentReceiversAssigned?.length < 1 && (
              <button onClick={handleDataSubmitted}>Save</button>
            )) ||
              (receiversAssigned?.length ===
                paymentIntentDetailSelected.device && (
                <button onClick={handleDataSubmitted}>Save</button>
              ))}
          </div>
        </>
      ) : (
        <h6>Loading...</h6>
      )}
    </div>
  );
};
