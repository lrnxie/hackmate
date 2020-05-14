import axios from "axios";
import { setAlert } from "./alert";
import {
  USER_LOADED,
  LOGIN_SUCCESS,
  SIGNUP_SUCCESS,
  AUTH_ERROR,
} from "./actionTypes";

export const loadUser = () => async (dispatch) => {
  try {
    const res = await axios.get("api/auth");

    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

export const logIn = (email, password) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ email, password });

  try {
    const res = await axios.post("/api/auth", body, config);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });

    dispatch(loadUser());

    dispatch(setAlert("success", res.data.msg));
  } catch (err) {
    const errors = err.response.data.error;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert("error", error)));
    }
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

export const signUp = (name, email, password) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ name, email, password });

  try {
    const res = await axios.post("/api/users", body, config);

    dispatch({
      type: SIGNUP_SUCCESS,
      payload: res.data,
    });

    dispatch(loadUser());

    dispatch(setAlert("success", res.data.msg));
  } catch (err) {
    const errors = err.response.data.error;
    console.log(errors);
    if (errors) {
      errors.forEach((error) => dispatch(setAlert("error", error)));
    }
    dispatch({
      type: AUTH_ERROR,
    });
  }
};
