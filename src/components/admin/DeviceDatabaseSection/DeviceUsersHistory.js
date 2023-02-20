import React, { useEffect, useState } from "react";
import { devitrackApi } from "../../../apis/devitrackApi";
import "../../../style/component/admin/DeviceDatabase.css";

/**
 * A component that displays device users history for a given receiver.
 * @param {Object} props - The component props.
 * @param {string} props.receiverId - The id of the receiver.
 * @param {string} props.receiverDetail - The detail of the receiver.
 * @param {string} props.conditionReturned - The condition of the device returned.
 * @returns {JSX.Element} React component with device users history.
 */
export const DeviceUsersHistory = ({
  receiverId,
  receiverDetail,
  conditionReturned,
}) => {

  const [listOfReceiverAssigned, setListOfReceiverAssigned] = useState([]);
  const [usersPerDevice, setUsersPerDevice] = useState([]);
  const [listReceiverReturnedByIssue, setListReceiverReturnedByIssue] =
    useState([]);

     /**
   * Calls the API to get the list of receiver assigned.
   */
  const callApiListOfReceiverAssigned = async () => {
    const response = await devitrackApi.get("/receiver/receiver-assigned-list");
    if (response) {
      setListOfReceiverAssigned(response.data.listOfReceivers);
    }
  };

   /**
   * Checks users in the history and sets usersPerDevice state.
   */
  const checkingUsersInHistory = async () => {
    const usersPerDevice = [];
    listOfReceiverAssigned?.map((data) => {
      data.device.map((device) => {
        if (device.serialNumber === receiverDetail) {
          usersPerDevice.unshift([{user: data.user, paymentIntent:data.paymentIntent}]);
        }
      });
    });
    setUsersPerDevice(usersPerDevice);
  };

    /**
   * Calls the API to get the list of receiver returned by issue.
   */
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
    <div className="device-user-history-container">
      <table className="table table-device-user-history">
        <thead>
          <tr>
            <th scope="col">User</th>
          </tr>
          {/* <button>RETURN</button> */}
        </thead>
        <tbody>
          {conditionReturned === null
            ? usersPerDevice?.map((user, index) => {
                return (
                  <tr>
                    <td scope="col">{user[index]?.user}</td>
                  </tr>
                );
              })
            : listReceiverReturnedByIssue?.map((receiver, index) => {
                if (conditionReturned === receiver.device) {
                  return (
                    <tr>
                      <td scope="col">{receiver.user}</td>
                    </tr>
                  );
                }
              })}
        </tbody>
      </table>
    </div>
  );
};
