import {
  SET_USER_REQUEST,
  SET_USER_SUCCESS,
  SET_USER_FAIL,
} from "../actions/actionTypes";

const initState = {
  isLoading: false,
  error: false,
  userName: "",
  email: "",
};

export const user = (state = initState, action) => {
  switch (action.type) {
    case SET_USER_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case SET_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: false,
        userName: action.user.userName,
        email: action.user.email,
        ...action.user,
      };
    case SET_USER_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    default:
      return state;
  }
};
