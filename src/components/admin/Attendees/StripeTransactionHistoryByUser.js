import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { devitrackApi } from "../../../apis/devitrackApi";
import {
  onAddPaymentIntentDetailSelected,
  onAddPaymentIntentSelected,
} from "../../../store/slices/stripeSlice";
import "../../../style/component/admin/stripeTransactionHistoryByUser.css";

export const StripeTransactionHistoryByUser = ({
  sendObjectIdUser,
  userDetail,
  createTransactionForNoRegularUser,
}) => {
  const [stripeTransactions, setStripeTransactions] = useState();
  const [paymentIntentId, setSendPaymentIntentId] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    const controller = new AbortController();
    devitrackApi
      .get("/admin/users")
      .then((response) => response.data)
      .then((data) => setStripeTransactions(data.stripeTransactions));
    return () => {
      controller.abort();
    };
  }, [sendObjectIdUser, createTransactionForNoRegularUser]);

  return (
    <div className="container-stripe-transaction">
      <div>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Payment Intent ID</th>
              <th scope="col">Device</th>
              <th scope="col">Deposit</th>
              <th scope="col">Details</th>
            </tr>
          </thead>
          {stripeTransactions?.map((transaction) => {
            const amount = transaction.device * 200;
            if (transaction?.user?._id !== null) {
              if (transaction?.user?._id === sendObjectIdUser) {
                return (
                  <tbody key={transaction.id}>
                    <tr>
                      <td>{transaction.paymentIntent}</td>
                      <td>{transaction.device}</td>
                      {userDetail !== "No-regular" ? (
                        <td>${amount}</td>
                      ) : (
                        <td style={{ textDecoration: "line-through" }}>
                          ${amount}
                        </td>
                      )}
                      <td>
                        {transaction.paymentIntent[0] === "p" ? (
                          <button
                            onClick={async () => {
                              setSendPaymentIntentId(transaction.paymentIntent);
                              dispatch(
                                onAddPaymentIntentSelected(
                                  transaction.paymentIntent
                                )
                              );
                              dispatch(
                                onAddPaymentIntentDetailSelected(transaction)
                              );
                            }}
                          >
                            Details
                          </button>
                        ) : (
                          <NavLink to="/admin/attendees/receiver_assignation">
                            <button
                              onClick={async () => {
                                setSendPaymentIntentId(
                                  transaction.paymentIntent
                                );
                                dispatch(
                                  onAddPaymentIntentSelected(
                                    transaction.paymentIntent
                                  )
                                );
                                dispatch(
                                  onAddPaymentIntentDetailSelected(transaction)
                                );
                              }}
                            >
                              Details 
                            </button>
                          </NavLink>
                        )}
                      </td>
                    </tr>
                  </tbody>
                );
              }
            } else {
              <h5>No data displayed</h5>;
            }
          })}
        </table>
      </div>
    </div>
  );
};
