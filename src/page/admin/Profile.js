import React, { useState } from "react";
import { Navbar } from "../../components/admin/ui/Navbar";
import { useAdminStore } from "../../hooks/useAdminStore";
import { useContactInfoStore } from "../../hooks/useContactInfoStore";
import "../../style/pages/admin/profile.css";

export const Profile = () => {
  const { user } = useAdminStore();
  const { startUpdatingContactInfo } = useContactInfoStore();
  const [buttonEditProfile, setButtonEditProfile] = useState(false);
  const [email, setEmail] = useState("");

  const handleEditInfoSubmitted = async (event) => {
    event.preventDefault();
    await startUpdatingContactInfo(email);
    setButtonEditProfile(!buttonEditProfile);
  };

  return (
    <div>
      <Navbar />
      <div className="profile-admin-container">
        <div>
          <h2>Profile</h2>
        </div>
        <div className="profile-info-detail">
          <div>
            <img
              style={{
                borderRadius: "50%",
                objectPosition: "center",
                objectFit: "fill",
              }}
              src="https://imgs.search.brave.com/Jaq_bvSyZXetX2HgVL-G-9T_HNs1OWb7n-xXmooyEms/rs:fit:640:640:1/g:ce/aHR0cHM6Ly9jZG4u/cGl4YWJheS5jb20v/cGhvdG8vMjAxNS8x/MC8wNS8yMi8zNy9i/bGFuay1wcm9maWxl/LXBpY3R1cmUtOTcz/NDYwXzY0MC5wbmc"
              alt="https://imgs.search.brave.com/Jaq_bvSyZXetX2HgVL-G-9T_HNs1OWb7n-xXmooyEms/rs:fit:640:640:1/g:ce/aHR0cHM6Ly9jZG4u/cGl4YWJheS5jb20v/cGhvdG8vMjAxNS8x/MC8wNS8yMi8zNy9i/bGFuay1wcm9maWxl/LXBpY3R1cmUtOTcz/NDYwXzY0MC5wbmc"
            />
            <div>
              <button
                style={{
                  backgroundColor: "transparent",
                  border: "transparent",
                  boxShadow: "none",
                  color: "#212529",
                }}
              >
                {" "}
                {/* <input type="file" onChange={handleChange} /> */}
                <strong>
                  CHANGE PICTURE <i className="bi bi-pencil" />{" "}
                </strong>
              </button>
            </div>
          </div>
          <div className="personal-info-box">
            {buttonEditProfile === false ? (
              <>
                <div className="personal-info-detail">
                  <strong>YOUR INFORMATION</strong>
                  <h6>Name</h6>
                  <span>{user.name}</span>
                  <br />
                  <h6>Role</h6>
                  <span>Administrator</span>
                </div>
                <div className="personal-info-detail">
                  <strong>CONTACT DETAILS</strong>
                  <h6>Email</h6>
                  <span>{user.email}</span>
                </div>
              </>
            ) : (
              <>
                <div className="personal-info-detail">
                  <strong>YOUR INFORMATION</strong>
                  <h6>Name</h6>
                  <span>{user.name}</span>
                  <br />
                  <h6>Role</h6>
                  <span>{user.role.at(-1).map( item => item)}</span>
                </div>
                <div className="personal-info-detail">
                  <strong>CONTACT DETAILS</strong>
                  <h6>Email</h6>
                  <span>
                    <input
                      style={{
                        width: "100%",
                      }}
                      placeholder="Email"
                      id="email"
                      onChange={(event) => setEmail(event.target.value)}
                      type="text"
                      name="email"
                      value={email}
                    />
                  </span>
                </div>
              </>
            )}

            <div>
              {buttonEditProfile === false ? (
                <>
                  <button
                    onClick={() => setButtonEditProfile(!buttonEditProfile)}
                    style={{
                      backgroundColor: "transparent",
                      border: "transparent",
                      boxShadow: "none",
                      color: "#212529",
                    }}
                  >
                    <strong>
                      EDIT PERFIL <i className="bi bi-pencil" />{" "}
                    </strong>
                  </button>
                </>
              ) : (
                <>
                  <div style={{ display: "flex" }}>
                    <button
                      onClick={() => setButtonEditProfile(false)}
                      style={{
                        backgroundColor: "transparent",
                        border: "transparent",
                        boxShadow: "none",
                        color: "#212529",
                        width: "45%",
                      }}
                    >
                      <strong>
                        <h3>
                          <i className="bi bi-x-square" />
                        </h3>{" "}
                      </strong>
                    </button>
                    <button
                      onClick={handleEditInfoSubmitted}
                      style={{
                        backgroundColor: "transparent",
                        border: "transparent",
                        boxShadow: "none",
                        color: "#212529",
                        width: "80%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <strong>
                        <h3>
                          <i className="bi bi-save" />
                        </h3>{" "}
                      </strong>
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
