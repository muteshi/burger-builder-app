import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import axiosInstance from "../../axiosOrders";
import Order from "../../components/Order/Order";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import { fetchOrders } from "../../store/actions/order";

const Orders = (props) => {
  const dispatch = useDispatch();

  const orders = useSelector((state) => {
    return state.order.orders;
  });
  const loading = useSelector((state) => {
    return state.order.loading;
  });
  const token = useSelector((state) => {
    return state.auth.token;
  });
  const userId = useSelector((state) => {
    return state.auth.userId;
  });

  const onFetchOrders = useCallback(
    (token, userId) => dispatch(fetchOrders(token, userId)),
    [dispatch]
  );

  useEffect(() => {
    onFetchOrders(token, userId);
  }, [token, userId, onFetchOrders]);

  let ordersData = <Spinner />;
  if (!loading) {
    ordersData = orders.map((order) => (
      <Order
        key={order.id}
        ingredients={order.ingredients}
        price={+order.price}
      />
    ));
  }

  return <div>{ordersData}</div>;
};

export default withErrorHandler(Orders, axiosInstance);
