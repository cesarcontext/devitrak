import React, { useEffect, useState } from "react";
import QRCode from "react-qr-code";
import { useSelector } from "react-redux";
import { devitrackApi } from "../../apis/devitrackApi";
import { Accordion } from "./Accordion";
import "../../style/component/ui/AccordionListPaymentIntent.css";

/**
 * AccordionListPaymentIntent
 * @component
 * @description accordion with the list of receipt detail for user
 */
export const AccordionListPaymentIntent = () => {
  /**
   *  users detail info
   * @type {Object}
   * @module store/slice
   */
  const { users } = useSelector((state) => state.contactInfo);
  const [openAccordion, setOpenAccordion] = useState(false);
  const [openAccordionDetail, setOpenAccordionDetail] = useState(true);
  const [detailList, setDetailList] = useState([]);
  const [receiverSavedData, setReceiverSavedData] = useState([]);

  /**
   * callSavedStripePaymentIntentApi - function to get data in data by GET method using axios and then save the response in variable
   * @returns {Array}
   */
  const callSavedStripePaymentIntentApi = async () => {
    let result;
    const response = await devitrackApi.get("/admin/users");
    if (response) {
      result = response.data.stripeTransactions;
    }
    return setReceiverSavedData(result);
  };

  /**
   * paymentIntentsToBeRetrieved - check if payment intent is longer than 17 digits to save then in a specific variable. Knowing those are the one generated from user side
   * @type {Array}
   */
  let paymentIntentsToBeRetrieved = [];

  /**
   * index - to insert data in array by splice method
   * @type {Number}
   */
  let index = 0;

  /**
   * noDeletedAccount-  set up to no delete account and instead to insert data in array to display/iterate later
   * @type {Number}
   */
  const noDeletedAccount = 0;

  /**
   * iterate data and then compare data with current user to sort and insert specific data belongs to user to display later
   * @returns {Array}
   */
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
  /**
   * renderPaymentIntentDetail
   * @description after sort and insert data belongs to current user, data is checked in stripe to confirm the saved payment intent was generated in stripe and then display qr code for further action
   * @returns {Promise}
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
  }, [
    users.id,
    openAccordion,
    openAccordionDetail,
  ]);

  /**
   * checkPaymentIntentArray
   * @description check if param is undefined to display generic qr code, ad if it is valid, generate a valid qr code
   * @param {string} info
   * @returns {HTMLBodyElement} qr code
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
                        <p className="accordion-header"
                        >
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
