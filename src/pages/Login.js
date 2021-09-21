import React, { useState, useContext } from "react";
import { continueWithGoogle, logIn } from './../helpers/firebase';
import { useHistory } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { Redirect } from "react-router";


export default function Login() {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = () => {
    const user = { email, password };
   
    logIn(user.email, user.password);
    history.push('/');
  }

  const handleProviderRegister = () => {
    continueWithGoogle();
    history.push('/');
  }

  const { currentUser } = useContext(AuthContext);

  if (currentUser) {
    return <Redirect to="/" />;
  }

  return (
    <div className="register">
      
      <div className="register-form">
        <h1 className="form-title display-3">LOGIN</h1>
        <form id="register">

          <div className="mb-3">
            <label htmlFor="email" className="form-label display-4">Email</label>
            <input type="email" className="form-control" id="email" placeholder="Enter your email address..." onChange={e => setEmail(e.target.value)} />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label display-4">Password</label>
            <input type="password" className="form-control" id="password" placeholder="Enter your password..." onChange={e => setPassword(e.target.value)} />
          </div>
          <input type="button" className="btn btn-primary form-control" value="LOGIN" onClick={handleSubmit} />
        </form>

        <button className="btn btn-dark form-control" onClick={handleProviderRegister}>Continue with <img className="google-logo" src="https://upload.wikimedia.org/wikipedia/commons/4/4a/Logo_2013_Google.png" alt="" /></button>
      </div>
      
    </div>
  );
};
