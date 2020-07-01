import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { connect } from "react-redux";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import Popover from "@material-ui/core/Popover";
import MenuList from "@material-ui/core/MenuList";
import MenuItem from "@material-ui/core/MenuItem";

import { logOut } from "../../actions/auth";

const Navbar = ({ loading, user, logOut }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const nameInitials = (name) => {
    const split = name.split(" ");
    return split.length === 2 ? split[0][0] + split[1][0] : split[0][0];
  };

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const menu = (
    <Popover
      open={Boolean(anchorEl)}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
    >
      <MenuList>
        <MenuItem
          onClick={handleClose}
          component={RouterLink}
          to={user && `/profile/${user._id}`}
        >
          My Profile
        </MenuItem>
        <MenuItem onClick={handleClose} component={RouterLink} to="/user">
          Account Settings
        </MenuItem>
        <MenuItem
          onClick={() => {
            logOut();
            handleClose();
          }}
          component={RouterLink}
          to="/"
        >
          Log Out
        </MenuItem>
      </MenuList>
    </Popover>
  );

  const links = user ? (
    <>
      <Button
        color="inherit"
        style={{ textTransform: "none" }}
        onClick={handleClick}
      >
        <Avatar>
          <Typography>{nameInitials(user.name)}</Typography>
        </Avatar>
      </Button>
      {menu}
    </>
  ) : (
    <>
      <Button component={RouterLink} to="/login" color="inherit">
        Log In
      </Button>
      <Button component={RouterLink} to="/signup" color="inherit">
        Sign Up
      </Button>
    </>
  );

  return (
    <div style={{ flexGrow: 1 }}>
      <AppBar position="static" elevation={1}>
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
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
