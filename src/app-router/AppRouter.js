import React from "react";

import { BrowserRouter as Router, Route } from "react-router-dom";
import Dashboard from "./../pages/Dashboard";
import Login from "./../pages/Login";
import Register from "./../pages/Register";
import Navbar from "./../components/Navbar";
import Profile from "./../pages/Profile";
import NewBlog from "./../pages/NewBlog";
import { AuthContextProvider } from "../contexts/AuthContext";
import PrivateRouter from "./PrivateRouter";

const Approuter = () => {
  return (
    <AuthContextProvider>
      <Router>
        <Navbar />
        <Route exact path="/" component={Dashboard} />
        <PrivateRouter exact path="/profile" component={Profile} />
        <PrivateRouter exact path="/new" component={NewBlog} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
      </Router>
    </AuthContextProvider>
  );
};

export default Approuter;
