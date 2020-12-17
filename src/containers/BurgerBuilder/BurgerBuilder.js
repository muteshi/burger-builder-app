import React, { Component } from "react";

import Aux from "../../hoc/Layout/Auxilliary/Auxilliary";
import axiosInstance from "../../axiosOrders";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";

const INGREDIENT_PRICES = {
  salad: 50,
  cheese: 40,
  meat: 150,
  bacon: 70,
};
class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0,
    },
    totalPrice: 100,
    purchaseable: false,
    purchasing: false,
  };

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
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
  };

  render() {
    const disabledBtn = {
      ...this.state.ingredients,
    };
    for (let key in disabledBtn) {
      disabledBtn[key] = disabledBtn[key] <= 0;
    }

    const ingredients = this.state.ingredients;
    return (
      <Aux>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelhander}
        >
          <OrderSummary
            cancelled={this.purchaseCancelhander}
            continued={this.purchaseContinueHandler}
            ingredients={ingredients}
            price={this.state.totalPrice}
          />
        </Modal>

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
  }
}

export default BurgerBuilder;
