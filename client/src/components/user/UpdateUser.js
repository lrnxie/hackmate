import React, { useState } from "react";
import { connect } from "react-redux";

import { updateUser } from "../../actions/auth";
import DeleteUser from "./DeleteUser";

import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import FormHelperText from "@material-ui/core/FormHelperText";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

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

const UpdateUser = ({ loading, user, updateUser }) => {
  const classes = useStyles();
  const [formData, setFormData] = useState({
    name: undefined,
    password: "",
    password2: "",
  });
  const [formErr, setFormErr] = useState({
    nameErr: false,
    passwordErr: false,
    password2Err: false,
  });

  const { name, password, password2 } = formData;
  const { nameErr, passwordErr, password2Err } = formErr;

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const validateName = (name) => {
    if (name === "") {
      setFormErr({ ...formErr, nameErr: true });
      return false;
    } else {
      setFormErr({ ...formErr, nameErr: false });
      return true;
    }
  };

  const validatePassword = (password) => {
    if (password && password.length < 6) {
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
      validatePassword(password) &&
      validatePassword2(password, password2)
    ) {
      updateUser(name, password, user._id);
      setFormData({ name, password: "", password2: "" });
    }
  };

  return (
    !loading && (
      <div className={classes.root}>
        <Typography variant="h6">Account Settings</Typography>
        <form onSubmit={handleSubmit}>
          <FormControl className={classes.textField} error={nameErr}>
            <InputLabel>Name</InputLabel>
            <Input
              name="name"
              value={name === undefined ? user.name : name}
              onChange={handleChange}
              onBlur={() => validateName(name)}
            />
            <FormHelperText hidden={!nameErr}>Name is required</FormHelperText>
          </FormControl>

          <TextField
            className={classes.textField}
            disabled
            label="Email"
            defaultValue={user.email}
            helperText="Email cannot be changed"
          />

          <FormControl className={classes.textField} error={passwordErr}>
            <InputLabel>New password</InputLabel>
            <Input
              type="password"
              name="password"
              value={password}
              onChange={handleChange}
              onBlur={() => validatePassword(password)}
            />
            <FormHelperText hidden={passwordErr}>
              Enter only when changing password
            </FormHelperText>
            <FormHelperText hidden={!passwordErr}>
              Password must be at least 6 characters
            </FormHelperText>
          </FormControl>

          <FormControl className={classes.textField} error={password2Err}>
            <InputLabel>Confirm new password</InputLabel>
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
            Update
          </Button>
        </form>

        <DeleteUser />
      </div>
    )
  );
};

const mapStateToProps = (state) => ({
  loading: state.auth.loading,
  user: state.auth.user,
});

export default connect(mapStateToProps, { updateUser })(UpdateUser);
