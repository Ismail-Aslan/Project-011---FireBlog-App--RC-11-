import React, { useContext, useState } from "react";
import logo from "./../images/logo.jpeg";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { logOut } from "./../helpers/firebase"

export default function Navbar() {
  const [showToggle, setShowToggle] = useState(false);
  const { currentUser } = useContext(AuthContext)

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
          {!currentUser ?
            <>
              <Link className="navbar-link" to="/login"  onClick={() => setShowToggle(false)}>Login</Link>
              <Link className="navbar-link" to="/register"  onClick={() => setShowToggle(false)}>Register</Link>

            </>
            :
            <>
              <Link className="navbar-link" to="/profile"  onClick={() => { setShowToggle(false) }}>Profile</Link>
              <Link className="navbar-link" to="/new"  onClick={() => { setShowToggle(false)}}>New</Link>
              <Link className="navbar-link" to="/login"  onClick={() => { setShowToggle(false); logOut() }}>Logout</Link>
            </>

          }
        </div>
      )}


    </div>
  );
}
