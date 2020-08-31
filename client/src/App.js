import React, { useEffect } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { ThemeProvider } from "@material-ui/styles";

import setAuthToken from "./utils/setAuthToken";
import theme from "./utils/muiTheme";
import { loadUser } from "./actions/auth";
import PrivateRoute from "./components/routing/PrivateRoute";
import Navbar from "./components/layout/Navbar";
import Alerts from "./components/layout/Alerts";
import PostList from "./components/posts/PostList";
import LogIn from "./components/auth/LogIn";
import SignUp from "./components/auth/SignUp";
import UpdateUser from "./components/user/UpdateUser";
import Profile from "./components/profile/Profile";
import UpdateProfile from "./components/profile/UpdateProfile";
import PostDetail from "./components/post/PostDetail";

function App({ loadUser }) {
  useEffect(() => {
    setAuthToken(localStorage.token);
    loadUser();
  }, [loadUser]);

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Navbar />
        <Alerts />
        <Switch>
          <Route exact path="/" component={PostList} />
          <Route exact path="/login" component={LogIn} />
          <Route exact path="/signup" component={SignUp} />
          <PrivateRoute exact path="/user" component={UpdateUser} />
          <PrivateRoute exact path="/profile/edit" component={UpdateProfile} />
          <Route exact path="/profile/:id" component={Profile} />
          <Route exact path="/post/:id" component={PostDetail} />
          <Redirect from="*" to="/" />
        </Switch>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default connect(null, { loadUser })(App);
