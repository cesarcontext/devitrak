import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import Swal from "sweetalert2";
import { devitrackApi } from "../../../apis/devitrackApi";
import "../../../style/pages/admin/attendees.css";

export const PaymentIntentTemplate = ({ sendPaymentIntentId }) => {
  const [dataListed, setDataListed] = useState(null);
  const [selection, setSelection] = useState("");
  const { paymentIntentSelected } = useSelector((state) => state.stripe);
  const [amountToCapture, setAmountToCapture] = useState("");

  useEffect(() => {
    devitrackApi
      .get("/stripe/payment-intents")
      .then((response) => response.data)
      .then((data) => setDataListed(data.paymentIntents.data));
  }, [sendPaymentIntentId]);

  const receiversArray = (n) => {
    const array = new Array(n);
    return array;
  };
  return (
    <div
      style={{
        width: "96%",
        margin: "0 auto",
        marginBottom: "3%",
        border: "solid 2px #212529",
        borderRadius: "15px",
        padding: "40px",
      }}
    >
      <div
        style={{
          width: "10%",
          position: "relative",
          right: "0",
        }}
      >
        <select
          className="form-select form-select-sm"
          aria-label=".form-select-sm example"
        >
          <option defaultValue="filter">Filter</option>
          <option
            onClick={() => setSelection("requires_capture")}
            value="requires_capture"
          >
            Requires captured
          </option>
          <option onClick={() => setSelection("succeeded")} value="suceeded">
            Captured
          </option>
          <option onClick={() => setSelection("canceled")} value="canceled">
            Cancelled
          </option>
        </select>
      </div>
      <div>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Status</th>
              <th scope="col">Payment Intent ID</th>
              <th scope="col">Credit Card Info</th>
              <th scope="col">CC MM/YYYY</th>
              <th scope="col">Authorized Amount</th>
              <th scope="col">Device #</th>
              <th scope="col">Capture</th>
              <th scope="col">Cancel</th>
              <th scope="col">Date</th>
            </tr>
          </thead>
          {dataListed?.map((index) => {
            const device = index.amount_capturable / 20000;
            const amount_authorized = index.amount_capturable;
            const date = index.created;
            if (index.id === paymentIntentSelected) {
              return (
                <tbody key={index.id}>
                  <tr>
                    <th scope="row">
                      {device !== 0 ? (
                        <NavLink to="/admin/attendees/receiver_assignation">
                          <button style={{ width: "90%", padding: "5px" }}>
                            Assign Device
                          </button>
                        </NavLink>
                      ) : (
                        <div
                          style={{ backgroundColor: "#212529", color: "#fff" }}
                        >
                          <h4>{index.status.toUpperCase()}</h4>
                        </div>
                      )}
                    </th>
                    <td>{index.id}</td>
                    <td>
                      {index.charges.data[0].payment_method_details.card.brand.toUpperCase()}{" "}
                      (*****
                      {index.charges.data[0].payment_method_details.card.last4})
                    </td>
                    <td>
                      {
                        index.charges.data[0].payment_method_details.card
                          .exp_month
                      }{" "}
                      /{" "}
                      {
                        index.charges.data[0].payment_method_details.card
                          .exp_year
                      }
                    </td>
                    <td style={{ backgroundColor: `${index.status}` }}>
                      ${amount_authorized / 100}
                    </td>
                    <td>{device}</td>
                    <td>
                      {device !== 0 ? (
                        <button
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
                                console.log(
                                    "amount to capture",
                                    amount
                                  );
                                  const id = index.id;
                                   devitrackApi.post(
                                    `/stripe/payment-intents/${id}/capture`,
                                    {id, amount_to_capture: amount }
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
                        <button
                          disabled
                          onClick={() => {
                            Swal.fire({
                              title: "",
                              text: "The amount submitted will be captured!",
                              icon: "warning",
                              showCancelButton: true,
                              confirmButtonColor: "#3085d6",
                              cancelButtonColor: "#d33",
                              confirmButtonText: "Capture authorized amount",
                              backdrop: "rgba(0,0,123,0.4)",
                              input: "number",
                              inputAttributes: {
                                autocapitalize: "off",
                                placeholder:
                                  `Max amount to capture: $${index.amount_capturable}`.slice(
                                    0,
                                    -2
                                  ),
                              },
                            }).then((result) => {
                              if (result.isConfirmed) {
                                const id = index.id;
                                devitrackApi.post(
                                  `/stripe/payment-intents/${index.id}/capture`,
                                  { id: id }
                                );
                                Swal.fire(
                                  "Captured!",
                                  "The authorized amount has been captured",
                                  "success"
                                );
                              }
                            });
                          }}
                        >
                          {" "}
                          Capture
                        </button>
                      )}
                    </td>
                    <td>
                      {device !== 0 ? (
                        <>
                          <button
                            style={{ backgroundColor: "red" }}
                            onClick={() => {
                              Swal.fire({
                                title: "Are you sure?",
                                icon: "warning",
                                showCancelButton: true,
                                confirmButtonColor: "#3085d6",
                                cancelButtonColor: "#d33",
                                confirmButtonText: "Cancel authorized amount",
                                backdrop: "rgba(0,0,123,0.4)",
                              }).then((result) => {
                                if (result.isConfirmed) {
                                  const id = index.id;
                                  devitrackApi.post(
                                    `/stripe/payment-intents/${index.id}/cancel`,
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
                            disabled
                            style={{ backgroundColor: "red" }}
                            onClick={() => {
                              Swal.fire({
                                title: "Are you sure?",
                                text: "Transacrtion will be cancelled!",
                                icon: "warning",
                                showCancelButton: true,
                                confirmButtonColor: "#3085d6",
                                cancelButtonColor: "#d33",
                                confirmButtonText: "Cancel authorized amount",
                                backdrop: "rgba(0,0,123,0.4)",
                              }).then((result) => {
                                if (result.isConfirmed) {
                                  const id = index.id;
                                  devitrackApi.post(
                                    `/stripe/payment-intents/${index.id}/cancel`,
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
                      )}
                    </td>
                    <td>{date}</td>
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
