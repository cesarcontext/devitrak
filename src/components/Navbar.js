import React, { useState } from "react";

export const Navbar = () => {
  const [showNavbar, setShowNavbar] = useState(true);

  const switchNavbarState = () => {
    setShowNavbar(!showNavbar);
  };
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
                  padding: "15px"
                }}
                className="bi bi-list"
              ></i>
            </div>
          </div>
          <div
            style={{
              width: "30%",
            }}
          >
            <h4>Event Name</h4>
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
                height: "80px"

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
            }}
          >
            <h4>Event Name</h4>
          </div>
        </nav>
      )}
    </div>
  );
};
