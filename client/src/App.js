import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Navbar from "./components/layout/Navbar";
import Alerts from "./components/layout/Alerts";
import Home from "./components/layout/Home";
import LogIn from "./components/auth/LogIn";
import SignUp from "./components/auth/SignUp";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Alerts />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={LogIn} />
        <Route exact path="/signup" component={SignUp} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
