import axios from "axios";
import {
  AUTH_FAIL,
  AUTH_START,
  AUTH_SUCCESS,
  AUTH_LOGOUT,
  SET_AUTH_REDIRECT_PATH,
  AUTH_INIT_LOGOUT,
} from "./actionTypes";

const registerUrl =
  "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB5m5ttK1kLr1dv4c2rMlNeRftpuoP2TqI";
const loginUrl =
  "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyB5m5ttK1kLr1dv4c2rMlNeRftpuoP2TqI";

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
  // localStorage.removeItem("token");
  // localStorage.removeItem("expirationDate");
  // localStorage.removeItem("userId");
  return {
    type: AUTH_INIT_LOGOUT,
  };
};

export const checkAuthTimeout = (expiryTime) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(logout());
    }, expiryTime * 1000);
  };
};

export const authFail = (error) => {
  return {
    type: AUTH_FAIL,
    error,
  };
};

export const auth = (email, password, isSignUp) => {
  return (dispatch) => {
    dispatch(authStart());
    const authData = {
      email,
      password,
      returnSecureToken: true,
    };
    let url = registerUrl;
    if (isSignUp) {
      url = loginUrl;
    }

    axios
      .post(url, authData)
      .then((res) => {
        const expirationDate = new Date(
          new Date().getTime() + res.data.expiresIn * 1000
        );
        localStorage.setItem("token", res.data.idToken);
        localStorage.setItem("expirationDate", expirationDate);
        localStorage.setItem("userId", res.data.localId);
        dispatch(authSuccess(res.data.idToken, res.data.localId));
        dispatch(checkAuthTimeout(res.data.expiresIn));
      })
      .catch((err) => {
        dispatch(authFail(err.response.data.error));
      });
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
