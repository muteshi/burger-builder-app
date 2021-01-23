import { put } from "redux-saga/effects";
import axiosInstance from "../../axiosOrders";
import {
  fetchOrdersFail,
  fetchOrdersStart,
  fetchOrdersSuccess,
  purchaseBurgerFail,
  purchaseBurgerStart,
  purchaseBurgerSuccess,
} from "../actions";

export function* purchaseBurgerSaga(action) {
  yield put(purchaseBurgerStart());
  try {
    const response = yield axiosInstance.post(
      "orders.json?auth=" + action.token,
      action.orderData
    );
    yield put(purchaseBurgerSuccess(response.data.name, action.orderData));
  } catch (error) {
    yield put(purchaseBurgerFail());
  }
}

export function* fetchOrdersSaga(action) {
  yield put(fetchOrdersStart());
  const queryParams =
    "?auth=" +
    action.token +
    '&orderBy="userId"&equalTo="' +
    action.userId +
    '"';
  try {
    const res = yield axiosInstance.get("/orders.json?" + queryParams);
    const fetchedOrders = [];
    for (let key in res.data) {
      fetchedOrders.push({ ...res.data[key], id: key });
    }
    yield put(fetchOrdersSuccess(fetchedOrders));
  } catch (error) {
    yield put(fetchOrdersFail(error));
  }
}
