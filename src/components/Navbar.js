import React from "react";

export const Navbar = () => {
  return (
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
        {/* <img
          style={{
            padding: "5px",
          }}
          src="https://picsum.photos/100/100"
          alt=""
        /> */}
      </div>
      <div
        style={{
          width: "30%",
        }}>
        <div>
          <h4>Change Language</h4>
        </div>
      </div>
      <div
        style={{
          width: "30%",
        }}>
        <h4>Event Name</h4>
      </div>
    </nav>
  );
};
