import axiosInstance from "../../axiosOrders";
import { PURCHASE_BURGER_FAIL, PURCHASE_BURGER_SUCCESS } from "./actionTypes";

export const purchaseBurgerSuccess = (id, orderData) => {
  return {
    type: PURCHASE_BURGER_SUCCESS,
    orderId: id,
    orderData,
  };
};

export const purchaseBurgerFail = (error) => {
  return {
    type: PURCHASE_BURGER_FAIL,
    error,
  };
};
export const purchaseBurgerStart = (orderData) => {
  return (dispatch) => {
    axiosIntance
      .post("orders.json", orderData)
      .then((response) => {
        dispatch(purchaseBurgerSuccess(response.data, orderData));
      })
      .catch((error) => {
        dispatch(purchaseBurgerFail(error));
      });
  };
};
