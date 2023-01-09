import React, { useState } from "react";
import { Navbar } from "../../components/admin/ui/Navbar";
import { useAdminStore } from "../../hooks/useAdminStore";
import "../../style/pages/admin/profile.css";

export const Profile = () => {
  const { user } = useAdminStore();
  const {startEditAdminUser} = useAdminStore()
  const [buttonEditProfile, setButtonEditProfile] = useState(false);
  const [email, setEmail] = useState("");
  const [fullname, setFullname] = useState("")

  const handleEditInfoSubmitted = async (event) => {
    event.preventDefault();
    await startEditAdminUser({email, fullname});
    setButtonEditProfile(!buttonEditProfile);
  };

  return (
    <div>
      <Navbar />
      <div className="profile-admin-container">
        <div>
          {/* <h2>Profile</h2> */}
        </div>
        <div className="profile-info-detail">
          <div className="image-container">
            <img
              style={{
                borderRadius: "50%",
                objectPosition: "center",
                objectFit: "fill",
              }}
              src={require("../../icons/placeholder image.webp")}
            />
            <div>
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
                  <span>{user.role}</span>
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
                  <span>
                    <input
                      style={{
                        width: "100%",
                      }}
                      placeholder="Fullname"
                      id="fullname"
                      onChange={(event) => setFullname(event.target.value)}
                      type="text"
                      name="fullname"
                      value={fullname}
                    />
                  </span>
                  <br />
                  <h6>Role</h6>
                  <span>{user.role}</span>
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
