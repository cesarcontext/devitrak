import React, { useEffect, useState } from "react";
import QRCode from "react-qr-code";
import { useSelector } from "react-redux";
import { Icon } from "@iconify/react";
import { devitrackApi } from "../../apis/devitrackApi";
import { Accordion } from "./Accordion";
import { Link } from "react-router-dom";
import "../../style/component/ui/AccordionListPaymentIntent.css";
import RetrievePaymentIntentReceiptSaved from "./RetrievePaymentIntentReceiptSaved";
import RetrievePaymentIntentReceiptFormat from "./RetrievePaymentIntentReceiptFormat";
import { useCallback } from "react";

/**

AccordionListPaymentIntent - A component that renders a list of payment intents
@returns {JSX.Element} React component
*/
export const AccordionListPaymentIntent = () => {
  const { users } = useSelector((state) => state.contactInfo);
  const { eventSelected } = useSelector((state) => state.providerEvent);
  const [openAccordion, setOpenAccordion] = useState(false);
  const [infoDetail, setInfoDetail] = useState([]);
  const [receiverSavedData, setReceiverSavedData] = useState([]);

  /**

Fetches saved Stripe payment intent data from the API
@async
@function
@returns {Promise<void>} A Promise that resolves when the data is fetched and saved to state
*/
  const callSavedStripePaymentIntentApi = useCallback(async () => {
    let result;
    const response = await devitrackApi.get("/admin/users");
    if (response) {
      result = response.data.stripeTransactions;
    }
    return setReceiverSavedData(result);
  }, []);

  callSavedStripePaymentIntentApi();

  let paymentIntentsToBeRetrieved = [];
  let paymentIntentsToBeRetrievedFromStripe = [];
  const noDeletedAccount = 0;

  /**

Sorts the saved Stripe payment intent data and inserts it into an array
@function
@returns {void}
*/
  const sortAndInsertData = async () => {
    let index = 0;
    let indexAux = 0;
    for (let data of receiverSavedData) {
      if (
        data?.user?.email === users?.email &&
        data?.eventSelected === eventSelected
      ) {
        if (data.paymentIntent.length < 16) {
          paymentIntentsToBeRetrieved.splice(index, noDeletedAccount, data);
          index++;
        } else {
          paymentIntentsToBeRetrievedFromStripe.splice(
            indexAux,
            noDeletedAccount,
            data
          );
          indexAux++;
        }
      }
    }
  };
  sortAndInsertData();

  const retrievePaymentIntentInfo = async () => {
    let result = [];
    let index = 0;
    for (let props of paymentIntentsToBeRetrievedFromStripe) {
      const resp = await devitrackApi.get(
        `stripe/payment_intents/${props.paymentIntent}`
      );
      if (resp) {
        return result.splice(index, noDeletedAccount, resp.data.paymentIntent);
      }
      if (infoDetail.length > 0) {
        setInfoDetail(result);
      }
    }
  };
  retrievePaymentIntentInfo();
  console.log("first", infoDetail);
  return (
    <>
      <div className="accordion-List-payment">
        <h2 className="accordion-header">
          <p
            style={{ textDecoration: "none" }}
            onClick={() => setOpenAccordion(!openAccordion)}
          >
            YOUR ORDERS
            {openAccordion !== false ? (
              <i className="bi bi-chevron-up" />
            ) : (
              <i className="bi bi-chevron-down" />
            )}
          </p>

          <p
            style={{
              color: "var(--main-colorslobster)",
              textDecoration: "none",
            }}
          >
            <Link to="/my_profile">BACK</Link>
          </p>
        </h2>
        <div className="accordion-collapse collapse show">
          <div className="accordion-body">
            {paymentIntentsToBeRetrieved?.map((item) => {
              return (
                <div key={item.id}>
                  <RetrievePaymentIntentReceiptSaved props={item} />
                </div>
              );
            })}
          </div>
          <div className="accordion-body">
            {paymentIntentsToBeRetrievedFromStripe?.map((item) => {
              return (
                <div key={item.id}>
                  <RetrievePaymentIntentReceiptFormat props={item} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};
