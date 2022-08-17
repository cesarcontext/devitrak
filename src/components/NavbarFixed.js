import React from "react";
import { Link } from "react-router-dom";

import "./navbar-fixed.css";

export const NavbarFixed = () => {
  return (
    <div>
      <nav className="navbar-fixed">
        <Link to="/">
          <div className='icon-span'>
          <i className="bi bi-headset"></i>
            <span>REQUEST DEVICES</span>
          </div>
        </Link>
        <Link to='/moreInfo'>
          <div className='icon-span'>
          <i className="bi bi-info-circle"></i>
            <span>MORE INFO</span>
          </div>
        </Link>
        <Link to='/event'>
          <div className='icon-span'>
          <i className="bi bi-calendar2-event"></i>
            <span>EVENT SCHEDULED</span>
          </div>
        </Link>
        <Link to='/profile'>
          <div className='icon-span'>
          <i className="bi bi-person"></i>
            <span>MY PROFILE</span>
          </div>
        </Link>
      </nav>
    </div>
  );
};
