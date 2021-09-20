import {BrowserRouter, Switch, Route} from "react-router-dom"
import React from 'react'
import Navbar from "../components/Navbar"
import Register from "../pages/Register"
import Login from "../pages/Login"
import Dashboard from "../pages/Dashboard"

export default function AppRouter() {


    return (
        <BrowserRouter>
            <Navbar/>
            
            <Switch>
                <Route exact path="/" component={Dashboard}/>
                <Route exact path="/register" component={Register}/>
                <Route exact path="/login" component={Login}/>
            </Switch>
        </BrowserRouter>
    )
}


