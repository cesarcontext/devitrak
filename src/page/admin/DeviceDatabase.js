// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import { DisplayDataReceiversActivity } from "../../components/admin/DeviceDatabaseSection/DisplayDataReceiversActivity";
// import { DisplayDataReceiversStatus } from "../../components/admin/DeviceDatabaseSection/DisplayDataReceiversStatus";
// import { ReceiverStock } from "../../components/admin/DeviceDatabaseSection/ReceiverStock";
// import { Navbar } from "../../components/admin/ui/Navbar";
// import "../../style/component/admin/DeviceDatabase.css";

// export const DeviceDatabase = () => {
//   const [searchTerm, setSearchTerm] = useState("");
//   return (
//     <div>
//       <Navbar />
//       <div>
//         <div className="search-div">
//           <div>
//             <h4>Search</h4>
//           </div>
//           <div className="search-input">
//             <input
//               className="search-input-field"
//               name="value"
//               onChange={(e) => setSearchTerm(e.target.value)}
//               value={searchTerm}
//               placeholder="Search"
//             />
//             {searchTerm !== "" && (
//               <i
//                 onClick={() => setSearchTerm("")}
//                 id="icon-delete-searchTerm"
//                 className="bi bi-x"
//               />
//             )}
//           </div>
//         </div>
//         <ReceiverStock searchTerm={searchTerm} />
//       </div>
//       <div className="container-graphic">
//         <div>
//           <DisplayDataReceiversActivity />
//           <Link to="/admin/device-database/device-in-use">
//               <p>
//                 LIST OF DEVICE IN-USE
//               </p>
//           </Link>
//         </div>
//         <div>
//           <DisplayDataReceiversStatus />
//         </div>
//       </div>
//     </div>
//   );
// };
