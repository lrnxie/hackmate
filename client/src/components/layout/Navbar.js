import React, { Fragment } from "react";
import { Link as RouterLink } from "react-router-dom";
import { connect } from "react-redux";
import { logOut } from "../../actions/auth";

import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import Tooltip from "@material-ui/core/Tooltip";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
}));

const Navbar = ({ isAuthenticated, loading, user, logOut }) => {
  const classes = useStyles();

  const nameInitials = (name) => {
    const split = name.split(" ");
    return split.length === 2 ? split[0][0] + split[1][0] : split[0][0];
  };

  const list = (
    <List>
      <ListItem
        button
        component={RouterLink}
        to={user && `/profile/${user._id}`}
      >
        <ListItemText primary="My Profile" />
      </ListItem>
      <ListItem button component={RouterLink} to="/user">
        <ListItemText primary="Account Settings" />
      </ListItem>
      <ListItem button onClick={logOut} component={RouterLink} to="/login">
        <ListItemText primary="Log Out" />
      </ListItem>
    </List>
  );

  const links = isAuthenticated ? (
    <Fragment>
      {user && (
        <Tooltip arrow interactive title={list}>
          <Button color="inherit">
            <Avatar>
              <Typography>{nameInitials(user.name)}</Typography>
            </Avatar>
          </Button>
        </Tooltip>
      )}
    </Fragment>
  ) : (
    <Fragment>
      <Button component={RouterLink} to="/login" color="inherit">
        Log In
      </Button>
      <Button component={RouterLink} to="/signup" color="inherit">
        Sign Up
      </Button>
    </Fragment>
  );

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            <Link
              component={RouterLink}
              to="/"
              color="inherit"
              underline="none"
            >
              Hackmate
            </Link>
          </Typography>
          {!loading && links}
        </Toolbar>
      </AppBar>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  loading: state.auth.loading,
  user: state.auth.user,
});

export default connect(mapStateToProps, { logOut })(Navbar);
