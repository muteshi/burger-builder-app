import axios from "axios";
import { delay, put } from "redux-saga/effects";
import { authStart, logout, logoutSucceed } from "../actions";
import { authFail, authSuccess, checkAuthTimeout } from "../actions/auth";

const registerUrl =
  "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB5m5ttK1kLr1dv4c2rMlNeRftpuoP2TqI";
const loginUrl =
  "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyB5m5ttK1kLr1dv4c2rMlNeRftpuoP2TqI";

export function* logoutSaga(action) {
  yield localStorage.removeItem("token");
  yield localStorage.removeItem("expirationDate");
  yield localStorage.removeItem("userId");
  yield put(logoutSucceed());
}

export function* checkAuthTimeoutSaga(action) {
  yield delay(action.expiryTime * 1000);
  yield put(logout());
}

export function* authUserSaga(action) {
  yield put(authStart());
  const authData = {
    email: action.email,
    password: action.password,
    returnSecureToken: true,
  };
  let url = registerUrl;
  if (action.isSignUp) {
    url = loginUrl;
  }
  try {
    const res = yield axios.post(url, authData);
    const expirationDate = yield new Date(
      new Date().getTime() + res.data.expiresIn * 1000
    );
    yield localStorage.setItem("token", res.data.idToken);
    yield localStorage.setItem("expirationDate", expirationDate);
    yield localStorage.setItem("userId", res.data.localId);
    yield put(authSuccess(res.data.idToken, res.data.localId));
    yield put(checkAuthTimeout(res.data.expiresIn));
  } catch (error) {
    yield put(authFail(error.response.data.error));
  }
}
