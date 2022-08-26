import React from "react";
import { Accordion } from "../components/Accordion";
import { ContactInfoProfile } from "../components/ContactInfoProfile";
import { PaymentInfoProfile } from "../components/PaymentInfoProfile";
import { ReturnDeviceAlert } from "../components/ReturnDeviceAlert";
import { useContactInfoStore } from "../hooks/useContactInfoStore";
import { useDeviceCount } from "../hooks/useDeviceCountStore";

export const MyProfile = () => {
  const { deviceRented, deviceSelected } = useDeviceCount();
  const { userParseStored } = useContactInfoStore();

  return (
    <div
      className="my_profile_info"
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItem: "center",
        height: "calc(100vh - 16vh)",
      }}
    >
      <div
        style={{
          margin: "20px",
        }}
      >
        <div>
          <h3>Account</h3>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItem: "center",
          }}
        >
          <div
            style={{
              width: "30%",
              height: "80%",
              margin: "0 auto",
              border: "solid 1px #212529",
              borderRadius: "15px",
            }}
          >
            <div
              className=""
              style={{
                display: "flex",
                justifyContent: "flex-end",
                alignItem: "center",
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-pencil"
                viewBox="0 0 16 16"
              >
                <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
              </svg>
              <h5> EDIT </h5>
            </div>
            <div>
              <h5>Your conntact infomartion</h5>
            </div>
            <div>
              <ContactInfoProfile />
            </div>
            <hr style={{ width: "0%" }} />
            <div>
              <h5>Your payment Informacion</h5>
            </div>
            <PaymentInfoProfile />
          </div>
        </div>
        <ReturnDeviceAlert />
        <div>
          <button
            style={{
              margin: "auto",
              backgroundColor: "rgba(69, 104, 220, 1)",
              color: "#ffff",
              height: "5vh",
              borderRadius: "10px",
              outline: "transparency",
              border: "rgba(69, 104, 220, 1)",
            }}
          >
            Contact Context Glocal
          </button>
        </div>
        <div
          style={{
            width: "55%",
            height: "40vh",
            margin: "0 auto",
          }}
        >
          <div>
            <h3>Your devices</h3>
            <span>All the devices with checkmarks are now returned</span>
          </div>
          <Accordion />
        </div>
      </div>
    </div>
  );
};
