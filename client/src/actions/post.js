import axios from "axios";
import { setAlert } from "./alert";
import {
  GET_ALL_POSTS,
  ADD_POST,
  DELETE_POST,
  UPDATE_LIKES,
  POST_ERROR,
} from "./actionTypes";

export const getAllPosts = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/posts");

    dispatch({ type: GET_ALL_POSTS, payload: res.data });
  } catch (err) {
    dispatch({ type: POST_ERROR });
  }
};

export const addPost = (content) => async (dispatch) => {
  try {
    const res = await axios.post("/api/posts", content);

    dispatch({ type: ADD_POST, payload: res.data.post });

    dispatch(setAlert("success", res.data.msg));
  } catch (err) {
    dispatch({ type: POST_ERROR });
  }
};

export const deletePost = (postId) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/posts/${postId}`);

    dispatch({ type: DELETE_POST, payload: postId });

    dispatch(setAlert("success", res.data.msg));
  } catch (err) {
    dispatch({ type: POST_ERROR });
  }
};

export const addLike = (postId) => async (dispatch) => {
  try {
    const res = await axios.post(`/api/posts/${postId}/like`);

    dispatch({
      type: UPDATE_LIKES,
      payload: { postId, likes: res.data.likes },
    });
  } catch (err) {
    dispatch({ type: POST_ERROR });
  }
};

export const removeLike = (postId) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/posts/${postId}/like`);

    dispatch({
      type: UPDATE_LIKES,
      payload: { postId, likes: res.data.likes },
    });
  } catch (err) {
    dispatch({ type: POST_ERROR });
  }
};
