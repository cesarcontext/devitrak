import { Icon } from '@iconify/react';
import React from 'react'
import QRCode from 'react-qr-code';
import { devitrackApi } from '../../apis/devitrackApi';
import { Accordion } from './Accordion';

const RetrievePaymentIntentReceiptSaved = ({ props }) => {
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

  return (
    <div key={props.id}>
    <div className="accordion-detail-title">
      <div className="order-list">
        <Icon
          icon="material-symbols:check-circle"
          color="#1e73be"
        />
        <p className="accordion-header">
          <strong>Order: </strong> {props.paymentIntent}{" "}
        </p>
      </div>
      <div className="accordion-body-detail">
        <div className="">
          {checkPaymentIntentArray(props.paymentIntent)}
        </div>
        <div>
          <span>
            Device ordered:&nbsp;{" "}
            <p>
              <strong>{props.device}</strong>
            </p>
          </span>
          <span>
            Pending return:&nbsp;{" "}
            <strong>
              <Accordion item={props.paymentIntent} />
            </strong>
          </span>
          <span
            style={{
              color: "var(--main-colorsbluetiful)",
              cursor: "pointer",
              textDecoration: "underline",
            }}
          >
            No deposit required
          </span>
        </div>
      </div>
    </div>
  </div>
  )
}
export default RetrievePaymentIntentReceiptSaved