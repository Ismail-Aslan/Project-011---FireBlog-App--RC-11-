import React, { useState } from "react";
import { continueWithGoogle, signIn } from './../helpers/firebase';
import { useHistory } from "react-router-dom";

export default function Register() {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = () => {
    const user = { email, password };
   
    signIn(user.email, user.password);
    history.push('/');
  }

  const handleProviderRegister = () => {
    continueWithGoogle();
    history.push('/');
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

        <button className="btn btn-primary form-control" onClick={handleProviderRegister}>Continue with Google</button>
      </div>
      
    </div>
  );
};
