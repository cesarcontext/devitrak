import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import { devitrackApi } from "../../../apis/devitrackApi";
import { whatsappNotice } from "../../../helper/Notifications";
import "../../../style/pages/admin/attendees.css";

/**
 * Renders the PaymentIntentTemplate component.
 *
 * @function
 * @returns {JSX.Element}
 */
export const PaymentIntentTemplate = () => {
  const [dataListed, setDataListed] = useState([]);

  const {
    paymentIntentSelected,
    paymentIntentReceiversAssigned,
  } = useSelector((state) => state.stripe);

  
  /**
   * Calls the API to retrieve the payment intent with the specified ID.
   *
   * @async
   * @function
   * @returns {Promise<void>}
   */
  const callApiPaymentIntent = async () => {
    const response = await devitrackApi.get(
      `/stripe/payment_intents/${paymentIntentSelected}`
    );
    if (response) {
      setDataListed([response.data.paymentIntent]);
    }
  };

  useEffect(() => {
    callApiPaymentIntent();
  }, [paymentIntentSelected]);

  let totalPending = {};
  let totalDevice = "";

    /**
   * Calculates the total number of pending and completed devices for each user assigned to the payment intent.
   *
   * @function
   * @returns {void}
   */
  paymentIntentReceiversAssigned?.map((user, index) => {
    totalDevice = user.device.length;
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
  });

  return (
    <div className="container-stripe-transaction-per-user">
      <div>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Device Assigned</th>
              <th scope="col">Device Pending</th>
              <th scope="col">Payment Intent ID</th>
              <th scope="col">Credit Card Info</th>
              <th scope="col">CC MM/YYYY</th>
              <th scope="col">Authorized Amount</th>

              <th scope="col">Capture</th>
              <th scope="col">Cancel</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{!totalDevice ? "0" : totalDevice}</td>
              <td>{!totalPending.true ? "0" : totalPending.true}</td>
              <td>
                {!paymentIntentReceiversAssigned?.at(-1)?.paymentIntent
                  ? paymentIntentSelected
                  : paymentIntentReceiversAssigned?.at(-1)?.paymentIntent}
              </td>
              {dataListed?.map((data, index) => {
                if (
                  data.id === paymentIntentReceiversAssigned[0]?.paymentIntent
                ) {
                  return (
                    <>
                      <td>
                        {data.charges.data[0].payment_method_details.card.brand.toUpperCase()}
                        (*****
                        {data.charges.data[0].payment_method_details.card.last4}
                        )
                      </td>
                      <td>
                        {
                          data.charges.data[0].payment_method_details.card
                            .exp_month
                        }
                        /
                        {
                          data.charges.data[0].payment_method_details.card
                            .exp_year
                        }
                      </td>
                      <td style={{ backgroundColor: `${data.status}` }}>
                        ${data.amount_capturable / 100}
                      </td>

                      <td>
                        {data.amount_capturable / 20000 !== 0 ? (
                          <button
                            className="btn btn-create"
                            onClick={() => {
                              Swal.fire({
                                title: "",
                                text: "This amount will be captured!",
                                icon: "warning",
                                input: "text",
                                inputAttributes: {
                                  autocapitalize: "off",
                                  placeholder:
                                    `Max amount to capture: $ ${data.amount_authorized}`.slice(
                                      0,
                                      -2
                                    ),
                                },
                                showCancelButton: true,
                                confirmButtonColor: "#3085d6",
                                cancelButtonColor: "#d33",
                                confirmButtonText: "Capture authorized amount",
                                backdrop: "rgba(0,0,123,0.4)",
                                preConfirm: (amount) => {
                                  console.log("amount to capture", amount);
                                  const id = data.id;
                                  devitrackApi.post(
                                    `/stripe/payment-intents/${id}/capture`,
                                    { id, amount_to_capture: amount }
                                  );
                                },
                              })
                                .then((result) => {
                                  if (result.isConfirmed) {
                                    Swal.fire(
                                      "Captured!",
                                      "The authorized amount has been captured",
                                      "success"
                                    );
                                    whatsappNotice({

                                    })
                                    window.location.reload();
                                  }
                                })
                                .catch((error) => {
                                  console.log(error);
                                  Swal.fire(
                                    "error",
                                    "Capture transaction failed",
                                    "error"
                                  );
                                });
                            }}
                          >
                            Capture
                          </button>
                        ) : (
                          <button className="btn btn-create" disabled>
                            Capture
                          </button>
                        )}
                      </td>
                      <td>
                        {paymentIntentReceiversAssigned?.at(-1).device
                          .length !== 0 ? (
                          <>
                            <button
                              className="btn btn-delete"
                              style={{ backgroundColor: "red" }}
                              onClick={async () => {
                                Swal.fire({
                                  title: "Are you sure?",
                                  icon: "warning",
                                  showCancelButton: true,
                                  confirmButtonColor: "#3085d6",
                                  cancelButtonColor: "#d33",
                                  confirmButtonText: "Cancel Transaction",
                                  cancelButtonText: "Dismiss this prompt",
                                  backdrop: "rgba(0,0,123,0.4)",
                                }).then(async (result) => {
                                  if (result.isConfirmed) {
                                    const id = data.id;
                                    const action = await devitrackApi.post(
                                      `/stripe/payment-intents/${data.id}/cancel`,
                                      { id: id }
                                    );
                                    Swal.fire(
                                      "Cancelled!",
                                      "The authorized transaction has been cancelled",
                                      "success"
                                    );
                                    if (action) return window.location.reload();
                                  }
                                });
                              }}
                            >
                              Cancel
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              className="btn btn-delete"
                              disabled
                              style={{ backgroundColor: "red" }}
                            >
                              Cancel
                            </button>
                          </>
                        )}
                      </td>
                    </>
                  );
                }
              })}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
