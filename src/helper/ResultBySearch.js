import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { devitrackApi } from "../apis/devitrackApi";
import {
  onAddPaymentIntentDetailSelected,
  onAddPaymentIntentSelected,
} from "../store/slices/stripeSlice";

export const ResultBySearch = ({ searchTerm }) => {
  const [receiversList, setReceiversList] = useState([]);
  const [stripeTransactions, setStripeTransactions] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
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
      for (let data of receiversList) {
        for (let i = 0; i < data.device.length; i++) {
          if (data.device[i].serialNumber === searchTerm) {
            for (let transaction of stripeTransactions) {
              if (data.paymentIntent === transaction.paymentIntent) {
                dispatch(onAddPaymentIntentSelected(transaction.paymentIntent));
                dispatch(onAddPaymentIntentDetailSelected(transaction));
                navigate("/attendees/receiver_assignation");
              } else {
                <h4>NO DATA FOUND</h4>;
              }
            }
          }
        }
      }
    }
    // if (auxParameter !== "") {
    //   for (let data of stripeTransactions) {
    //     if (auxParameter === data.paymentIntent) {
    //       dispatch(onAddPaymentIntentSelected(data.paymentIntent));
    //       dispatch(onAddPaymentIntentDetailSelected(data));
    //       navigate("/attendees/receiver_assignation");
    //     } else {
    //       <h4>NO DATA FOUND</h4>;
    //     }
    //   }
    // }
    if (searchTerm[0].match(/[a-zA-Z]/)) {
      for (let data of stripeTransactions) {
        if (searchTerm === data.paymentIntent) {
          dispatch(onAddPaymentIntentSelected(data.paymentIntent));
          dispatch(onAddPaymentIntentDetailSelected(data));
          navigate("/attendees/receiver_assignation");
        } else {
          <h4>NO DATA FOUND</h4>;
        }
      }
    }
  }
};
