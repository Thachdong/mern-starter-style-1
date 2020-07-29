import axios from "axios";
import {
  SET_USER_REQUEST,
  SET_USER_SUCCESS,
  SET_USER_FAIL,
} from "./actionTypes";

export const setUserRequest = () => ({
  type: SET_USER_REQUEST,
});

export const setUserFail = (error) => ({
  type: SET_USER_FAIL,
  error,
});

export const setUserSuccess = (user) => ({
  type: SET_USER_SUCCESS,
  user,
});

//Async actions
export const registerAction = (user) => {
  return async (dispatch) => {
    dispatch(setUserRequest());
    try {
      await axios.post("/user/register", user);
      dispatch(setUserSuccess({}));
      return { success: true };
    } catch (error) {
      const err = error.response.data.message;
      dispatch(setUserFail(err));
      return { err, success: false };
    }
  };
};

export const loginAction = (user) => {
  return async (dispatch) => {
    dispatch(setUserRequest());
    try {
      const result = await axios.post("/user/login", user);
      const newUser = result.data.data;
      localStorage.setItem("access-token", JSON.stringify(newUser.token));
      dispatch(setUserSuccess(newUser));
      return { user: newUser, success: true };
    } catch (error) {
      if (!error.response.data.message) {
        const err = "Username or Password wrong!";
        dispatch(setUserFail(err));
        return { err, success: false };
      }
      const err = error.response.data.message;
      dispatch(setUserFail(err));
      return { err, success: false };
    }
  };
};

export const logoutAction = () => {
  return async (dispatch) => {
    dispatch(setUserRequest());
    const token = await JSON.parse(localStorage.getItem("access-token"));
    try {
      await axios.post(
        "/user/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      await localStorage.removeItem("access-token");
      dispatch(setUserSuccess({}));
      return true;
    } catch (error) {
      dispatch(setUserFail(error.response.data));
      return error.response.data;
    }
  };
};

export const getUserAction = () => {
  return async (dispatch) => {
    const token = await JSON.parse(localStorage.getItem("access-token"));
    if (token) {
      dispatch(setUserRequest());
      try {
        const user = await axios.get("/user/user", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const userInfo = user.data.data;
        dispatch(setUserSuccess(userInfo));
      } catch (error) {
        dispatch(setUserFail(error.response.data));
      }
    }
  };
};
