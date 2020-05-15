import {
  USER_LOADED,
  LOGIN_SUCCESS,
  SIGNUP_SUCCESS,
  LOGOUT,
  AUTH_ERROR,
  UPDATE_USER,
  UPDATE_ERROR,
} from "../actions/actionTypes";

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  loading: true,
  user: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload,
      };

    case LOGIN_SUCCESS:
      return {
        ...state,
        token: payload,
        isAuthenticated: true,
        loading: false,
      };

    case SIGNUP_SUCCESS:
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false,
      };

    case LOGOUT:
    case AUTH_ERROR:
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null,
      };

    case UPDATE_USER:
      return {
        ...state,
        loading: false,
        user: payload,
      };

    case UPDATE_ERROR:
      return {
        ...state,
        loading: false,
      };

    default:
      return state;
  }
}
