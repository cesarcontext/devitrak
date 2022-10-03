import React, { useEffect, useState } from "react";
import { devitrackApi } from "../../../apis/devitrackApi";
import { PaymentIntentTemplate } from "./PaymentIntentTemplate";

export const StripeTransactionHistoryByUser = ({ sendObjectIdUser }) => {
  const [stripeTransactions, setStripeTransactions] = useState();
  const [sendPaymentIntentId, setSendPaymentIntentId] = useState();

  useEffect(() => {
    devitrackApi
      .get("/admin/users")
      .then((response) => response.data)
      .then((data) => setStripeTransactions(data.stripeTransactions));
  }, [sendObjectIdUser]);

  useEffect(() => {
    console.log(stripeTransactions);
  }, [sendPaymentIntentId]);

  return (
    <div style={{
        width:"100%"
    }}>
      <div>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Payment Intent ID</th>
              <th scope="col">Device</th>
              <th scope="col">Authorized Amount</th>
              <th scope="col">Details</th>
            </tr>
          </thead>
          {stripeTransactions?.map((transaction, item) => {
            const amount = transaction.device * 200;
            if (transaction.user._id === sendObjectIdUser) {
              return (
                <tbody key={transaction.id}>
                  <tr>
                    <th scope="row">{item + 1}</th>
                    <td>{transaction.paymentIntent}</td>
                    <td>{transaction.device}</td>
                    <td>${amount}</td>
                    <td>
                      <button
                        onClick={() => {
                          setSendPaymentIntentId(transaction.paymentIntent);
                          console.log(transaction.id);
                        }}
                      >
                        Details <i className="bi bi-caret-right" />{" "}
                      </button>
                    </td>
                  </tr>
                </tbody>
              );
            }
          })}
        </table>
      </div>
      <div style={{ display: "none" }}>
        <PaymentIntentTemplate sendPaymentIntentId={sendPaymentIntentId} />
      </div>
    </div>
  );
};
