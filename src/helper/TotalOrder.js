import { useEffect, useState } from "react";
import { devitrackApiStripe } from "../apis/devitrackApi";
import { useContactInfoStore } from "../hooks/useContactInfoStore";

export const TotalOrder = () => {
  const { users } = useContactInfoStore();
  const [receiverData, setReceiverData] = useState([]);
  const [triggerState, setTriggerState] = useState(true)
  const callStripePaymentIntentApi = async () => {
    const response = await devitrackApiStripe.get("/payment-intents");
    if (response) {
      setReceiverData(response.data.paymentIntents.data);
    }
  };
  let totalCurrentOrden = 0;
  let totalCurrentDevice = 0;

  useEffect(() => {
    const controller = new AbortController();
    callStripePaymentIntentApi();
    return () => {
      controller.abort();
    };
  }, [triggerState]);

  for (let i = 0; i < receiverData.length; i++) {
    if (
      users.email === receiverData[i].receipt_email &&
      receiverData[i].status === "requires_capture"
    ) {
      totalCurrentOrden += receiverData[i].amount;
    }
  }
  totalCurrentDevice = totalCurrentOrden / 20000;
  const result = {
    order: totalCurrentOrden / 100,
    device: totalCurrentDevice,
  };

  return result;
};
