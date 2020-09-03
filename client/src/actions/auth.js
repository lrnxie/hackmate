import axios from "axios";
import { setAlert } from "./alert";
import {
  USER_LOADED,
  LOGIN_SUCCESS,
  SIGNUP_SUCCESS,
  LOGOUT,
  AUTH_ERROR,
  UPDATE_USER,
  DELETE_USER,
  UPDATE_ERROR,
} from "./actionTypes";

export const loadUser = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/auth");

    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });

    return res.data._id;
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
      payload: res.data.token,
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
      payload: res.data.token,
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

export const logOut = () => (dispatch) => {
  dispatch({ type: LOGOUT });
  dispatch(setAlert("info", "You have logged out"));
};

export const updateUser = (name, password, userId) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ name, password });

  try {
    const res = await axios.put(`/api/users/${userId}`, body, config);

    dispatch({
      type: UPDATE_USER,
      payload: res.data.user,
    });

    dispatch(loadUser());

    dispatch(setAlert("success", res.data.msg));
  } catch (err) {
    const errors = err.response.data.error;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert("warning", error)));
    }
    dispatch({
      type: UPDATE_ERROR,
    });
  }
};

export const deleteUser = (userId) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/users/${userId}`);

    dispatch({ type: DELETE_USER });

    dispatch(setAlert("info", res.data.msg));
  } catch (err) {
    const errors = err.response.data.error;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert("error", error)));
    }
    dispatch({
      type: UPDATE_ERROR,
    });
  }
};
