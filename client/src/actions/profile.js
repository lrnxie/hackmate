import axios from "axios";
import { GET_PROFILE, PROFILE_ERROR } from "./actionTypes";

export const getProfile = (userId) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/profile/${userId}`);

    dispatch({ type: GET_PROFILE, payload: res.data });
  } catch (err) {
    dispatch({ type: PROFILE_ERROR });
  }
};
