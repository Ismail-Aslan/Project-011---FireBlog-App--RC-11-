import React, { useState } from "react";
import logo from "./../images/logo.jpeg";
import "./Navbar.css";

export default function Navbar() {
  const [showToggle, setShowToggle] = useState(false);

  return (
    <div className="navbar-container">
      <div className="container-logo">
        <img src={logo} alt="logo" className="logo" />
      </div>
      <div className="container-name">
        <a href="/" className="navbar-link">
          <h1>My Blog</h1>
        </a>
      </div>
      <div
        className="containre-login-btn"

        onClick={() => {
          setShowToggle(!showToggle);
        }}
      >
        <i className="fas fa-user-circle"></i>
      </div>


      {showToggle && (
        <div className={"menu"}>
          <p>Login</p>
          <p>Register</p>
        </div>
      )}


    </div>
  );
}
