import React, { useEffect, useState } from "react";
import QRCode from "react-qr-code";
import { useSelector } from "react-redux";
import { devitrackApi } from "../../apis/devitrackApi";
import { Accordion } from "./Accordion";
import "../../style/component/ui/AccordionListPaymentIntent.css"
export const AccordionListPaymentIntent = () => {
  const { users } = useSelector((state) => state.contactInfo);
  const [stripeTransactions, setStripeTransactions] = useState();
  useEffect(() => {
    const controller = new AbortController();
    devitrackApi
      .get("/admin/users")
      .then((response) => response.data)
      .then((data) => setStripeTransactions(data.stripeTransactions));
    return () => {
      controller.abort();
    };
  }, [users.id]);

  const checkPaymentIntentArray = (info) => {
    if (info.paymentIntent === undefined) {
      return (
        <>
          <QRCode
            fgColor="#000"
            bgColor="#ffff"
            level="Q"
            size={150}
            value="no value returned"
          />
        </>
      );
    }
    return (
      <>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "10px",
          }}
        >
          <QRCode
            fgColor="#000"
            bgColor="#ffff"
            level="Q"
            size={100}
            value={`${info.paymentIntent}`}
            style={{
              margin: "0 auto"
            }}
          />
        </div>
      </>
    );
  };
  return (
    <>
      <div className="accordion accordion-List-payment" id="accordionPanelsStayOpenExample">
        <div className="accordion-item">
          <h2 className="accordion-header" id="panelsStayOpen-headingOne">
            <button
              className="accordion-button"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#panelsStayOpen-collapseOne"
              aria-expanded="true"
              aria-controls="panelsStayOpen-collapseOne"
            >
              Your orders:
            </button>
          </h2>
          <div
            id="panelsStayOpen-collapseOne"
            className="accordion-collapse collapse show"
            aria-labelledby="panelsStayOpen-headingOne"
          >
            <div className="accordion-body">
              {" "}
              {stripeTransactions?.map((item) => {
                if (item?.user?.email === users.email) {
                  return (
                    <div
                      className="accordion accordion-flush"
                      id="accordionFlushExample"
                      key={item.id}
                    >
                      <div className="accordion-item">
                        <h2 className="accordion-header" id="flush-headingOne">
                          <button
                           
                            className="accordion-button collapsed"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#flush-collapseOne"
                            aria-expanded="false"
                            aria-controls="flush-collapseOne"
                          >
                            <h4>
                              Device reserved: <strong>{item.device}</strong>
                            </h4>
                            {checkPaymentIntentArray(item)}
                            <h6>Last 4: <strong>{`${item.paymentIntent}`.slice(-5, -1)}</strong></h6>
                          </button>
                        </h2>
                        <div
                          id="flush-collapseOne"
                          className="accordion-collapse collapse"
                          aria-labelledby="flush-headingOne"
                          data-bs-parent="#accordionFlushExample"
                        >
                          <div className="accordion-body">
                            <Accordion item={item} />
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                }
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
