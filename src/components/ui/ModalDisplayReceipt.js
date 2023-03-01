import React from "react";
import { Link } from "react-router-dom";


/**
 * ModalDisplayReceipt - modal display to notify user about where to find all receipt
 * @component
 * @param {boolean} setDisplayModalReceipt - state to display/close modal imported frommy profile user page
 * @returns {HTMLBodyElement}
 */
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
