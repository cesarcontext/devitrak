import React, { useEffect, useState } from "react";
import { devitrackApi } from "../../../apis/devitrackApi";

export const DeviceUsersHistory = ({
  receiverId,
  receiverDetail,
  conditionReturned,
}) => {
  console.log(
    "🚀 ~ file: DeviceUsersHistory.js ~ line 5 ~ DeviceUsersHistory ~ conditionReturned",
    conditionReturned
  );
  const [listOfReceiverAssigned, setListOfReceiverAssigned] = useState([]);
  const [usersPerDevice, setUsersPerDevice] = useState([]);
  const [listReceiverReturnedByIssue, setListReceiverReturnedByIssue] =
    useState([]);
  const callApiListOfReceiverAssigned = async () => {
    const response = await devitrackApi.get("/receiver/receiver-assigned-list");
    if (response) {
      setListOfReceiverAssigned(response.data.listOfReceivers);
    }
  };

  const checkingUsersInHistory = async () => {
    const usersPerDevice = [];
    listOfReceiverAssigned?.map((data) => {
      data.device.map((device) => {
        if (device.serialNumber === receiverDetail) {
          usersPerDevice.unshift(data.user);
        }
      });
    });
    setUsersPerDevice(usersPerDevice);
  };

  const callApiReceierReturnedByIssue = async () => {
    const response = await devitrackApi.get(
      "/receiver/list-receiver-returned-issue"
    );
    if (response) {
      setListReceiverReturnedByIssue(response.data.record);
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    callApiListOfReceiverAssigned();
    callApiReceierReturnedByIssue();
    return () => {
      controller.abort();
    };
  }, [receiverId]);

  useEffect(() => {
    const controller = new AbortController();
    checkingUsersInHistory();
    return () => {
      controller.abort();
    };
  }, [receiverId]);

  return (
    <div>
      <div>
        <div></div>
        <label>Receiver Users History</label>
      </div>
      <div>
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th scope="col">User</th>
            </tr>
          </thead>
          <tbody>
            {conditionReturned === null
              ? usersPerDevice?.map((user, index) => {
                  return (
                    <tr>
                      <td>{index + 1}</td>
                      <td scope="col">{user}</td>
                    </tr>
                  );
                })
              : listReceiverReturnedByIssue?.map((receiver, index) => {
                  if(conditionReturned === receiver.device){
                    return (
                      <tr>
                        <td>{index + 1}</td>
                        <td scope="col">{receiver.user}</td>
                      </tr>
                    );
                  }
                })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
