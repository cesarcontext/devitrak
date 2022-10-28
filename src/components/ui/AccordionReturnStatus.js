import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useAdminStore } from "../../hooks/useAdminStore";
import { useStripeHook } from "../../hooks/useStripeHook";

export const AccordioneturnStatus = () => {
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
    if( paymentIntentReceiversAssigned.length === 0 ){
      setLoading(true)
    }
  }, [paymentIntentReceiversAssigned])
    return (
    <div>
      <div style={{ width: "50%", margin: "auto", border: "solid 1px #fff" }}>
        <div className="accordion">
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
                <h3>RETURN DEVICES</h3>
              </button>
            </h2>
            <div
              id="collapseOne"
              className="accordion-collapse collapse show"
              aria-labelledby="headingOne"
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body">
                {loading !== true ? 
                 (
                  <h6>
                    NO RECEVERS RETURNED YET
                  </h6>
                ): (
                  paymentIntentReceiversAssigned.length > 0 ? paymentIntentReceiversAssigned?.at(-1).device?.map(
                    (index, receiver) => {
                        if( index.status === false){
                            return (
                                <tbody
                                key={index+receiver}
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
                                    <th scope="row"><i className="bi bi-check-circle" /></th>
                                    <td>{index.serialNumber}</td>
                                  </tr>
                                </tbody>
                              );
                        }
                    }
                  ) : ""
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