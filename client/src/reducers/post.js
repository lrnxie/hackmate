import { GET_ALL_POSTS, POST_ERROR } from "../actions/actionTypes";

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

    case POST_ERROR:
      return {
        ...state,
        loading: false,
      };

    default:
      return state;
  }
}
