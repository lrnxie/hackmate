import React, { useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";

import PrivateRoute from "./components/routing/PrivateRoute";
import Navbar from "./components/layout/Navbar";
import Alerts from "./components/layout/Alerts";
import Home from "./components/layout/Home";
import LogIn from "./components/auth/LogIn";
import SignUp from "./components/auth/SignUp";
import UpdateUser from "./components/user/UpdateUser";

import setAuthToken from "./utils/setAuthToken";
import { loadUser } from "./actions/auth";

function App({ loadUser }) {
  useEffect(() => {
    setAuthToken(localStorage.token);
    loadUser();
  });

  return (
    <BrowserRouter>
      <Navbar />
      <Alerts />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={LogIn} />
        <Route exact path="/signup" component={SignUp} />
        <PrivateRoute exact path="/user" component={UpdateUser} />
      </Switch>
    </BrowserRouter>
  );
}

export default connect(null, { loadUser })(App);
