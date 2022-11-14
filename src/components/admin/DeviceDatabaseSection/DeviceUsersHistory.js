import React, { useEffect, useState } from "react";
import { devitrackApi } from "../../../apis/devitrackApi";

export const DeviceUsersHistory = ({ receiverId, receiverDetail }) => {
  const [listOfReceiverAssigned, setListOfReceiverAssigned] = useState([]);
  const [usersPerDevice, setUsersPerDevice] = useState([]);
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

  useEffect(() => {
    const controller = new AbortController();
    callApiListOfReceiverAssigned();
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
            {usersPerDevice?.map((user, index) => {
              console.log("users mapped", user);
              return (
                <tr>
                  <td>{index + 1}</td>
                  <td scope="col">{user}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
