import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { devitrackApi } from "../../../apis/devitrackApi";
import "../../../page/admin/attendees.css";

export const PaymentIntentTemplate = () => {
  const [dataListed, setDataListed] = useState(null);
  const [searchTerm, setSearchTerm] = useState("")
  

  useEffect(() => {
    devitrackApi
      .get("/stripe/payment-intents")
      .then((response) => response.data)
      .then((data) => setDataListed(data.paymentIntents.data));
  }, [dataListed]);

  const receiversArray = (n) => {
    const array = new Array(n).fill(<input id={`${n}`}  />);
    return array;
  };

  return (
    <div>
      <div className="search-div">
        <div>
          <h4>Search</h4>
        </div>
        <div className="search-input">
          <input
            name="value"
            onChange={(e) => setSearchTerm(e.target.value)}
            value={searchTerm}
            placeholder="Search here!"
          />
        </div>
      </div>
      <div>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Payment Intent ID</th>
              <th scope="col">Client Secret ID</th>
              <th scope="col">Authorized Amount</th>
              <th scope="col">Device #</th>
              <th scope="col">Capture</th>
              <th scope="col">Cancel</th>
            </tr>
          </thead>
          {dataListed?.map((index, item) => {
            const device = index.amount_capturable / 20000;
            const amount_authorized = index.amount_capturable;
            return (
              <tbody key={index.id}>
                <tr>
                  <th scope="row">{item + 1}</th>
                  <td>{index.id}</td>
                  <td>{index.client_secret}</td>
                  <td>${amount_authorized / 100}</td>
                  <td>
                    <div
                      className="accordion accordion-flush"
                      id="accordionFlushExample"
                    >
                      <div className="accordion-item">
                        <h2
                          className="accordion-header"
                          id={`flush-headingOne ${item}`}
                        >
                          <button
                            className="accordion-button collapsed"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#flush-collapseOne"
                            aria-expanded="false"
                            aria-controls="flush-collapseOne"
                          >
                            {device}
                          </button>
                        </h2>
                        <div
                          id="flush-collapseOne"
                          className="accordion-collapse collapse"
                          aria-labelledby="flush-headingOne"
                          data-bs-parent="#accordionFlushExample"
                        >
                          <div className="accordion-body">
                            {" "}
                            <div
                              className="receivers-input"
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                            >
                              {receiversArray(device)}
                              
                            </div>
                            <div>
                              <button>Assign</button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <button
                      onClick={() => {
                        Swal.fire({
                          title: "Are you sure?",
                          text: "The amount will be captured!",
                          icon: "warning",
                          showCancelButton: true,
                          confirmButtonColor: "#3085d6",
                          cancelButtonColor: "#d33",
                          confirmButtonText: "Capture authorized amount",
                          backdrop: "rgba(0,0,123,0.4)",
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
                      {/**handleCapturableAmountSubmit */}
                      Capture amount
                    </button>
                  </td>
                  <td>
                    <button
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
                              "Captured!",
                              "The authorized transaction has been cancelled",
                              "success"
                            );
                          }
                        });
                      }}
                    >
                      Cancel
                    </button>{" "}
                    {/**handleCancelAmountSubmit */}
                  </td>
                </tr>
              </tbody>
            );
          } )}
        </table>
      </div>
    </div>
  );
};
