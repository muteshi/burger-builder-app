import React, { useCallback, useEffect, useState } from "react";

import Aux from "../../hoc/Layout/Auxilliary/Auxilliary";
import axiosInstance from "../../axiosOrders";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import Spinner from "../../components/UI/Spinner/Spinner";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import { useDispatch, useSelector } from "react-redux";
import {
  addIngredient,
  initIngredient,
  purchaseInit,
  removeIngredient,
  setAuthRedirectPath,
} from "../../store/actions/";

const BurgerBuilder = ({ history, ...props }) => {
  const [purchasing, setPurchasing] = useState(false);

  const dispatch = useDispatch();

  const onIngAdded = (ingName) => dispatch(addIngredient(ingName));
  const onIngRemoved = (ingName) => dispatch(removeIngredient(ingName));
  const onInitIngs = useCallback(() => dispatch(initIngredient()), [dispatch]);
  const onPurchaseInit = () => dispatch(purchaseInit());
  const onSetAuthRedirectPath = (path) => dispatch(setAuthRedirectPath(path));

  const ings = useSelector((state) => {
    return state.burgerBuilder.ingredients;
  });
  const price = useSelector((state) => {
    return state.burgerBuilder.totalPrice;
  });
  const error = useSelector((state) => {
    return state.burgerBuilder.error;
  });

  const isAuthenticated = useSelector((state) => {
    return state.auth.token !== null;
  });

  useEffect(() => {
    onInitIngs();
  }, [onInitIngs]);

  const updatePurchaseState = (updatedIngs) => {
    const total = Object.keys(updatedIngs)
      .map((ingkey) => {
        return updatedIngs[ingkey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    return total > 0;
  };

  const purchaseHandler = () => {
    if (isAuthenticated) {
      setPurchasing(true);
    } else {
      onSetAuthRedirectPath("/checkout");
      history.push("/auth");
    }
  };

  const purchaseCancelhander = () => {
    setPurchasing(false);
  };

  const checkoutClickedHandler = () => {
    onPurchaseInit();
    history.push("/checkout");
  };

  const ingredients = ings;

  const disabledBtn = {
    ...ingredients,
  };

  for (let key in disabledBtn) {
    disabledBtn[key] = disabledBtn[key] <= 0;
  }

  let orderSummary = null;

  let burger = error ? <h3>Ingredients cannot be loaded</h3> : <Spinner />;

  if (ingredients) {
    // Burger rendering
    burger = (
      <Aux>
        <Burger ingredients={ingredients} />
        <BuildControls
          disabled={disabledBtn}
          ingAdded={onIngAdded}
          ingRemoved={onIngRemoved}
          isAuth={isAuthenticated}
          ordered={purchaseHandler}
          price={price}
          purchaseable={updatePurchaseState(ings)}
        />
      </Aux>
    );

    // Order summary rendering logic
    orderSummary = (
      <OrderSummary
        cancelled={purchaseCancelhander}
        continued={checkoutClickedHandler}
        ingredients={ingredients}
        price={price}
      />
    );
  }

  return (
    <Aux>
      <Modal show={purchasing} modalClosed={purchaseCancelhander}>
        {orderSummary}
      </Modal>
      {burger}
    </Aux>
  );
};

export default withErrorHandler(BurgerBuilder, axiosInstance);
