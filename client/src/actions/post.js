import axios from "axios";
import { setAlert } from "./alert";
import {
  GET_ALL_POSTS,
  GET_USER_POSTS,
  GET_POST,
  ADD_POST,
  DELETE_POST,
  UPDATE_LIKES,
  ADD_COMMENT,
  DELETE_COMMENT,
  CLEAR_POST,
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

export const getUserPosts = (userId) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/posts/${userId}`);

    dispatch({ type: GET_USER_POSTS, payload: res.data });
  } catch (err) {
    dispatch({ type: POST_ERROR });
  }
};

export const getPost = (postId) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/posts/${postId}`);

    dispatch({ type: GET_POST, payload: res.data });
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

export const addComment = (postId, content) => async (dispatch) => {
  try {
    const res = await axios.post(`/api/posts/${postId}/comment`, content);

    dispatch({ type: ADD_COMMENT, payload: res.data.comments });
  } catch (err) {
    dispatch({ type: POST_ERROR });
  }
};

export const deleteComment = (postId, commentId) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/posts/${postId}/comment/${commentId}`);

    dispatch({ type: DELETE_COMMENT, payload: commentId });

    dispatch(setAlert("success", res.data.msg));
  } catch (err) {
    dispatch({ type: POST_ERROR });
  }
};

export const clearPost = () => (dispatch) => {
  dispatch({ type: CLEAR_POST });
};
