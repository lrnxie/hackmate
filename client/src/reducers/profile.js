import { GET_PROFILE, PROFILE_ERROR } from "../actions/actionTypes";

const initialState = {
  profile: null,
  loading: true,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_PROFILE:
      return {
        ...state,
        profile: payload,
        loading: false,
      };

    case PROFILE_ERROR:
      return {
        ...state,
        profile: null,
        loading: false,
      };

    default:
      return state;
  }
}
