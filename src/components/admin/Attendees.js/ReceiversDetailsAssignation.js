import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { devitrackApiAdmin, devitrackApi } from "../../../apis/devitrackApi";
import { useAdminStore } from "../../../hooks/useAdminStore";
import { Navbar } from "../ui/Navbar";

export const ReceiversDetailsAssignation = () => {
  const { paymentIntentDetailSelected, paymentIntentReceiversAssigned } =
    useSelector((state) => state.stripe);
  const { user } = useSelector((state) => state.admin);
  const { checkReceiversAssignedToPaymentIntent } = useAdminStore();
  const [receiverSerialNumber, setReceiverSerialNumber] = useState("");
  const [receiversAssigned, setReceiversAssigned] = useState([]);
  const [actived, setActived] = useState(true);
  const [fetchedData, setFetchedData] = useState();

  const paymentToCheck = paymentIntentDetailSelected.paymentIntent;

  useEffect(() => {
    checkReceiversAssignedToPaymentIntent(paymentToCheck);
  }, [paymentIntentDetailSelected.paymentIntent]);

  let replacementList;

  const addReceiver = async () => {
    replacementList = [...receiversAssigned, receiverSerialNumber];
    if (replacementList.length <= paymentIntentDetailSelected.device) {
      await setReceiversAssigned(replacementList);
      await setReceiverSerialNumber("");
    }
  };

  const handleDataSubmitted = async () => {
    const { data } = await devitrackApiAdmin.post("/receiver-assignation", {
      paymentIntent: paymentIntentDetailSelected.paymentIntent,
      device: receiversAssigned,
      user: paymentIntentDetailSelected.user,
      adminUser: user.uid,
    });
    setFetchedData(data);
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
      {paymentIntentReceiversAssigned.length < 1 ? (
        <div style={{ width: "40%", display: "flex", margin: "0 auto" }}>
          <input
            style={{ width: "100%" }}
            value={receiverSerialNumber}
            name="receiverSerialNumber"
            id="receiverSerialNumber"
            type="text"
            onChange={(event) => setReceiverSerialNumber(event.target.value)}
          />
          <button style={{ width: "50%" }} onClick={addReceiver}>
            Add receiver
          </button>
        </div>
      ) : null}
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
            {paymentIntentReceiversAssigned.length < 1 ? receiversAssigned?.map((item, index) => {
              return (
                <tbody>
                  <tr>
                    <th scope="row">{index + 1}</th>
                    <td>{item}</td>
                    <td>
                      <span>Receiver</span>
                    </td>
                    <td>
                      <input
                        class="form-check-input"
                        type="checkbox"
                        role="switch"
                        id="flexSwitchCheckChecked"
                        onChange={() => setActived(!actived)}
                        check="checked"
                      />
                    </td>
                  </tr>
                </tbody>
              );
            }) : paymentIntentReceiversAssigned.at(-1).device.map((index, receiver) => {
              return (
                <tbody>
                  <tr>
                    <th scope="row">{receiver + 1}</th>
                    <td>{index}</td>
                    <td>
                      <span>Receiver</span>
                    </td>
                    <td>
                      <input
                        class="form-check-input"
                        type="checkbox"
                        role="switch"
                        id="flexSwitchCheckChecked"
                        onChange={() => setActived(!actived)}
                        check="checked"
                      />
                    </td>
                  </tr>
                </tbody>
              );
            })}
          </table>
        </div>
      </div>
      <div style={{ width: "20%", margin: "0 auto" }}>
        {paymentIntentReceiversAssigned.length < 1 && <button onClick={handleDataSubmitted}>Save</button>}
      </div>
    </div>
  );
};
