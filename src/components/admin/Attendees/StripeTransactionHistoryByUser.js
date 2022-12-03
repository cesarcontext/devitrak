import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { devitrackApi } from "../../../apis/devitrackApi";
import {
  onAddPaymentIntentDetailSelected,
  onAddPaymentIntentSelected,
} from "../../../store/slices/stripeSlice";
import "../../../style/component/admin/stripeTransactionHistoryByUser.css";
import { Pagination } from "../ui/Pagination";

export const StripeTransactionHistoryByUser = ({
  sendObjectIdUser,
  userDetail,
  createTransactionForNoRegularUser,
}) => {
  const [stripeTransactions, setStripeTransactions] = useState();
  const [paymentIntentId, setSendPaymentIntentId] = useState();
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(0);
  const [stripeTransactionsRenderedPerPage] = useState(2);

  const callApiStripeTransaction = async () => {
    const response = await devitrackApi.get("/admin/users");
    if (response) {
      setStripeTransactions(response.data.stripeTransactions);
    }
  };
  useEffect(() => {
    const controller = new AbortController();
    callApiStripeTransaction();
    return () => {
      controller.abort();
    };
  }, [sendObjectIdUser, createTransactionForNoRegularUser]);

  let userTransaction = [];
  const substractUserTransactionsOnly = async () => {
    if (stripeTransactions !== []) {
      stripeTransactions?.map((transaction, index) => {
        if (transaction.user._id === sendObjectIdUser) {
          userTransaction.splice(index, 0, transaction);
        }
      });
    }
  };
  substractUserTransactionsOnly();

  const indexOfLastStripeTransactionRendered =
    currentPage * stripeTransactionsRenderedPerPage;
  const indexOfFirstStripeTransactionRendered =
    indexOfLastStripeTransactionRendered - stripeTransactionsRenderedPerPage;
  const currentStripeTransactionRendered = userTransaction?.slice(
    indexOfFirstStripeTransactionRendered,
    indexOfLastStripeTransactionRendered
  );
  const paginate = (pageNumbers) => {
    setCurrentPage(pageNumbers);
  };
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
          {currentStripeTransactionRendered?.map((transaction) => {
            const amount = transaction.device * 200;
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
                      className="btn btn-detail"
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
                        className="btn btn-detail"
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
                      </NavLink>
                    )}
                  </td>
                </tr>
              </tbody>
            );
          })}
        </table>
        <div>
          <Pagination
            childrenRenderedPerPage={stripeTransactionsRenderedPerPage}
            totalChildren={userTransaction.length}
            paginate={paginate}
          />
        </div>
      </div>
    </div>
  );
};
