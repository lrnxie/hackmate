import axios from "axios";
import { GET_ALL_POSTS } from "./actionTypes";

export const getAllPosts = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/posts");

    dispatch({ type: GET_ALL_POSTS, payload: res.data });
  } catch (err) {}
};
