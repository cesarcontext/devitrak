import React, { useState } from "react";
import { Navbar } from "../../components/admin/ui/Navbar";
import { useAdminStore } from "../../hooks/useAdminStore";
import "./profile.css";

export const Profile = () => {
  const { user, startEditAdminUser } = useAdminStore();
  const [buttonEditProfile, setButtonEditProfile] = useState(false);
  const [email, setEmail] = useState("");
  const [file, setFile] = useState();

  function handleChange(e) {
    console.log(e.target.files);
    setFile(URL.createObjectURL(e.target.files[0]));
  }

  const handleEditInfoSubmitted = async (event) => {
    event.preventDefault();
    await startEditAdminUser(email);
    await setButtonEditProfile(false);
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
                objectFit: "fill"
              }}
              src={file}
              alt={file}
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
                <input type="file" onChange={handleChange} />
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
                  <span>Name</span>
                  <span>{user.name}</span>
                  <span>Role</span>
                  <span>Administrator</span>
                </div>
                <div className="personal-info-detail">
                  <strong>CONTACT DETAILS</strong>
                  <span>Email</span>
                  <span>{user.email}</span>
                </div>
              </>
            ) : (
              <>
                <div className="personal-info-detail">
                  <strong>YOUR INFORMATION</strong>
                  <span>Name</span>
                  <span>{user.name}</span>
                  <span>Role</span>
                  <span>Administrator</span>
                </div>
                <div className="personal-info-detail">
                  <strong>CONTACT DETAILS</strong>
                  <span>Email</span>
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
