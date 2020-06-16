import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { signUp } from "../../actions/auth";
import { useFormik } from "formik";
import * as Yup from "yup";

import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 600,
    margin: "auto",
    textAlign: "center",
    marginTop: theme.spacing(3),
  },
  form: {
    "& > *": {
      width: 300,
      margin: theme.spacing(1),
    },
  },
}));

const SignUp = ({ signUp, isAuthenticated }) => {
  const classes = useStyles();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      password2: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().trim().required("Name is required"),
      email: Yup.string()
        .trim()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
      password2: Yup.string()
        .oneOf([Yup.ref("password")], "Passwords do not match")
        .required("Confirm your password"),
    }),
    onSubmit: (values) => {
      signUp(values.name.trim(), values.email.trim(), values.password);
    },
  });

  if (isAuthenticated) {
    return <Redirect to="/" />;
  }

  return (
    <div className={classes.root}>
      <Typography variant="h6">Sign Up</Typography>

      <form onSubmit={formik.handleSubmit} className={classes.form}>
        <TextField
          autoFocus
          label="Name"
          name="name"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.name && formik.errors.name !== undefined}
          helperText={formik.touched.name && formik.errors.name}
        />

        <TextField
          label="Email"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.email && formik.errors.email !== undefined}
          helperText={formik.touched.email && formik.errors.email}
        />

        <TextField
          label="Password"
          type="password"
          name="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.password && formik.errors.password !== undefined
          }
          helperText={formik.touched.password && formik.errors.password}
        />

        <TextField
          label="Confirm Password"
          type="password"
          name="password2"
          value={formik.values.password2}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.password2 && formik.errors.password2 !== undefined
          }
          helperText={formik.touched.password2 && formik.errors.password2}
        />

        <Button variant="contained" color="primary" type="submit">
          Sign Up
        </Button>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { signUp })(SignUp);
