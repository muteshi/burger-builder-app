import { all, takeEvery, takeLatest } from "redux-saga/effects";
import {
  AUTH_CHECK_STATE,
  AUTH_CHECK_TIMEOUT,
  AUTH_INIT_LOGOUT,
  AUTH_USER,
  INIT_INGREDIENT,
  PURCHASE_BURGER,
  FETCH_ORDERS,
} from "../actions/actionTypes";
import {
  authCheckStateSaga,
  authUserSaga,
  checkAuthTimeoutSaga,
  logoutSaga,
} from "./auth";
import { initIngredientSaga } from "./burgerBuilder";
import { fetchOrdersSaga, purchaseBurgerSaga } from "./order";

export function* watchAuth() {
  yield all([
    takeEvery(AUTH_INIT_LOGOUT, logoutSaga),
    takeEvery(AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga),
    takeEvery(AUTH_USER, authUserSaga),
    takeEvery(AUTH_CHECK_STATE, authCheckStateSaga),
  ]);
}

export function* watchBurgerBuilder() {
  yield takeEvery(INIT_INGREDIENT, initIngredientSaga);
}

export function* watchOrder() {
  yield takeLatest(PURCHASE_BURGER, purchaseBurgerSaga);
  yield takeEvery(FETCH_ORDERS, fetchOrdersSaga);
}
