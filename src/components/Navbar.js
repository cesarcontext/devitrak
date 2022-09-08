import React, { useState, useCallback } from "react";
import { useStytchSession, useStytch } from "@stytch/stytch-react";
import { useNavigate } from "react-router-dom";

export const Navbar = () => {
  const [showNavbar, setShowNavbar] = useState(true);
  const session = useStytchSession();
  const client = useStytch();
  const navigate = useNavigate();

  const user = session.authentication_factors[0].email_factor.email_address;
  console.log(user);

  const switchNavbarState = () => {
    setShowNavbar(!showNavbar);
  };

  const handleLogout = useCallback(async () => {
    await client.session.revoke();
    alert("Your session is finished");
    navigate("/");
  }, [client]);

  return (
    <div
      style={{
        transition: "all .3s",
      }}
      onClick={switchNavbarState}
    >
      {showNavbar ? (
        <nav
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor: "rgba(30, 115, 190, 1)",
            color: "#fff",
          }}
        >
          <div
            style={{
              width: "30%",
            }}
          >
            <h3>DeviTrack</h3>
          </div>
          <div
            style={{
              width: "30%",
            }}
          >
            <div>
              <i
                style={{
                  fontSize: "35px",
                  // position: "absolute",
                  backgroundColor: "rgba(30, 115, 190, 1)",
                  borderRadius: "50%",
                  padding: "15px",
                }}
                className="bi bi-list"
              ></i>
            </div>
          </div>
          <div
            style={{
              width: "30%",
              display: "flex",
            }}
          >
            <div>
              <h4>Event Name</h4>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <div>{user}</div>
              <div>
                {session && <button onClick={handleLogout}>Logout</button>}
              </div>
            </div>
          </div>
        </nav>
      ) : (
        <nav
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor: "rgba(30, 115, 190, 1)",
            color: "#fff",
          }}
        >
          <div
            style={{
              width: "30%",
            }}
          >
            <img
              style={{
                padding: "5px",
                width: "80px",
                height: "80px",
              }}
              src={require("../image/logo.jpg")}
              alt="logo"
            />
          </div>
          <div
            style={{
              width: "30%",
            }}
          >
            <div
              style={{
                marginTop: "50px",
              }}
            >
              <div
                style={{
                  border: "solid 1px #fff",
                  borderRadius: "10px",
                  display: "flex",
                  justifyContent: "space-evenly",
                  alignItems: "center",
                }}
              >
                <i
                  style={{
                    fontSize: "20px",
                    marginRight: "-50px",
                  }}
                  className="bi bi-translate"
                ></i>
                <h4>Change Language</h4>
              </div>
              <i
                style={{
                  fontSize: "35px",
                }}
                className="bi bi-list"
              ></i>
            </div>
          </div>
          <div
            style={{
              width: "30%",
              display: "flex",
              justifyContent: "space-around",
            }}
          >
            <div>
              <h4>Event Name</h4>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <div>{user}</div>
              <div>
                {session && <button onClick={handleLogout}>Logout</button>}
              </div>
            </div>
          </div>
        </nav>
      )}
    </div>
  );
};
