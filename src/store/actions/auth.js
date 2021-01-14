import axios from "axios";
import { AUTH_FAIL, AUTH_START, AUTH_SUCCESS } from "./actionTypes";

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
        console.log(res);
        dispatch(authSuccess(res.data.idToken, res.data.localId));
      })
      .catch((err) => {
        dispatch(authFail(err.response.data.error));
      });
  };
};
