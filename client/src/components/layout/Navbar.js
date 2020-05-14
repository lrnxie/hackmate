import React, { Fragment } from "react";
import { Link as RouterLink } from "react-router-dom";
import { connect } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
}));

const Navbar = ({ isAuthenticated, loading }) => {
  const classes = useStyles();

  const links = isAuthenticated ? (
    <Fragment>
      <Button component={RouterLink} to="/" color="inherit">
        User
      </Button>
      <Button component={RouterLink} to="/" color="inherit">
        Log Out
      </Button>
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
});

export default connect(mapStateToProps)(Navbar);
