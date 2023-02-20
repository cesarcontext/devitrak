import React, { useEffect, useState } from "react";
import QRCode from "react-qr-code";
import { useSelector } from "react-redux";
import { devitrackApi } from "../../apis/devitrackApi";
import { Accordion } from "./Accordion";
import "../../style/component/ui/AccordionListPaymentIntent.css";

/**

AccordionListPaymentIntent - A component that renders a list of payment intents
@returns {JSX.Element} React component
*/
export const AccordionListPaymentIntent = () => {
  const { users } = useSelector((state) => state.contactInfo);
  const [openAccordion, setOpenAccordion] = useState(false);
  const [openAccordionDetail, setOpenAccordionDetail] = useState(true);
  const [detailList, setDetailList] = useState([]);
  const [receiverSavedData, setReceiverSavedData] = useState([]);

  /**

Fetches saved Stripe payment intent data from the API
@async
@function
@returns {Promise<void>} A Promise that resolves when the data is fetched and saved to state
*/
  const callSavedStripePaymentIntentApi = async () => {
    let result;
    const response = await devitrackApi.get("/admin/users");
    if (response) {
      result = response.data.stripeTransactions;
    }
    return setReceiverSavedData(result);
  };

  let paymentIntentsToBeRetrieved = [];
  let index = 0;
  const noDeletedAccount = 0;

/**

Sorts the saved Stripe payment intent data and inserts it into an array
@function
@returns {void}
*/
  const sortAndInsertData = () => {
    for (let data of receiverSavedData) {
      if (data?.user?.email === users?.email) {
        if (data.paymentIntent.length > 15) {
          paymentIntentsToBeRetrieved.splice(
            index,
            noDeletedAccount,
            data.paymentIntent
          );
        }
      }
    }
  };
  if (receiverSavedData.length > 0) {
    sortAndInsertData();
  }

  /**

Renders the payment intent details and sets the state with the data
@async
@function
@returns {Promise<void>} A Promise that resolves when the payment intent details are fetched and rendered
*/
  const renderPaymentIntentDetail = async () => {
    let replacement = [];
    for (let index = 0; index < paymentIntentsToBeRetrieved.length; index++) {
      const response = await devitrackApi.get(
        `/stripe/payment_intents/${paymentIntentsToBeRetrieved[index]}`
      );
      if (response) {
        replacement.push(response.data.paymentIntent);
      }
      setDetailList([replacement]);
    }
  };
  useEffect(() => {
    callSavedStripePaymentIntentApi();
    renderPaymentIntentDetail();
  }, [users.id, openAccordion, openAccordionDetail]);

  /**

Checks if the payment intent array contains data and returns a QR code with the payment intent information, or a placeholder if it's undefined
@function
@param {string} info - Payment intent information to be encoded in the QR code
@returns {JSX.Element} React component with a QR code or a placeholder
*/
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
            YOUR ORDERS
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
              {receiverSavedData?.map((item) => {
                if (item.paymentIntent.length < 16) {
                  if (item.user.email === users.email) {
                    return (
                      <div key={item.id}>
                        <div className="accordion-detail-title">
                          <div className="order-list">
                            <i className="bi bi-circle" />{" "}
                            <p className="accordion-header">
                              <strong>Order: </strong> {item.paymentIntent}{" "}
                              <i className="bi bi-chevron-down" />
                            </p>
                          </div>
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
                        </div>
                      </div>
                    );
                  }
                }
              })}
            </div>
            <div className="accordion-body">
              {detailList[0]?.map((item) => {
                return (
                  <div key={item.id}>
                    <div className="accordion-detail-title">
                      <div className="order-list">
                        <i className="bi bi-circle" />{" "}
                        <p className="accordion-header">
                          <strong>Order: </strong> {item.id}{" "}
                          <i className="bi bi-chevron-down" />
                        </p>
                      </div>
                      <div className="accordion-body-detail">
                        <div className="">
                          {checkPaymentIntentArray(item.id)}
                        </div>
                        <div>
                          <span>
                            Device ordered:&nbsp;{" "}
                            <p>
                              <strong>{item.amount / 20000}</strong>
                            </p>
                          </span>
                          <span>
                            Pending return:&nbsp;{" "}
                            <strong>
                              <Accordion item={item.id} />
                            </strong>
                          </span>
                          {item.charges.data[0].outcome?.network_status ===
                            "approved_by_network" && (
                            <a
                              style={{
                                color: "var(--main-colorsbluetiful)",
                                cursor: "pointer",
                                textDecoration: "underline",
                              }}
                              href={`${item?.charges?.data[0].receipt_url}`}
                              target="_blank"
                              rel="noreferrer"
                            >
                              View receipt
                            </a>
                          )}
                          {item?.failure_code !== null && (
                            <div
                              style={{
                                color: "var(--main-colorsbluetiful)",
                                cursor: "pointer",
                                textDecoration: "underline",
                              }}
                            >
                              <p style={{ color: "red", fontSize: "12px" }}>
                                {item?.outcome?.seller_message}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
};
