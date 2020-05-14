import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { logIn } from "../../actions/auth";

import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import FormHelperText from "@material-ui/core/FormHelperText";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 600,
    margin: "auto",
    textAlign: "center",
    marginTop: theme.spacing(5),
  },
  textField: {
    width: 300,
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    marginTop: theme.spacing(2),
  },
  button: {
    width: 300,
    marginTop: theme.spacing(5),
  },
}));

const LogIn = ({ logIn, isAuthenticated }) => {
  const classes = useStyles();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [formErr, setFormErr] = useState({
    emailErr: false,
    passwordErr: false,
  });

  const { email, password } = formData;
  const { emailErr, passwordErr } = formErr;

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const validateEmail = (email) => {
    // eslint-disable-next-line
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(email.trim())) {
      setFormErr({ ...formErr, emailErr: true });
      return false;
    } else {
      setFormErr({ ...formErr, emailErr: false });
      return true;
    }
  };

  const validatePassword = (password) => {
    if (!password) {
      setFormErr({ ...formErr, passwordErr: true });
      return false;
    } else {
      setFormErr({ ...formErr, passwordErr: false });
      return true;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateEmail(email) && validatePassword(password)) {
      logIn(email, password);
      setFormData({ email: "", password: "" });
    }
  };

  if (isAuthenticated) {
    return <Redirect to="/" />;
  }

  return (
    <div className={classes.root}>
      <Typography variant="h6">Log In</Typography>
      <form onSubmit={handleSubmit}>
        <FormControl className={classes.textField} error={emailErr}>
          <InputLabel>Email</InputLabel>
          <Input
            autoFocus
            name="email"
            value={email}
            onChange={handleChange}
            onBlur={() => validateEmail(email)}
          />
          <FormHelperText hidden={!emailErr}>
            Email address is not valid
          </FormHelperText>
        </FormControl>

        <FormControl className={classes.textField} error={passwordErr}>
          <InputLabel>Password</InputLabel>
          <Input
            type="password"
            name="password"
            value={password}
            onChange={handleChange}
            onBlur={() => validatePassword(password)}
          />
          <FormHelperText hidden={!passwordErr}>
            Password is required
          </FormHelperText>
        </FormControl>

        <Button
          className={classes.button}
          variant="contained"
          color="primary"
          type="submit"
        >
          Log In
        </Button>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { logIn })(LogIn);
