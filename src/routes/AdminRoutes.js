import React from "react";
import { Navigate } from "react-router-dom";
import { Routes, Route } from "react-router";
import { useSelector } from "react-redux";
// import { Admin } from "../page/admin/Admin";
import { ArticleContentCreation } from "../components/admin/Articles/ArticleContentCreation";
import { Articles } from "../page/admin/Articles";
import { Attendees } from "../page/admin/Attendees";
import { DeviceDatabase } from "../page/admin/DeviceDatabase";
import { LoginRegisterAdmin } from "../page/admin/LoginAdmin";
import { Profile } from "../page/admin/Profile";
import { ReceiversDetailsAssignation } from "../components/admin/Attendees/ReceiversDetailsAssignation";
import { Settings } from "../page/admin/Settings";
import { Events } from "../page/admin/Events";
import { NoticePaymentTransactionConfirmed } from "../page/admin/NoticePaymentTransactionConfirmed";
import { DeviceInUse } from "../page/admin/DeviceInUse";
import { DetailUser } from "../components/admin/Attendees/DetailUser";

export const AdminRoutes = () => {
  const { status } = useSelector((state) => state.admin);
  const adminToken = localStorage.getItem("admin-token");
  return (
    <div>
      <Routes>
        {status === "authenticated" && adminToken ? (
          <>
            {/* <Route path="/admin" element={<Admin />}></Route> */}
            <Route path="/admin/device-database" element={<DeviceDatabase />} />
            <Route path="/admin/articles" element={<Articles />} />
            <Route path="/admin/settings" element={<Settings />} />
            <Route path="/admin/attendees" element={<Attendees />} />
            <Route path="/admin/attendee/:id" element={<DetailUser />} />
            <Route path="/admin/events" element={<Events />} />
            <Route
              path="/admin/attendees/receiver_assignation"
              element={<ReceiversDetailsAssignation />}
            />
            <Route
              path="/admin/create-article"
              element={<ArticleContentCreation />}
            />
            <Route
              path="/admin/device-database/device-in-use"
              element={<DeviceInUse />}
            />

            <Route path="/admin/profile" element={<Profile />} />
            <Route
              path="/admin/*"
              element={<Navigate to="/admin/events" replace />}
            />
            <Route
              path="/admin/payment-confirmed"
              element={<NoticePaymentTransactionConfirmed />}
            />
          </>
        ) : (
          <>
            <Route path="/admin/login" element={<LoginRegisterAdmin />} />
            <Route
              path="/admin/*"
              element={<Navigate to="/admin/login" replace />}
            />
          </>
        )}
      </Routes>
    </div>
  );
};
