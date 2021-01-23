import { takeEvery } from "redux-saga/effects";
import {
  AUTH_CHECK_TIMEOUT,
  AUTH_INIT_LOGOUT,
  AUTH_USER,
} from "../actions/actionTypes";
import { authUserSaga, checkAuthTimeoutSaga, logoutSaga } from "./auth";

export function* watchAuth() {
  yield takeEvery(AUTH_INIT_LOGOUT, logoutSaga);
  yield takeEvery(AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga);
  yield takeEvery(AUTH_USER, authUserSaga);
}
