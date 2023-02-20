// import { useInterval } from "interval-hooks";
// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { devitrackApi } from "../../apis/devitrackApi";
// import { Navbar } from "../../components/admin/ui/Navbar";

// export const NoticePaymentTransactionConfirmed = ({ device, userToDisplay }) => {
//   console.log("🚀 ~ file: NoticePaymentTransactionConfirmed.js:8 ~ NoticePaymentTransactionConfirmed ~ userToDisplay", userToDisplay)
//   const [stripeTransactions, setStripeTransactions] = useState([]);
//   console.log("🚀 ~ file: NoticePaymentTransactionConfirmed.js:10 ~ NoticePaymentTransactionConfirmed ~ stripeTransactions", stripeTransactions)

//   const payment_intent = new URLSearchParams(window.location.search).get(
//     "payment_intent"
//   );
//   console.log(
//     "🚀 ~ file: NoticeTransactionWentTrue.js:13 ~ NoticeTransactionWentTrue ~ payment_intent",
//     payment_intent
//   );

//   const clientSecret = new URLSearchParams(window.location.search).get(
//     "payment_intent_client_secret"
//   );
//   console.log(
//     "🚀 ~ file: NoticeTransactionWentTrue.js:18 ~ NoticeTransactionWentTrue ~ clientSecret",
//     clientSecret
//   );

//   const callApiStripeTransaction = async () => {
//     await devitrackApi
//       .get("/admin/users")
//       .then((response) => response.data)
//       .then((data) => setStripeTransactions(data.stripeTransactions));
//   };

//   const saveTransactionAdmin = async () => {
//     const response = await devitrackApi.post(
//       "/stripe/stripe-transaction-no-regular-user",
//       {
//         paymentIntent: payment_intent,
//         clientSecret: clientSecret,
//         device: device,
//         user: userToDisplay,
//       }
//     );
//     if (response) {
//     }
//   };

//   useEffect(() => {
//     callApiStripeTransaction();
//     saveTransactionAdmin();
//   }, [payment_intent]);

//   const removeDuplicatesStripePaymentIntent = async () => {
//     const duplicates = {};
//     for (let i = 0; i < stripeTransactions.length; i++) {
//       if (!duplicates[stripeTransactions[i].paymentIntent]) {
//         duplicates[stripeTransactions[i].paymentIntent] =
//           stripeTransactions[i].paymentIntent;
//       } else {
//         await devitrackApi.delete(
//           `/stripe/remove-duplicate/${stripeTransactions[i].id}`
//         );
//       }
//     }
//   };

//   useInterval(async () => {
//     await removeDuplicatesStripePaymentIntent();
//   }, 1_00);

//   return (
//     <div>
//       <Navbar />
//       <div
//         style={{
//           width: "85%",
//           backgroundColor: "#fff",
//           border: "solid 1px #212529",
//           borderRadius: "15px",
//           padding: "20px",
//           margin: "15vh auto",
//           display: "flex",
//           flexDirection: "column",
//           justifyContent: "space-around",
//           alignItems: "center",
//           height: "50vh",
//         }}
//       >
//         <p
//           style={{
//             display: "flex",
//             flexDirection: "column",
//             justifyContent: "space-around",
//             alignItems: "center",
//           }}
//         >
//           <i
//             style={{ fontSize: "50px", color: "green" }}
//             className="bi bi-check-circle"
//           />
//           TRANSACTION DONE.
//         </p>
//         <p>PLEASE, PROCEED TO ADD RECEIVERS TO USER</p>
//         <Link to="/admin/attendees">
//           <p>CLICK THIS LINK TO RETURN TO USER LIST</p>
//         </Link>
//       </div>
//     </div>
//   );
// };
