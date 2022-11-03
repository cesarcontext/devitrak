import React, { useEffect, useState } from "react";
import { devitrackApi } from "../../apis/devitrackApi";
import "../../style/component/ui/Accordion.css";

export const Accordion = (item) => {
  const [loading, setLoading] = useState(false);
  const [paymentToCheck, setPaymentToCheck] = useState(null);
  const [receiversAssignedPerTransaction, setReceiversAssignedPerTransaction] =
    useState(null);

  useEffect(() => {
    if (item.item.paymentIntent) {
      setPaymentToCheck(item.item.paymentIntent);
    }
  }, [item.item.paymentIntent]);
  const retreiveData = async () => {
    try {
      const response = await devitrackApi.post("/receiver/receiver-assigned", {
        paymentIntent: paymentToCheck,
      });
      const data = await response?.data.receiver;
      if (data) {
        setReceiversAssignedPerTransaction(data);
        setLoading(true);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const controller = new AbortController();
    retreiveData();
    setLoading(true);
    return controller.abort();
  }, [paymentToCheck]);

  return (
    <div>
      <div
        className="container-accordion-info-asinged"
        style={{ width: "50%", margin: "auto", border: "solid 1px #fff" }}
      >
        <div>
          {loading !== true ? (
            <h6>No data yet.</h6>
          ) : (
            receiversAssignedPerTransaction?.map((receiver) => {
              console.log("receivers", receiver);
              if (!receiver) {
                return (
                  <h6>
                    No receiver assigned yet.
                    <br />
                    Please go to Help Desk to pick up receiver
                  </h6>
                );
              }
              return (
                <table className="accordion-table">
                  <thead className="table-thead">
                    <tr className="table-tr">
                      <th className="table-tr-category-title" scope="col">
                        Status /{" "}
                      </th>
                      <th className="table-tr-category-title" scope="col">
                        Serial #
                      </th>
                    </tr>
                  </thead>
                  <tbody key={receiver.id}>
                    {receiver.device.map((item, index) => {
                      return (
                          <tr>
                            <th key={index * 898} scope="row">
                              {item.status !== true ? (
                                <i className="bi bi-check-circle" />
                              ) : (
                                <i className="bi bi-square-fill" />
                              )}
                            </th>
                            <td>{item.serialNumber}</td>
                          </tr>
                      );
                    })}
                  </tbody>
                </table>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

/**
 * (
            /**
             * receiversAssignedPerTransaction?.map((receiver, index) => {
            console.log("🚀 ~ file: Accordion.js ~ line 52 ~ ):receiversAssignedPerTransaction?.map ~ receiver", receiver)
            
          }) 
             */
// return (
//   <tbody
//     key={index}
//     style={{
//       width: "100%",
//       display: "flex",
//       justifyContent: "center",
//       alignItems: "center",
//     }}
//   >
//     <tr
//       style={{
//         width: "100%",
//         display: "flex",
//         justifyContent: "space-between",
//         alignItems: "center",
//       }}
//     >
//       <th scope="row">
//         {receiver.status === true ? (
//           <i className="bi bi-square-fill" />
//         ) : (
//           <i className="bi bi-check-circle" />
//         )}
//       </th>
//       <td>{receiver.serialNumber}</td>
//     </tr>
//   </tbody>
// );
//  :

/**
             * if(item.device.length < 1){
              return (
                <div>
                  <h6>
                    No receiver assigned. <br />
                    Please go to Help Desk to pick up your receivers
                  </h6>
                </div>)
            }
            item.device.map((receiver, index) => {
              return (
                <tbody
                       key={index}
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
                         <th scope="row">
                           {receiver.status === true ? (
                             <i className="bi bi-square-fill" />
                           ) : (
                             <i className="bi bi-check-circle" />
                           )}
                         </th>
                         <td>{receiver.serialNumber}</td>
                       </tr>
                     </tbody>
              )
            })
             */
