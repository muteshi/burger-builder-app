import React, { Component } from "react";

import Aux from "../../hoc/Layout/Auxilliary/Auxilliary";
import axiosInstance from "../../axiosOrders";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import Spinner from "../../components/UI/Spinner/Spinner";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import { connect } from "react-redux";
import { ADD_INGREDIENT, REMOVE_INGREDIENT } from "../../store/actions";

const INGREDIENT_URL =
  "https://web-gurus-media--1492326682375.firebaseio.com/ingredients.json";

class BurgerBuilder extends Component {
  state = {
    purchasing: false,
    loading: false,
    error: false,
  };

  componentDidMount() {
    // axiosInstance
    //   .get(INGREDIENT_URL)
    //   .then((response) => {
    //     this.setState({ ingredients: response.data });
    //   })
    //   .catch((error) => {
    //     this.setState({ error: true });
    //   });
  }

  updatePurchaseState = (updatedIngs) => {
    const total = Object.keys(updatedIngs)
      .map((ingkey) => {
        return updatedIngs[ingkey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    return total > 0;
  };

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  purchaseCancelhander = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {};

  checkoutClickedHandler = () => {
    this.props.history.push("/checkout");
  };

  render() {
    const ingredients = this.props.ings;

    const disabledBtn = {
      ...ingredients,
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

    if (ingredients) {
      // Burger rendering
      burger = (
        <Aux>
          <Burger ingredients={ingredients} />
          <BuildControls
            disabled={disabledBtn}
            ingAdded={this.props.onIngAdded}
            ingRemoved={this.props.onIngRemoved}
            ordered={this.purchaseHandler}
            price={this.props.price}
            purchaseable={this.updatePurchaseState(this.props.ings)}
          />
        </Aux>
      );

      // Order summary rendering logic
      orderSummary = (
        <OrderSummary
          cancelled={this.purchaseCancelhander}
          continued={this.checkoutClickedHandler}
          ingredients={ingredients}
          price={this.props.price}
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

const mapStateToProps = (state) => {
  return {
    ings: state.ingredients,
    price: state.totalPrice,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onIngAdded: (ingName) => dispatch({ type: ADD_INGREDIENT, ingName }),
    onIngRemoved: (ingName) => dispatch({ type: REMOVE_INGREDIENT, ingName }),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axiosInstance));
