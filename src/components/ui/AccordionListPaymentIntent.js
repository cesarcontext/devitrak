import React, { useEffect, useState } from "react";
import QRCode from "react-qr-code";
import { useSelector } from "react-redux";
import { devitrackApi } from "../../apis/devitrackApi";

export const AccordionListPaymentIntent = () => {
  const { users } = useSelector((state) => state.contactInfo);
  const [stripeTransactions, setStripeTransactions] = useState();
  console.log(
    "🚀 ~ file: AccordionListPaymentIntent.js ~ line 7 ~ AccordionListPaymentIntent ~ users",
    users.at(-1).id
  );
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
    if (info.length > 0) {
      const QRCodeValue = info?.at(-1).data?.clientSecret;
      return (
        <>
          <div>
            <h5>Show QR Code to claim your devices</h5>
          </div>
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
              size={150}
              value={QRCodeValue}
            />
          </div>
        </>
      );
    }
    return (
      <QRCode
        fgColor="#000"
        bgColor="#ffff"
        level="Q"
        size={150}
        value="no value returned"
      />
    );
  };
  return (
    <ul className="list-group">
      <div class="accordion">
        <div class="accordion-item">
          <h2 class="accordion-header" id="headingOne">
            <button
              class="accordion-button"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseOne"
              aria-expanded="true"
              aria-controls="collapseOne"
            >
              Orders:
            </button>
          </h2>
          <div
            id="collapseOne"
            class="accordion-collapse collapse show"
            aria-labelledby="headingOne"
            data-bs-parent="#accordionExample"
          >
            <div class="accordion-body">
              <li className="list-group-item">
                {stripeTransactions?.map((item) => {
                  if (item.user._id === users.at(-1).id) {
                    console.log(
                      "🚀 ~ file: AccordionListPaymentIntent.js ~ line 39 ~ {stripeTransactions?.map ~ users.id",
                      users.at(-1).id
                    );
                    return (
                      <div
                        style={{
                          display: "flex",
                          justofyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <div>
                          Device reserved: <strong>{item.device}</strong>
                        </div>
                        <div style={{ padding: "20px" }}>
                          <QRCode
                            fgColor="#000"
                            bgColor="#ffff"
                            level="H"
                            size={150}
                            value={`${item.paymentIntent}`}
                          />
                        </div>
                        <button style={{ width: "15%", margin: "0 auto" }}>
                          Check
                        </button>
                      </div>
                    );
                  }
                })}
              </li>
            </div>
          </div>
        </div>
      </div>
    </ul>
  );
};
