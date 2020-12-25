import React, { Component } from "react";

import Aux from "../../hoc/Layout/Auxilliary/Auxilliary";
import axiosInstance from "../../axiosOrders";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import Spinner from "../../components/UI/Spinner/Spinner";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

const INGREDIENT_URL =
  "https://web-gurus-media--1492326682375.firebaseio.com/ingredients.json";
const INGREDIENT_PRICES = {
  salad: 50,
  cheese: 40,
  meat: 150,
  bacon: 70,
};
class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    totalPrice: 100,
    purchaseable: false,
    purchasing: false,
    loading: false,
    error: false,
  };

  componentDidMount() {
    axiosInstance
      .get(INGREDIENT_URL)
      .then((response) => {
        this.setState({ ingredients: response.data });
      })
      .catch((error) => {
        this.setState({ error: true });
      });
  }

  addIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    const newCount = oldCount + 1;
    const updatedIngs = {
      ...this.state.ingredients,
    };
    updatedIngs[type] = newCount;
    const ingPrice = INGREDIENT_PRICES[type];
    const defaultPrice = this.state.totalPrice;
    const newPrice = defaultPrice + ingPrice;
    this.setState({ totalPrice: newPrice, ingredients: updatedIngs });
    this.updatePurchaseState(updatedIngs);
  };

  removeIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    if (oldCount <= 0) return;
    const newCount = oldCount - 1;
    const updatedIngs = {
      ...this.state.ingredients,
    };
    updatedIngs[type] = newCount;
    const ingPrice = INGREDIENT_PRICES[type];
    const defaultPrice = this.state.totalPrice;
    const newPrice = defaultPrice - ingPrice;
    this.setState({ totalPrice: newPrice, ingredients: updatedIngs });
    this.updatePurchaseState(updatedIngs);
  };

  updatePurchaseState = (updatedIngs) => {
    const total = Object.keys(updatedIngs)
      .map((ingkey) => {
        return updatedIngs[ingkey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    this.setState({ purchaseable: total > 0 });
  };

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  purchaseCancelhander = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    this.setState({ loading: true });
    const order = {
      ingredients: this.state.ingredients,
      price: this.state.price,
      customer: {
        name: "Paul Muteshi",
        address: {
          street: "Nairobi rd",
          country: "Kenya",
        },
        email: "test@test.com",
      },
      deliveryMethod: "fastest",
    };
    axiosInstance
      .post("orders.json", order)
      .then((response) => {
        this.setState({ loading: false, purchasing: false });
      })
      .catch((error) => {
        this.setState({ loading: false, purchasing: false });
      });
  };

  checkoutClickedHandler = () => {
    const queryParams = [];
    for (let i in this.state.ingredients) {
      queryParams.push(
        encodeURIComponent(i) +
          "=" +
          encodeURIComponent(this.state.ingredients[i])
      );
    }
    const queryString = queryParams.join("&");
    this.props.history.push({
      pathname: "/checkout",
      search: "?" + queryString,
    });
  };

  render() {
    const ingredients = this.state.ingredients;

    const disabledBtn = {
      ...this.state.ingredients,
    };

    for (let key in disabledBtn) {
      disabledBtn[key] = disabledBtn[key] <= 0;
    }

    let orderSummary = null;

    let burger = this.state.error ? (
      <h3>Ingredients cannot be loaded</h3>
    ) : (
      <Spinner />
    );

    if (this.state.ingredients) {
      // Burger rendering
      burger = (
        <Aux>
          <Burger ingredients={ingredients} />
          <BuildControls
            disabled={disabledBtn}
            ingAdded={this.addIngredientHandler}
            ingRemoved={this.removeIngredientHandler}
            ordered={this.purchaseHandler}
            price={this.state.totalPrice}
            purchaseable={this.state.purchaseable}
          />
        </Aux>
      );

      // Order summary rendering logic
      orderSummary = (
        <OrderSummary
          cancelled={this.purchaseCancelhander}
          continued={this.checkoutClickedHandler}
          ingredients={ingredients}
          price={this.state.totalPrice}
        />
      );

      if (this.state.loading) {
        orderSummary = <Spinner />;
      }
    }

    return (
      <Aux>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelhander}
        >
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

export default withErrorHandler(BurgerBuilder, axiosInstance);
