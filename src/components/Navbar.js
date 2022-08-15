import React from "react";

export const Navbar = () => {
  return (
    <nav style={{ display: 'flex', justifyContent: 'space-between', backgroundColor: '#212529', color: '#fff'}}>
      <div>
        <img src="https://picsum.photos/100" alt="" />
      </div>
      <div>
        <div><h4>Change Language</h4></div>
      </div>
      <div>
        <h4>Event Name</h4>
      </div>
    </nav>
  );
};
