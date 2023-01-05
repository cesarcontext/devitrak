import { useInterval } from "interval-hooks";
import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { devitrackApi } from "../../../apis/devitrackApi";
import {
  onAddPaymentIntentDetailSelected,
  onAddPaymentIntentSelected,
} from "../../../store/slices/stripeSlice";
import "../../../style/component/admin/stripeTransactionHistoryByUser.css";
import "../../../style/component/ui/paginate.css";

export const StripeTransactionHistoryByUser = ({
  sendObjectIdUser,
  createTransactionForNoRegularUser,
  
}) => {
  const [stripeTransactions, setStripeTransactions] = useState();
  const [paymentIntentId, setSendPaymentIntentId] = useState("");
  const [currentItemsRendered, setCurrentItemsRendered] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 2;

  const dispatch = useDispatch();

  const callApiStripeTransaction = async () => {
    const response = await devitrackApi.get("/admin/users");
    if (response) {
      setStripeTransactions(response.data.stripeTransactions);
    }
  };
  useEffect(() => {
    callApiStripeTransaction();
  }, [sendObjectIdUser, createTransactionForNoRegularUser]);

  let userTransaction = [];
  const substractUserTransactionsOnly = async () => {
    if (stripeTransactions !== []) {
      stripeTransactions?.map((transaction, index) => {        
        if (transaction.user?._id === sendObjectIdUser) {
          return userTransaction.splice(index, 0, transaction);
        }
      });
    }
  };
  substractUserTransactionsOnly();

  useInterval(async () => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItemsRendered(userTransaction.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(userTransaction.length / itemsPerPage));
  }, 2_00);

  const handlePageClick = (event) => {
    const newOffset =
      (event.selected * itemsPerPage) % stripeTransactions.length;
    setItemOffset(newOffset);
  };

  return (
    <div className="container-stripe-transaction">
      <div>
        <table className="table">
          <caption>
            <ReactPaginate
              breakLabel="..."
              nextLabel="next >"
              onPageChange={handlePageClick}
              pageRangeDisplayed={2}
              pageCount={pageCount}
              previousLabel="< previous"
              renderOnZeroPageCount={null}
              containerClassName="pagination"
              pageLinkClassName="page-num"
              previousLinkClassName="page-num"
              nextLinkClassName="page-num"
              activeLinkClassName="tab-active"
            />
          </caption>
          <thead>
            <tr>
              <th scope="col">Payment Intent ID</th>
              <th scope="col">Device</th>
              <th scope="col">Deposit</th>
              <th scope="col">Details</th>
            </tr>
          </thead>
          {currentItemsRendered?.map((transaction) => {
            const amount = transaction.device * 200;
            return (
              <tbody key={transaction.id}>
                <tr>
                  <td>{transaction.paymentIntent.slice(0, 27)}</td>
                  <td>{transaction.device}</td>
                  <td>${amount}</td>
                  <td>
                    <NavLink to="/attendees/receiver_assignation">
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
                    </NavLink>{" "}
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
