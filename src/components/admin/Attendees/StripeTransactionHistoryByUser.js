import { abort } from "process";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { devitrackApi } from "../../../apis/devitrackApi";
import {
  onAddPaymentIntentDetailSelected,
  onAddPaymentIntentSelected,
} from "../../../store/slices/stripeSlice";
import "../../../style/component/admin/stripeTransactionHistoryByUser.css";
import "../../../style/component/ui/paginate.css";

/**

Displays the Stripe transaction history of a specific user.
@function
@returns {JSX.Element} - Rendered component.
*/
export const StripeTransactionHistoryByUser = () => {
  const [stripeTransactions, setStripeTransactions] = useState();
  const user_url = window.location.pathname.split("/").at(-1);
  const user_detail_id = user_url.split(":").at(-1);

  const dispatch = useDispatch();

  /**

Calls the API to retrieve the Stripe transaction history of all users.
@async
@function
*/
  const callApiStripeTransaction = async () => {
    const response = await devitrackApi.get("/admin/users");
    if (response) {
      setStripeTransactions(response.data.stripeTransactions);
    }
  };

  /**

Calls the API to retrieve the Stripe transaction history of all users when
the component is mounted.
@effect
@function
*/
  useEffect(() => {
    const controller = new AbortController();
    callApiStripeTransaction();
    return () => {
      controller.abort();
    };
  }, []);

  let userTransaction = [];

  /**

Retrieves and sets the Stripe transaction history for the current user.
@async
@function
*/
  const substractUserTransactionsOnly = async () => {
    let index = 0;
    if (stripeTransactions !== []) {
      stripeTransactions?.map((transaction) => {
        if (transaction.user?._id === user_detail_id) {
          userTransaction.splice(index, 0, transaction);
          index++;
        }
      });
    }
  };
  substractUserTransactionsOnly();

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
          {userTransaction?.map((transaction) => {
            const amount = transaction.device * 200;
            return (
              <tbody key={transaction.id}>
                <tr>
                  <td>{transaction.paymentIntent.slice(0, 27)}</td>
                  <td>{transaction.device}</td>
                  <td>${amount}</td>
                  <td>
                    <button
                      className="btn btn-detail"
                      onClick={async () => {
                        dispatch(
                          onAddPaymentIntentSelected(transaction.paymentIntent)
                        );
                        dispatch(onAddPaymentIntentDetailSelected(transaction));
                      }}
                    >
                      Details
                    </button>
                  </td>
                </tr>
              </tbody>
            );
          })}
        </table>
      </div>
    </div>
  );
};
