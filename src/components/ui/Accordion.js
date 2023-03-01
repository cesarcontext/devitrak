import React, { useEffect, useState } from "react";
import { devitrackApi } from "../../apis/devitrackApi";
import "../../style/component/ui/Accordion.css";


/**
 * Accordion
 * @description function to sort data and return Map size to show customer how many pending receivers transaction has
 * @param {Object} item 
 * @returns {Number}
 */
export const Accordion = (item) => {
  const [receiversAssignedPerTransaction, setReceiversAssignedPerTransaction] =
    useState([]);

    /**
     * payIntId - substract the value of the object Item
     * @type {Array}
     * @returns {Array}
     */
  let payIntId = Object.values(item);

  /**
   * retrieveData - function to check receivers assigned per transaction 
   * @returns {Promise}
   */
  const retrieveData = async () => {
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
    retrieveData();
  }, [payIntId.at(-1)]);

  const accumArray = new Map();

  /**
   * checkStatusOfEachReceiver
   * @description function to check which device of the transaction is active/inactive
   * @returns {Map} 
   */
  const checkStatusOfEachReceiver = async () => {
    for (let i = 0; i < receiversAssignedPerTransaction.length; i++) {
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
