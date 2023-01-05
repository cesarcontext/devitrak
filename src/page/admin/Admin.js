import { useInterval } from "interval-hooks";
import { useEffect, useState } from "react";
import { devitrackApi } from "../../apis/devitrackApi";
import { Navbar } from "../../components/admin/ui/Navbar";
import "../../style/pages/admin/admin.css";

export const Admin = () => {
  const [listOfReceiver, setListOfReceiver] = useState([]);
  const [listOfReceiverAssigned, setListOfReceiverAssigned] = useState([]);
  const [usersPerDevice, setUsersPerDevice] = useState([]);
  const [listReceiverReturnedByIssue, setListReceiverReturnedByIssue] =
    useState([]);

  let dataMerged = {
    ...listOfReceiver,
    ...listOfReceiverAssigned,
  };

  const callApi = async () => {
    const response = await devitrackApi.get("/receiver/receiver-pool-list");
    if (response) {
      setListOfReceiver(response.data.receiversInventory);
    }
  };
  const callApiDamage = async () => {
    const response = await devitrackApi.get("/receiver/receiver-assigned-list");
    if (response) {
      setListOfReceiverAssigned(response.data.listOfReceivers);
    }
  };
  const callApiReceierReturnedByIssue = async () => {
    const response = await devitrackApi.get(
      "/receiver/list-receiver-returned-issue"
    );
    if (response) {
      setListReceiverReturnedByIssue(response.data.record);
    }
  };
  console.log(
    "🚀 ~ file: Admin.js:15 ~ Admin ~ listReceiverReturnedByIssue",
    listReceiverReturnedByIssue
  );
  console.log(
    "🚀 ~ file: Admin.js:13 ~ Admin ~ usersPerDevice",
    usersPerDevice
  );
  console.log(
    "🚀 ~ file: Admin.js:11 ~ Admin ~ listOfReceiverAssigned",
    listOfReceiverAssigned
  );
  console.log("🚀 ~ file: Admin.js:9 ~ Admin ~ listOfReceiver", listOfReceiver);

  useEffect(() => {
    callApi();
    callApiDamage();
    callApiReceierReturnedByIssue();
    setTimeout(() => {
      checkingUsersInHistory();
    }, 3000);
  }, []);

  const checkingUsersInHistory = async () => {
    const usersPerDevice = [];
    for (let data of listReceiverReturnedByIssue) {
      for (let node of listOfReceiver) {
        if (data.device === node.device) {
          usersPerDevice.push({
            data,
          });
        }
      }
    }

    setUsersPerDevice(usersPerDevice);
  };

  return (
    <div>
      <Navbar />
      <h3>Home Page</h3>
    </div>
  );
};
