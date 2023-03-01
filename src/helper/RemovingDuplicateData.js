import { useEffect, useState } from "react";
import { devitrackApi, devitrackApiStripe } from "../apis/devitrackApi";

export const RemovingDuplicateData = () => {
  const [data, setData] = useState([]);
  console.log(
    "🚀 ~ file: RemovingDuplicateData.js ~ line 5 ~ RemovingDuplicateData ~ data",
    data
  );
  const callApiStripeTransaction = async () => {
    const response = await devitrackApi.get("/admin/users");
    if (response) {
      setData(response.data);
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    callApiStripeTransaction();
    return () => {
      controller.abort();
    };
  }, []);
  const removingDuplicate = async () => {
    const reference = {};
    if (data !== []) {
      for (let i = 0; i < data.length; i++) {
        if (!reference[data[i].paymentIntent]) {
          reference[data[i].paymentIntent] = data[i].id;
        } else {
          devitrackApiStripe.delete(`/remove-duplicate/${data[i].id}`);
        }
      }
    }
  };
  return removingDuplicate
};
