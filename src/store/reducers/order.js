import {
  FETCH_ORDERS_FAIL,
  FETCH_ORDERS_START,
  FETCH_ORDERS_SUCCESS,
  PURCHASE_BURGER_FAIL,
  PURCHASE_BURGER_START,
  PURCHASE_BURGER_SUCCESS,
  PURCHASE_INIT,
} from "../actions/actionTypes";
import { newObject } from "../../utility/utility";

const initialState = {
  orders: [],
  loading: false,
  purchased: false,
};

const purchaseInit = (state, action) => {
  return newObject(state, { purchased: false });
};

const burgerPurchaseStart = (state, action) => {
  return newObject(state, { loading: true });
};

const burgerPurchaseSuccess = (state, action) => {
  const newOrder = newObject(action.orderData, { id: action.orderId });
  return newObject(state, {
    loading: false,
    purchased: true,
    orders: state.orders.concat(newOrder),
  });
};

const burgerPurchaseFail = (state) => {
  return newObject(state, { loading: false });
};

const fetchOrdersStart = (state) => {
  return newObject(state, { loading: true });
};

const fetchOrdersSuccess = (state, action) => {
  return newObject(state, { orders: action.orders, loading: false });
};

const fetchOrdersFail = (state) => {
  return newObject(state, { loading: false });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case PURCHASE_INIT:
      return purchaseInit(state, action);
    case PURCHASE_BURGER_START:
      return burgerPurchaseStart(state, action);
    case PURCHASE_BURGER_SUCCESS:
      return burgerPurchaseSuccess(state, action);
    case PURCHASE_BURGER_FAIL:
      return burgerPurchaseFail(state, action);
    case FETCH_ORDERS_START:
      return fetchOrdersStart(state, action);
    case FETCH_ORDERS_SUCCESS:
      return fetchOrdersSuccess(state, action);
    case FETCH_ORDERS_FAIL:
      return fetchOrdersFail(state, action);
    default:
      return state;
  }
};

export default reducer;
