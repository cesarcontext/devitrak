import React, { useEffect, useState } from "react";
import QRCode from "react-qr-code";
import { useSelector } from "react-redux";
import { devitrackApi, devitrackApiStripe } from "../../apis/devitrackApi";
import { Accordion } from "./Accordion";
import "../../style/component/ui/AccordionListPaymentIntent.css";

export const AccordionListPaymentIntent = () => {
  const { users } = useSelector((state) => state.contactInfo);
  const [openAccordion, setOpenAccordion] = useState(true);
  const [openAccordionDetail, setOpenAccordionDetail] = useState(false);
  const [receiverData, setReceiverData] = useState([]);
  const [receiverSavedData, setReceiverSavedData] = useState([]);
  let listOfPaymentPerUser = [];
  const callStripePaymentIntentApi = async () => {
    const response = await devitrackApiStripe.get("/payment-intents");
    if (response) {
      setReceiverData(response.data.paymentIntents.data);
    }
  };
  const callSavedStripePaymentIntentApi = async () => {
    const response = await devitrackApi.get("/admin/users");
    if (response) {
      setReceiverSavedData(response.data.stripeTransactions);
    }
  };
  useEffect(() => {
    callStripePaymentIntentApi();
    callSavedStripePaymentIntentApi();
  }, [users.id, openAccordion, openAccordionDetail]);

  for (let i = 0; i < receiverData.length; i++) {
    if (
      users.email === receiverData[i].receipt_email &&
      receiverData[i].status !== "requires_payment_method"
    ) {
      listOfPaymentPerUser.push(receiverData[i]);
    }
  }

  const checkPaymentIntentArray = (info) => {
    if (info === undefined) {
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
            value={info}
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
              {listOfPaymentPerUser?.map((item) => {
                const device = item.amount / 20000;
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
                            {checkPaymentIntentArray(item.id)}
                          </div>
                          <div>
                            <span>
                              Device ordered:&nbsp;{" "}
                              <p>
                                <strong>{device}</strong>
                              </p>
                            </span>
                            <span>
                              Pending return:&nbsp;{" "}
                              <strong>
                                <Accordion item={item.id} />
                              </strong>
                            </span>
                            <a
                              style={{
                                color: "var(--main-colorsbluetiful)",
                                cursor: "pointer",
                                textDecoration: "underline",
                              }}
                              href={`${item.charges.data[0].receipt_url}`}
                              target="_blank" rel="noreferrer"
                            >
                              View receipt
                            </a>
                          </div>
                        </div>
                      ) : null}
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="accordion-body">
              {" "}
              {listOfPaymentPerUser?.map((item) => {
                if (item.status === "suceeded" || item.status === "canceled") {
                  const device = item.amount / 20000;
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
                              {checkPaymentIntentArray(item.id)}
                            </div>
                            <div>
                              <span>
                                Device ordered:&nbsp;{" "}
                                <p>
                                  <strong>{device}</strong>
                                </p>
                              </span>
                              <span>
                                Pending return:&nbsp;{" "}
                                <strong>
                                  <Accordion item={item.id} />
                                </strong>
                              </span>
                              <a
                                style={{
                                  color: "var(--main-colorsbluetiful)",
                                  cursor: "pointer",
                                  textDecoration: "underline",
                                }}
                                href={`${item.charges.data[0].receipt_url}`}
                                target="_blank" rel="noreferrer"
                              >
                                View receipt
                              </a>
                            </div>
                          </div>
                        ) : null}
                      </div>
                    </div>
                  );
                }
              })}
              {receiverSavedData?.map((item) => {
                if (item.paymentIntent.length < 16) {
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
                            Order {item.paymentIntent}{" "}
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
                              {checkPaymentIntentArray(item.paymentIntent)}
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
                                  <Accordion item={item.paymentIntent} />
                                </strong>
                              </span>
                              <span
                                style={{
                                  color: "var(--main-colorsbluetiful)",
                                  cursor: "pointer",
                                  textDecoration: "underline",
                                }}
                              >
                                No deposit required
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
