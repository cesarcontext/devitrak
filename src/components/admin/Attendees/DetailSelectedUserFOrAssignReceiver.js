import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import {
  onAddPaymentIntentDetailSelected,
  onAddPaymentIntentSelected,
} from "../../../store/slices/stripeSlice";
import "../../../style/component/admin/receiversDetailsAssignation.css";

export const DetailSelectedUserFOrAssignReceiver = () => {
  const { paymentIntentDetailSelected } = useSelector((state) => state.stripe);
  const dispatch = useDispatch();
  const cleanUpPaymentIntentDetailSelect = async () => {
    dispatch(onAddPaymentIntentDetailSelected({}));
    dispatch(onAddPaymentIntentSelected(""));
  };
  return (
    <div className="container-payment-detail-assignment-section">
      <div
        className="payment-detail-assignment-section"
        key={paymentIntentDetailSelected.id}
      >
        <div className="detail-assignment-user-section">
          <div className="detail-user-info-assignment-section">
            <NavLink to="/admin/attendees">
              <button
                className="btn btn-delete"
                onClick={cleanUpPaymentIntentDetailSelect}
              >
                Back
              </button>
            </NavLink>
          </div>
          <div className="detail-user-info-assignment-section">
            {" "}
            <strong>Full Name: </strong>
            <span>
              {paymentIntentDetailSelected.user.name}{" "}
              {paymentIntentDetailSelected.user.lastName}
            </span>
          </div>
          <div className="detail-user-info-assignment-section">
            <strong>Email: </strong>
            <span> {paymentIntentDetailSelected.user.email}</span>
          </div>
          <div className="detail-user-info-assignment-section">
            <strong>Phone #: </strong>
            <span> {paymentIntentDetailSelected.user.phoneNumber}</span>
          </div>
          <div className="detail-user-info-assignment-section">
            {" "}
            <strong>Payment Intent ID: </strong>
            <span> {paymentIntentDetailSelected.paymentIntent}</span>
          </div>
          <div className="detail-user-info-assignment-section">
            {" "}
            <strong>Device Selected: </strong>
            <span> {paymentIntentDetailSelected.device}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
