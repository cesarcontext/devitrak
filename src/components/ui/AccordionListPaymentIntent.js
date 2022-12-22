import React, { useEffect, useState } from "react";
import QRCode from "react-qr-code";
import { useSelector } from "react-redux";
import { devitrackApi, devitrackApiStripe } from "../../apis/devitrackApi";
import { Accordion } from "./Accordion";
import "../../style/component/ui/AccordionListPaymentIntent.css";

export const AccordionListPaymentIntent = () => {
  const { users } = useSelector((state) => state.contactInfo);
  const [stripeTransactions, setStripeTransactions] = useState([]);
  const [openAccordion, setOpenAccordion] = useState(true);
  const [openAccordionDetail, setOpenAccordionDetail] = useState(false);

  const callApiStripeTransaction = async () => {
    await devitrackApi
      .get("/admin/users")
      .then((response) => response.data)
      .then((data) => setStripeTransactions(data.stripeTransactions));
  };
  useEffect(() => {
    const controller = new AbortController();
    callApiStripeTransaction();
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
              margin: "0 auto",
            }}
          />
        </div>
      </>
    );
  };
  return (
    <>
      <div className="accordion-List-payment">
        <h2 className="accordion-header">
          <p onClick={() => setOpenAccordion(!openAccordion)}>
            Your orders
            {openAccordion !== false ? (
              <i className="bi bi-chevron-up" />
            ) : (
              <i className="bi bi-chevron-down" />
            )}
          </p>
        </h2>
        {openAccordion === true ? (
          <div className="accordion-collapse collapse show">
            <div className="accordion-body">
              {" "}
              {stripeTransactions?.map((item) => {
                if (item?.user?.email === users.email) {
                  return (
                    <div key={item.id}>
                      <div className="accordion-detail-title">
                        <div className="order-list">
                          <i className="bi bi-circle" />{" "}
                          <p
                            onClick={() =>
                              setOpenAccordionDetail(!openAccordionDetail)
                            }
                            className="accordion-header"
                          >
                            Order {item.id}{" "}
                          </p>
                          {openAccordionDetail !== true ? (
                            <i className="bi bi-chevron-up" />
                          ) : (
                            <i className="bi bi-chevron-down" />
                          )}
                        </div>

                        {openAccordionDetail === true ? (
                          <div className="accordion-body-detail">
                            <div className="">
                              {checkPaymentIntentArray(item)}
                            </div>
                            <div>
                              <span>
                                Device ordered:&nbsp;{" "}
                                <p>
                                  <strong>{item.device}</strong>
                                </p>
                              </span>
                              <span>
                                Pending return:&nbsp;{" "}
                                <strong>
                                  <Accordion item={item} />
                                </strong>
                              </span>
                            </div>
                          </div>
                        ) : null}
                      </div>
                    </div>
                  );
                }
              })}
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
};
