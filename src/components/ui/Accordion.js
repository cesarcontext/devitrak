import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useAdminStore } from "../../hooks/useAdminStore";
import { useStripeHook } from "../../hooks/useStripeHook";

export const Accordion = () => {
  const { paymentIntent } = useStripeHook();
  const { paymentIntentReceiversAssigned } = useSelector(
    (state) => state.stripe
  );
  const { checkReceiversAssignedToPaymentIntent } = useAdminStore();
  const [loading, setLoading] = useState(false);
  const [paymentToCheck, setPaymentToCheck] = useState(null);

  useEffect(() => {
    if (paymentIntent.length > 0) {
      return setPaymentToCheck(paymentIntent.at(-1).data.payment_intent_id);
    }
  }, [paymentIntent]);

  const check = async () => {
    await checkReceiversAssignedToPaymentIntent(paymentToCheck);
  };
  useEffect(() => {
    check();
  }, [paymentToCheck]);

  useEffect(() => {
    if (paymentIntentReceiversAssigned.length === 0) {
      setLoading(true);
    }
  }, [paymentIntentReceiversAssigned]);
  return (
    <div>
      <div style={{ width: "50%", margin: "auto", border: "solid 1px #fff" }}>
        <div className="accordion" id="accordionExample">
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingOne">
              <button
                className="accordion-button"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseOne"
                aria-expanded="true"
                aria-controls="collapseOne"
              >
                <h3>PENDING DEVICES</h3>
              </button>
            </h2>
            <div
              id="collapseOne"
              className="accordion-collapse collapse show"
              aria-labelledby="headingOne"
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body">
                {loading !== true ? (
                  <strong>"No data to display"</strong>
                ) : paymentIntentReceiversAssigned.length > 0 ? (
                  paymentIntentReceiversAssigned
                    ?.at(-1)
                    .device?.map((index, receiver) => {
                      if (index.status === true) {
                        return (
                          <tbody
                            key={index + receiver}
                            style={{
                              width: "100%",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
                            <tr
                              style={{
                                width: "100%",
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                              }}
                            >
                              <th scope="row"><i className="bi bi-square-fill" /></th>
                              <td>{index.serialNumber}</td>
                            </tr>
                          </tbody>
                        );
                      }
                    })
                ) : (
                  <div>
                    <h6>
                    No receiver assigned. <br />
                    Please go to Help Desk to pick up your receivers
                  </h6>
                    
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        style={{
          width: "50%",
          marginTop: "3%",
          margin: "auto",
          border: "solid 1px #fff",
        }}
      ></div>
    </div>
  );
};
