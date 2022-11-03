import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { devitrackApi } from "../../../apis/devitrackApi";
import {
  onAddPaymentIntentDetailSelected,
  onAddPaymentIntentSelected,
} from "../../../store/slices/stripeSlice";

export const StripeTransactionHistoryByUser = ({ sendObjectIdUser }) => {
  const [stripeTransactions, setStripeTransactions] = useState();
  const [paymentIntentId, setSendPaymentIntentId] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [paymentIntentRenderedPerPage] = useState(4);
  const [paymentIntentPerUserId, setPaymentIntentPerUserId] = useState([]);

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
  }, [sendObjectIdUser]);

  console.log(paymentIntentPerUserId);
  return (
    <div
      style={{
        width: "100%",
      }}
    >
      <div>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Date</th>
              <th scope="col">Payment Intent ID</th>
              <th scope="col">Device</th>
              <th scope="col">Authorized Amount</th>
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
                      <th scope="row">{transaction.created}</th>
                      <td>{transaction.paymentIntent}</td>
                      <td>{transaction.device}</td>
                      <td>${amount}</td>
                      <td>
                        <button
                          onClick={async () => {
                            await setSendPaymentIntentId(
                              transaction.paymentIntent
                            );
                            await dispatch(
                              onAddPaymentIntentSelected(
                                transaction.paymentIntent
                              )
                            );
                            await dispatch(
                              onAddPaymentIntentDetailSelected(transaction)
                            );
                          }}
                        >
                          Details <i className="bi bi-caret-right" />{" "}
                        </button>
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
      {/* <div>
        <Pagination
          childrenRenderedPerPage={paymentIntentRenderedPerPage}
          totalChildren={users.length}
          paginate={paginate}
        />
      </div> */}
    </div>
  );
};
