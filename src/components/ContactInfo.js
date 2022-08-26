import React, { useState } from "react";

export const ContactInfo = () => {
  const [name, setName] = useState("");
  const [groupName, setGroupName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  return (
    <section className="vh-100 gradient-custom">
      <div className="container py-5 h-100">
        <div className="row justify-content-center align-items-center h-100">
          <div className="col-12 col-lg-9 col-xl-7">
            <div
              className="card shadow-2-strong card-registration"
              style={{ bordeRadius: "15px" }}
            >
              <div className="card-body p-4 p-md-5">
                <h3 className="mb-4 pb-2 pb-md-0 mb-md-5">
                  ENTER YOUR CONTACT INFORMATION
                </h3>
                <div>
                  <div className="row">
                    <div className="col-md-6 mb-4 d-flex align-items-center">
                      <div className="form-outline datepicker w-100">
                        <input
                          type="text"
                          className="form-control form-control-lg"
                          id="birthdayDate"
                          placeholder="Group name"
                          onChange={(event) => setGroupName(event.target.value)}
                          name="groupName"
                          value={groupName}
                        />
                      </div>
                    </div>
                    <div className="col-md-6 mb-4">
                      <div className="form-outline">
                        <input
                          type="text"
                          id="firstName"
                          name="name"
                          value={name}
                          className="form-control form-control-lg"
                          placeholder="First name"
                          onChange={(event) => setName(event.target.value)}
                        />
                      </div>
                    </div>
                    <div className="col-md-6 mb-4">
                      <div className="form-outline">
                        <input
                          type="text"
                          id="lastName"
                          className="form-control form-control-lg"
                          placeholder="Last name"
                          onChange={(event) => setLastName(event.target.value)}
                          name="lastName"
                          value={lastName}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="row"></div>

                  <div className="row">
                    <div className="col-md-6 mb-4 pb-2">
                      <div className="form-outline">
                        <input
                          type="email"
                          id="emailAddress"
                          className="form-control form-control-lg"
                          placeholder="Email"
                          onChange={(event) => setEmail(event.target.value)}
                          name="Email"
                          value={email}
                        />
                      </div>
                    </div>
                    <div className="col-md-6 mb-4 pb-2">
                      <div className="form-outline">
                        <input
                          type="tel"
                          id="phoneNumber"
                          className="form-control form-control-lg"
                          placeholder="Phone number"
                          onChange={(event) =>
                            setPhoneNumber(event.target.value)
                          }
                          name="Phone number"
                          value={phoneNumber}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
