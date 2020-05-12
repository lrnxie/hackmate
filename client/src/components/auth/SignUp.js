import React, { useState } from "react";

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

const SignUp = () => {
  const classes = useStyles();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });
  const [formErr, setFormErr] = useState({
    nameErr: false,
    emailErr: false,
    passwordErr: false,
    password2Err: false,
  });

  const { name, email, password, password2 } = formData;
  const { nameErr, emailErr, passwordErr, password2Err } = formErr;

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const validateName = (name) => {
    if (!name) {
      setFormErr({ ...formErr, nameErr: true });
      return false;
    } else {
      setFormErr({ ...formErr, nameErr: false });
      return true;
    }
  };

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
    if (password.length < 6) {
      setFormErr({ ...formErr, passwordErr: true });
      return false;
    } else {
      setFormErr({ ...formErr, passwordErr: false });
      return true;
    }
  };

  const validatePassword2 = (password, password2) => {
    if (password2 !== password) {
      setFormErr({ ...formErr, password2Err: true });
      return false;
    } else {
      setFormErr({ ...formErr, password2Err: false });
      return true;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      validateName(name) &&
      validateEmail(email) &&
      validatePassword(password) &&
      validatePassword2(password, password2)
    ) {
      console.log({ name, email });
      setFormData({ name: "", email: "", password: "", password2: "" });
    }
  };

  return (
    <div className={classes.root}>
      <Typography variant="h6">Sign Up</Typography>
      <form onSubmit={handleSubmit}>
        <FormControl className={classes.textField} error={nameErr}>
          <InputLabel>Name</InputLabel>
          <Input
            autoFocus
            name="name"
            value={name}
            onChange={handleChange}
            onBlur={() => validateName(name)}
          />
          <FormHelperText hidden={!nameErr}>Name is required</FormHelperText>
        </FormControl>

        <FormControl className={classes.textField} error={emailErr}>
          <InputLabel>Email</InputLabel>
          <Input
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
            Password must be at least 6 characters
          </FormHelperText>
        </FormControl>

        <FormControl className={classes.textField} error={password2Err}>
          <InputLabel>Confirm password</InputLabel>
          <Input
            type="password"
            name="password2"
            value={password2}
            onChange={handleChange}
            onBlur={() => validatePassword2(password, password2)}
          />
          <FormHelperText hidden={!password2Err}>
            Password does not match
          </FormHelperText>
        </FormControl>

        <Button
          className={classes.button}
          variant="contained"
          color="primary"
          type="submit"
        >
          Sign Up
        </Button>
      </form>
    </div>
  );
};

export default SignUp;
