import React from "react";
import { Navbar } from "../../components/admin/Navbar";
import { useAdminStore } from "../../hooks/useAdminStore";
import "./profile.css";
export const Profile = () => {
    const adminName = localStorage.getItem("admin")
  return (
    <div>
      <Navbar />
      <div className="profile-admin-container">
        <div>
          <h2>User Settings</h2>
        </div>
        <div className="profile-info-detail">
          <div>
            <div>
              <img
                src="https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg"
                alt="https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg"
              />
            </div>
            <div>
              <button style={{ backgroundColor: "transparent", border: "transparent", boxShadow: "none", color: "#212529"}}>
                <strong>
                  CHANGE PICTURE <i className="bi bi-pencil" />{" "}
                </strong>
              </button>
            </div>
          </div>
          <div className="personal-info-box">
            <div className="personal-info-detail">
              <strong>YOUR INFORMATION</strong>
              <span>Name</span>
              <span>{adminName}</span>
              <span>Role</span>
              <span>Administrator</span>
            </div>
            <div className="personal-info-detail">
              <strong>CONTACT DETAILS</strong>
              <span>Phone</span>
              <span>Phone</span>
              <span>Email</span>
              {/* <span>{adminEmail}</span> */}
            </div>
            <div>
              <button style={{ backgroundColor: "transparent", border: "transparent", boxShadow: "none", color: "#212529"}}>
                <strong>
                  EDIT PERFIL <i className="bi bi-pencil" />{" "}
                </strong>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
