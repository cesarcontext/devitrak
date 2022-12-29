import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import { devitrackApi } from "../../../apis/devitrackApi";
import "../../../style/pages/admin/attendees.css";

export const PaymentIntentTemplate = ({ sendPaymentIntentId }) => {
  const [dataListed, setDataListed] = useState(null);
  const { paymentIntentSelected } = useSelector((state) => state.stripe);

  useEffect(() => {
    devitrackApi
      .get("/stripe/payment-intents")
      .then((response) => response.data)
      .then((data) => setDataListed(data.paymentIntents.data));
  }, [sendPaymentIntentId]);

  return (
    <div className="container-stripe-transaction-per-user">
      <div>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Payment Intent ID</th>
              <th scope="col">Credit Card Info</th>
              <th scope="col">CC MM/YYYY</th>
              <th scope="col">Authorized Amount</th>
              <th scope="col">Device #</th>
              <th scope="col">Capture</th>
              <th scope="col">Cancel</th>
            </tr>
          </thead>
          {dataListed?.map((data, index) => {
            const device = data.amount_capturable / 20000;
            const amount_authorized = data.amount_capturable;
            if (data.id === paymentIntentSelected) {
              return (
                <tbody key={data.id}>
                  <tr>
                    <td>{data.id}</td>
                    <td>
                      {data.charges.data[0].payment_method_details.card.brand.toUpperCase()}{" "}
                      (*****
                      {data.charges.data[0].payment_method_details.card.last4})
                    </td>
                    <td>
                      {
                        data.charges.data[0].payment_method_details.card
                          .exp_month
                      }{" "}
                      /{" "}
                      {
                        data.charges.data[0].payment_method_details.card
                          .exp_year
                      }
                    </td>
                    <td style={{ backgroundColor: `${data.status}` }}>
                      ${amount_authorized / 100}
                    </td>
                    <td>{device}</td>
                    <td>
                      {device !== 0 ? (
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
                                  `Max amount to capture: $ ${amount_authorized}`.slice(
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
                          {" "}
                          Capture
                        </button>
                      ) : (
                        <button className="btn btn-create" disabled>
                          {" "}
                          Capture
                        </button>
                      )}
                    </td>
                    <td>
                      {device !== 0 ? (
                        <>
                          <button
                            className="btn btn-delete"
                            style={{ backgroundColor: "red" }}
                            onClick={() => {
                              Swal.fire({
                                title: "Are you sure?",
                                icon: "warning",
                                showCancelButton: true,
                                confirmButtonColor: "#3085d6",
                                cancelButtonColor: "#d33",
                                confirmButtonText: "Cancel Transaction",
                                cancelButtonText: "Dismiss this prompt",
                                backdrop: "rgba(0,0,123,0.4)",
                              }).then((result) => {
                                if (result.isConfirmed) {
                                  const id = data.id;
                                  devitrackApi.post(
                                    `/stripe/payment-intents/${data.id}/cancel`,
                                    { id: id }
                                  );
                                  Swal.fire(
                                    "Cancelled!",
                                    "The authorized transaction has been cancelled",
                                    "success"
                                  );
                                }
                              });
                            }}
                          >
                            Cancel
                          </button>{" "}
                        </>
                      ) : (
                        <>
                          <button
                            className="btn btn-delete"
                            disabled
                            style={{ backgroundColor: "red" }}
                          >
                            Cancel
                          </button>{" "}
                        </>
                      )}
                    </td>
                  </tr>
                </tbody>
              );
            }
          })}
        </table>
      </div>
    </div>
  );
};
