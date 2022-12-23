import React, { useEffect, useState } from "react";
import { devitrackApi } from "../../apis/devitrackApi";
import "../../style/component/ui/Accordion.css";

export const Accordion = (item) => {
  const [receiversAssignedPerTransaction, setReceiversAssignedPerTransaction] =
    useState([]);
  let payIntId = Object.values(item);
  const retreiveData = async () => {
    try {
      const response = await devitrackApi.post("/receiver/receiver-assigned", {
        paymentIntent: payIntId.at(-1),
      });
      const data = await response?.data.receiver;
      if (data) {
        setReceiversAssignedPerTransaction(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    retreiveData();
  }, [payIntId.at(-1)]);

  const accumArray = new Map();
  const checkStatusOfEachReceiver = async () => {
    for (let i = 0; i < receiversAssignedPerTransaction.length; i++) {
      console.log(receiversAssignedPerTransaction[i].device);
      receiversAssignedPerTransaction[i].device.map((item) => {
        if (item.status === true) {
          return accumArray.set(item);
        }
      });
    }
  };
  checkStatusOfEachReceiver();
  return <div>{accumArray.size}</div>;
};
