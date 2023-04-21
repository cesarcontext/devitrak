import React from "react";
import QRCode from "react-qr-code";
import { Accordion } from "./Accordion";
import "../../style/component/ui/AccordionListPaymentIntent.css";
import { Icon } from "@iconify/react";
import { devitrackApi } from "../../apis/devitrackApi";
import { useState } from "react";

const RetrievePaymentIntentReceiptFormat = ({ props }) => {
  const [infoDetail, setInfoDetail] = useState([]);
  const checkPaymentIntentArray = (info) => {
    if (info === undefined) {
      return (
        <>
          <QRCode
            fgColor="#000"
            bgColor="#ffff"
            level="Q"
            size={150}
            value="no value returned"
          />
        </>
      );
    }
    return (
      <>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "10px",
          }}
        >
          <QRCode
            fgColor="#000"
            bgColor="#ffff"
            level="Q"
            size={100}
            value={info}
            style={{
              margin: "0 auto",
            }}
          />
        </div>
      </>
    );
  };
  const retrievePaymentIntentInfo = async (props) => {
    const resp = await devitrackApi.get(
      `stripe/payment_intents/${props.paymentIntent}`
    );
    if (resp) {
      setInfoDetail(resp.data.paymentIntent);
    }
  };
  retrievePaymentIntentInfo(props);
  return (
    <div key={infoDetail[0]?.id}>
      <div className="accordion-detail-title">
        <div className="order-list">
          <Icon icon="material-symbols:check-circle" color="#1e73be" />
          <p className="accordion-header">
            <strong>Order: </strong>
            {infoDetail[0]?.id} <i className="bi bi-chevron-down" />
          </p>
        </div>
        <div className="accordion-body-detail">
          <div className="">{checkPaymentIntentArray(infoDetail[0]?.id)}</div>
          <div>
            <span>
              Device ordered:&nbsp;{" "}
              <p>
                <strong>{infoDetail[0]?.amount / 20000}</strong>
              </p>
            </span>
            <span>
              Pending return:&nbsp;{" "}
              <strong>
                <Accordion item={infoDetail[0]?.id} />
              </strong>
            </span>
            {infoDetail[0]?.charges.data[0].outcome?.network_status ===
              "approved_by_network" && (
              <a
                style={{
                  color: "var(--main-colorsbluetiful)",
                  cursor: "pointer",
                  textDecoration: "underline",
                }}
                href={`${infoDetail[0]?.charges?.data[0].receipt_url}`}
                target="_blank"
                rel="noreferrer"
              >
                View receipt
              </a>
            )}
            {infoDetail[0]?.failure_code !== null && (
              <div
                style={{
                  color: "var(--main-colorsbluetiful)",
                  cursor: "pointer",
                  textDecoration: "underline",
                }}
              >
                <p style={{ color: "red", fontSize: "12px" }}>
                  {infoDetail[0]?.outcome?.seller_message}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RetrievePaymentIntentReceiptFormat;
