import React, { useState,useContext } from "react";
import { continueWithGoogle, createUser } from './../helpers/firebase';
import { useHistory } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { Redirect } from "react-router";


export default function Register() {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');

  const [password, setPassword] = useState('');
  const { currentUser } = useContext(AuthContext);

  const handleSubmit = () => {
    console.log(name);
    const user = { email, password,name };
   
    createUser(user.email, user.password, user.name);
    history.push('/');
  }

  const handleProviderRegister = () => {
    continueWithGoogle();
    history.push('/');
  }


  if (currentUser) {
    return <Redirect to="/" />;
  }

  return (
    <div className="register">
      
      <div className="register-form">
        <h1 className="form-title display-3">REGISTER</h1>
        <form id="register">

          <div className="mb-3">
            <label htmlFor="displayname" className="form-label display-4">Name</label>
            <input type="email" className="form-control" id="name" placeholder="Enter your name..." onChange={e => setName(e.target.value)} />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label display-4">Email</label>
            <input type="email" className="form-control" id="email" placeholder="Enter your email address..." onChange={e => setEmail(e.target.value)} />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label display-4">Password</label>
            <input type="password" className="form-control" id="password" placeholder="Enter your password..." onChange={e => setPassword(e.target.value)} />
          </div>

          <input type="button" className="btn btn-primary form-control" value="REGISTER" onClick={handleSubmit} />

        </form>

        <button className="btn btn-primary form-control" onClick={handleProviderRegister}>Continue with Google</button>
      </div>
      
    </div>
  );
};

