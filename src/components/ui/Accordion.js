import React, { useEffect, useState } from "react";
import { devitrackApi } from "../../apis/devitrackApi";

export const Accordion = (item) => {
  console.log("🚀 ~ file: Accordion.js ~ line 5 ~ Accordion ~ item", item);
  const [loading, setLoading] = useState(false);
  const [paymentToCheck, setPaymentToCheck] = useState(null);
  const [receiversAssignedPerTransaction, setReceiversAssignedPerTransaction] =
    useState(null);

  useEffect(() => {
    if (item.item.paymentIntent) {
      setPaymentToCheck(item.item.paymentIntent);
    }
  }, [item.item.paymentIntent]);
  console.log(paymentToCheck);

  const retreiveData = async () => {
    try {
      const response = await devitrackApi.post("/receiver/receiver-assigned", {
        paymentIntent: paymentToCheck,
      });
      const data = await response?.data.receiver;
      if (data) {
        setReceiversAssignedPerTransaction(data);
        setLoading(true);
        console.log(
          "🚀 ~ file: Accordion.js ~ line 25 ~ retreiveData ~ data",
          data
        );
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
      <div style={{ width: "50%", margin: "auto", border: "solid 1px #fff" }}>
        <div>
          {loading !== true ? (
            <h6>
              No receiver assigned yet.
              <br />
              Please go to Help Desk to pick up receiver
            </h6>
          ) : (
            receiversAssignedPerTransaction?.map((receiver) => {
              return (
                <table className="table">
                  <thead
                    style={{
                      width: "100%",
                      display: "flex",
                      flexDirection: "column",
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
                      <th scope="col">Status</th>
                      <th scope="col">Serial number</th>
                    </tr>
                  </thead>
                  <tbody
                    key={receiver.id}
                    style={{
                      width: "100%",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                    }}>
                    {receiver.device.map((item, index) => {
                      return (
                        <>
                          <tr
                            style={{
                              width: "100%",
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                            }}
                          >
                            <th key={index * 898} scope="row">
                              {item.status !== true ? (
                                <i className="bi bi-check-circle" />
                              ) : (
                                <i className="bi bi-square-fill" />
                              )}
                            </th>
                            <td>{item.serialNumber}</td>
                          </tr>{" "}
                        </>
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
