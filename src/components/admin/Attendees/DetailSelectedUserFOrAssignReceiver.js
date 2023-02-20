import React from "react";
import { useSelector } from "react-redux";
import "../../../style/component/admin/receiversDetailsAssignation.css";
// import { PaymentIntentTemplate } from "./PaymentIntentTemplate";


/**

Component to display payment information for assigned payment receivers
@return {JSX.Element} The DetailSelectedUserFOrAssignReceiver component
*/
export const DetailSelectedUserFOrAssignReceiver = () => {
  const { paymentIntentReceiversAssigned } = useSelector(
    (state) => state.stripe
  );

  return (
    <>
      {paymentIntentReceiversAssigned?.map((user) => {
        let totalPending = {};

        for (let data of user.device) {
          if (data.status === false) {
            if (!totalPending[data.status]) {
              totalPending[data.status] = 1;
            } else {
              totalPending[data.status]++;
            }
          } else {
            if (!totalPending[data.status]) {
              totalPending[data.status] = 1;
            } else {
              totalPending[data.status]++;
            }
          }
        }

        return (
          <div className="container-payment-detail-assignment-section">
            <div className="payment-detail-assignment-section" key={user?.id}>
              <div className="detail-assignment-user-section">
                <div className="detail-user-info-assignment-section">
                  {" "}
                  <strong>Device Selected: </strong>
                  <span> {user?.device.length}</span>
                </div>
                <div className="detail-user-info-assignment-section">
                  {" "}
                  <strong>Device Assigned: </strong>
                  <span>{user?.device.length}</span>
                </div>
                <div className="detail-user-info-assignment-section">
                  <strong>Device Pending: </strong>
                  <span> {!totalPending.true ? "0" : totalPending.true}</span>
                </div>
                <div className="detail-user-info-assignment-section">
                  {" "}
                  <strong>Payment Intent ID: </strong>
                  <span> {user?.paymentIntent}</span>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};
