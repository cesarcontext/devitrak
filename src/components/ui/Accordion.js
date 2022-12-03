import React, { useEffect, useState } from "react";
import { devitrackApi } from "../../apis/devitrackApi";
import "../../style/component/ui/Accordion.css";

export const Accordion = (item) => {
  const [loading, setLoading] = useState(false);
  const [paymentToCheck, setPaymentToCheck] = useState(null);
  const [receiversAssignedPerTransaction, setReceiversAssignedPerTransaction] =
    useState(null);

  useEffect(() => {
    if (item.item.paymentIntent) {
      setPaymentToCheck(item.item.paymentIntent);
    }
  }, [item.item.paymentIntent]);

  const retreiveData = async () => {
    try {
      const response = await devitrackApi.post("/receiver/receiver-assigned", {
        paymentIntent: paymentToCheck,
      });
      const data = await response?.data.receiver;
      if (data) {
        setReceiversAssignedPerTransaction(data);
        setLoading(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    retreiveData();
  }, [paymentToCheck]);

  const accumArray = new Map();

  const checkStatusOfEachReceiver = async () => {
    receiversAssignedPerTransaction?.map((receiver) => {
      receiver.device.map((item) => {
        if (item.status === true) {
          accumArray.set(item);
        }
      });
    });
  };
  checkStatusOfEachReceiver()
  return (
    <div>
      {loading !== false ? accumArray.size : null}
    </div>
  );
};
