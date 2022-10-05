import React, { useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { Navbar } from "../ui/Navbar";

export const ReceiversDetailsAssignation = () => {
  const { paymentIntentDetailSelected } = useSelector((state) => state.stripe);
  const [receiverSerialNumber, setReceiverSerialNumber] = useState([]);

  const receiversAssigned = []

  const handleInputReceiver = (event) => {
    event.preventDefault();
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
                justifyContent: "center",
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
                justifyContent: "center",
                alignContent: "center",
              }}
            >
              <label>Email: </label> <br />
              <h5>{paymentIntentDetailSelected.user.email}</h5>
            </div>
            <div
              style={{
                display: "flex",
                felxDirection: "column",
                justifyContent: "center",
                alignContent: "center",
              }}
            >
              <label>Phone #: </label> <br />
              <h5>{paymentIntentDetailSelected.user.phoneNumber}</h5>
            </div>
            <div
              style={{
                display: "flex",
                felxDirection: "column",
                justifyContent: "center",
                alignContent: "center",
              }}
            >
              {" "}
              <label>Payment Intent ID: </label> <br />
              <h5>{paymentIntentDetailSelected.paymentIntent}</h5>
            </div>
            <div
              style={{
                display: "flex",
                felxDirection: "column",
                justifyContent: "center",
                alignContent: "center",
              }}
            >
              {" "}
              <label>Device Selected: </label> <br />
              <h5>{paymentIntentDetailSelected.device}</h5>
            </div>
          </div>
        </div>
      </div>
      <div style={{ width: "40%", display: "flex"}}>
        <input
        style={{ width: "100%"}}
          value={receiverSerialNumber}
          name="receiverSerialNumber"
          id="receiverSerialNumber"
          type="text"
          onChange={(event) => setReceiverSerialNumber(event.target.value)}
        />
        {/* {receiversArray(paymentIntentDetailSelected.device)} */}
        <button style={{ width: "50%"}} onClick={handleInputReceiver}>Add receiver</button>
      </div>
      <div></div>
    </div>
  );
};
