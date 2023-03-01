import React, { useState } from "react";
import { Navbar } from "../../components/admin/ui/Navbar";
import { useAdminStore } from "../../hooks/useAdminStore";
import "../../style/pages/admin/profile.css";

export const Profile = () => {
  const { user } = useAdminStore();
  const { startEditAdminUser } = useAdminStore();
  const [buttonEditProfile, setButtonEditProfile] = useState(false);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [question, setQuestion] = useState("");
  const [securityAnswer, setSecurityAnswer] = useState("");
  const [fullname, setFullname] = useState("");

  const handleEditInfoSubmitted = async (event) => {
    event.preventDefault();
    await startEditAdminUser({
      email,
      fullname,
      phone,
      question,
      securityAnswer,
    });
    setButtonEditProfile(!buttonEditProfile);
    setEmail("");
    setPhone("");
    setQuestion("");
    setSecurityAnswer("");
  };
  
  return (
    <div>
      <Navbar />
      <div className="profile-admin-container">
        <div></div>
        <div className="profile-info-detail">
          <div className="personal-info-box">
            {buttonEditProfile === false ? (
              <>
                <div className="info-detail">
                  <strong>YOUR INFORMATION</strong>
                  <br/>
                  <h6>
                    Name: <span>{user.name}</span>
                  </h6>

                  <h6>
                    Role: <span>{user.role}</span>
                  </h6>
                </div>
                <div className="info-detail">
                  <strong>CONTACT DETAILS</strong>
                  <br/>
                  <h6>
                    Phone: <span>{user.phone}</span>
                  </h6>
                  <h6>
                    Email: <span>{user.email}</span>
                  </h6>
                </div>
              </>
            ) : (
              <>
                <div className="info-detail">
                  <strong>YOUR INFORMATION</strong>
                  <br/>
                  <h6>Name: </h6>
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
                  <h6>
                    Role: <span>{user.role}</span>
                  </h6>
                </div>
                <div className="info-detail">
                  <strong>CONTACT DETAILS</strong>
                  <br/>
                  <div>
                    <h6>Phone: </h6>
                    <span>
                      <input
                        placeholder="Phone"
                        id="phone"
                        onChange={(event) => setPhone(event.target.value)}
                        type="text"
                        name="phone"
                        value={phone}
                      />
                    </span>
                  </div>
                  <div>
                    <h6>Email: </h6>
                    <span>
                      <input
                        placeholder="Email"
                        id="email"
                        onChange={(event) => setEmail(event.target.value)}
                        type="text"
                        name="email"
                        value={email}
                      />
                    </span>
                  </div>
                  <div>
                    <h6>Security Question: </h6>
                    <select
                      value={question}
                      name="question"
                      onChange={(event) => setQuestion(event.target.value)}
                    >
                      <option defaultValue="">Choose your question</option>
                      <option value="What was the make of your first car?">
                        What was the make of your first car?
                      </option>
                      <option value="In what city were you born?">
                        In what city were you born?
                      </option>
                      <option value="What is the name of your favorite pet?">
                        What is the name of your favorite pet?
                      </option>
                      <option value="What is your mother's maiden name?">
                        What is your mother's maiden name?
                      </option>
                      <option value="What high school did you attend?">
                        What high school did you attend?
                      </option>
                      <option value="What was your favorite food as a child?">
                        What was your favorite food as a child?
                      </option>
                      <option value="Where did you meet your spouse?">
                        Where did you meet your spouse?
                      </option>
                      <option value="What year was your father (or mother) born?">
                        What year was your father (or mother) born?
                      </option>
                    </select>
                  </div>
                  <div>
                    {" "}
                    {question !== "" && (
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Provide an answer"
                        name="securityAnswer"
                        value={securityAnswer}
                        onChange={(event) =>
                          setSecurityAnswer(event.target.value)
                        }
                      />
                    )}
                  </div>
                </div>
              </>
            )}

            <div>
              {buttonEditProfile === false ? (
                <>
                  <p
                    className="link-edit-profile"
                    onClick={() => setButtonEditProfile(!buttonEditProfile)}
                  >
                    EDIT PERFIL <i className="bi bi-pencil" />{" "}
                  </p>
                </>
              ) : (
                <>
                  <div className="container-buttons-edit">
                    <p
                      onClick={() => setButtonEditProfile(false)}
                      className="btn btn-delete"
                    >
                      <i className="bi bi-x-square" />
                    </p>{" "}
                    <p
                      onClick={handleEditInfoSubmitted}
                      className="btn btn-create"
                    >
                      <i className="bi bi-save" />
                    </p>{" "}
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
