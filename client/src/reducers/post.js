import {
  GET_ALL_POSTS,
  GET_POST,
  ADD_POST,
  DELETE_POST,
  UPDATE_LIKES,
  CLEAR_POST,
  POST_ERROR,
} from "../actions/actionTypes";

const initialState = {
  posts: [],
  post: null,
  loading: true,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_ALL_POSTS:
      return {
        ...state,
        posts: payload,
        loading: false,
      };

    case GET_POST:
      return {
        ...state,
        post: payload,
        loading: false,
      };

    case ADD_POST:
      return {
        ...state,
        posts: [payload, ...state.posts],
        loading: false,
      };

    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== payload),
        post: state.post && state.post._id === payload ? null : state.post,
        loading: false,
      };

    case UPDATE_LIKES:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === payload.postId ? { ...post, likes: payload.likes } : post
        ),
        post:
          state.post && state.post._id === payload.postId
            ? { ...state.post, likes: payload.likes }
            : state.post,
        loading: false,
      };

    case CLEAR_POST:
      return {
        ...state,
        post: null,
        loading: true,
      };

    case POST_ERROR:
      return {
        ...state,
        loading: false,
      };

    default:
      return state;
  }
}
