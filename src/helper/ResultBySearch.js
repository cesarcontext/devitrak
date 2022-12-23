import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { devitrackApi } from "../apis/devitrackApi";
import { onAddPaymentIntentDetailSelected, onAddPaymentIntentSelected } from "../store/slices/stripeSlice";

export const ResultBySearch = ({ searchTerm }) => {
  const [receiversList, setReceiversList] = useState([]);
  const [stripeTransactions, setStripeTransactions] = useState([]);
  const navigate = useNavigate()
  const dispatch = useDispatch()
  let result;
  let auxParameter = "";

  const callApiStripeTransaction = async () => {
    const response = await devitrackApi.get("/admin/users");
    if (response) {
      setStripeTransactions(response.data.stripeTransactions);
    }
  };
  const callApiReceiverAssigned = async () => {
    const response = await devitrackApi.get("/receiver/receiver-assigned-list");
    if (response) {
      setReceiversList(response.data.listOfReceivers);
    }
  };
  useEffect(() => {
    callApiStripeTransaction();
    callApiReceiverAssigned();
  }, [searchTerm]);

  if (searchTerm) {
    if (searchTerm[0].match(/[0-9]/)) {
      receiversList.map((item) => {
        for (let i = 0; i < item.device.length; i++) {
          if (
            item.device[i].serialNumber == searchTerm &&
            item.device[i].status === true
          ) {
            return (auxParameter = item.paymentIntent);
          }
        }
      });
    }
    if (auxParameter !== "") {
      stripeTransactions.map((transaction) => {
        if (auxParameter === transaction.paymentIntent) {
            dispatch(
                onAddPaymentIntentSelected(
                  transaction.paymentIntent
                )
              );
              dispatch(
                onAddPaymentIntentDetailSelected(transaction)
              );
              navigate("/admin/attendees/receiver_assignation")
        }
      });
    }
    if (searchTerm[0].match(/[a-zA-Z]/)) {
      stripeTransactions.map((transaction) => {
        if (searchTerm === transaction.paymentIntent) {
            dispatch(
                onAddPaymentIntentSelected(
                  transaction.paymentIntent
                )
              );
              dispatch(
                onAddPaymentIntentDetailSelected(transaction)
              );
              navigate("/admin/attendees/receiver_assignation")
        }
      });
    }
  }
};
