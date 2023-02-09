import React from "react";
import { Link } from "react-router-dom";

export const ModalDisplayReceipt = ({setDisplayModalReceipt}) => {
  return (
    <div
      style={{
        zIndex: "5",
        borderRadius: "15px",
        color: "#fff",
        padding: "60px",
        backgroundColor: "var(--bs-red)",
        boxShadow: "-1px 1px 3px",
        position:"absolute",
        top:"20%",
        left:"0%",
        transform:"translate(0, 0)",
        height:"55vh",
        transition:"ease-in-out .5s"
      }}
    >
      <span style={{ display: "flex" }}>
        <p onClick={() => setDisplayModalReceipt(false)}>CLOSE &nbsp;</p>
        <i className="bi bi-x-circle" />
      </span>
      <span>
        <Link to="/receipt">
          <p
            style={{
              color: "#fff",
              padding: "15px",
            }}
          >
            You can clik this link to view all your payment receipts
          </p>
        </Link>
      </span>
    </div>
  );
};
