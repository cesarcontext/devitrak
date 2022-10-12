import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useAdminStore } from "../../hooks/useAdminStore";
import { useDeviceCount } from "../../hooks/useDeviceCountStore";
import { useStripeHook } from "../../hooks/useStripeHook";

export const Accordion = () => {
  const { paymentIntent } = useStripeHook();
  const { paymentIntentReceiversAssigned } = useSelector(
    (state) => state.stripe
  );
  const { checkReceiversAssignedToPaymentIntent } = useAdminStore();

  const paymentToCheck = paymentIntent.at(-1).data.payment_intent_id;

  console.log("paymentToCheck", paymentToCheck);

  useEffect(() => {
    checkReceiversAssignedToPaymentIntent(paymentToCheck);
  }, []);
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
                {paymentIntentReceiversAssigned.length < 1 ? (
                  <h6>No receivers assigned yet</h6>
                ) : (
                  paymentIntentReceiversAssigned
                    .at(-1)
                    .device.map((index, receiver) => {
                      return (
                        <tbody style={{width: "100%", display: "flex", justifyContent: "center", alignItems: "center"}}>
                          <tr style={{width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                            <th scope="row">{receiver + 1}</th>
                            <td>{index}</td>
                          </tr>
                        </tbody>
                      );
                    })
                )}
                {/* {new Array( device).fill(<div style={{display: "flex", flexDirection: "column"}}><input className="input-field" disabled /></div>)} */}
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
      >
        {/* <div className="accordion" id="accordionExample">
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingTwo">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseTwo"
                aria-expanded="false"
                aria-controls="collapseTwo"
              >
                <h3>RETURNED DEVICES</h3>
              </button>
            </h2>
            <div
              id="collapseTwo"
              className="accordion-collapse collapse"
              aria-labelledby="headingTwo"
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body"></div>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};
