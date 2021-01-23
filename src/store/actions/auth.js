import {
  AUTH_FAIL,
  AUTH_START,
  AUTH_SUCCESS,
  SET_AUTH_REDIRECT_PATH,
  AUTH_INIT_LOGOUT,
  AUTH_LOGOUT,
  AUTH_CHECK_TIMEOUT,
  AUTH_USER,
} from "./actionTypes";

export const authStart = () => {
  return {
    type: AUTH_START,
  };
};

export const authSuccess = (token, userId) => {
  return {
    type: AUTH_SUCCESS,
    idToken: token,
    userId,
  };
};

export const logout = () => {
  return {
    type: AUTH_INIT_LOGOUT,
  };
};
export const logoutSucceed = () => {
  return {
    type: AUTH_LOGOUT,
  };
};

export const checkAuthTimeout = (expiryTime) => {
  return {
    type: AUTH_CHECK_TIMEOUT,
    expiryTime: expiryTime,
  };
};

export const authFail = (error) => {
  return {
    type: AUTH_FAIL,
    error,
  };
};

export const auth = (email, password, isSignUp) => {
  return {
    type: AUTH_USER,
    email,
    password,
    isSignUp,
  };
};

export const setAuthRedirectPath = (path) => {
  return {
    type: SET_AUTH_REDIRECT_PATH,
    path,
  };
};

export const authCheckState = () => {
  return (dispatch) => {
    const token = localStorage.getItem("token");
    if (!token) {
      dispatch(logout());
    } else {
      const expirationTime = new Date(localStorage.getItem("expirationDate"));
      if (expirationTime <= new Date()) {
        dispatch(logout());
      } else {
        const userId = localStorage.getItem("userId");
        dispatch(authSuccess(token, userId));
        dispatch(
          checkAuthTimeout(
            expirationTime.getTime() - new Date().getTime() / 1000
          )
        );
      }
    }
  };
};
