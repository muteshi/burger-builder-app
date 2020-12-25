import React, { Component } from "react";
import { Route } from "react-router";

import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import ContactData from "./ContactData/ContactData";

class Checkout extends Component {
  state = {
    ingredients: {
      salad: 1,
      meat: 1,
      cheese: 1,
      bacon: 1,
    },
  };

  componentDidMount() {
    const query = new URLSearchParams(this.props.location.search);
    const ingredients = {};
    for (let param of query.entries()) {
      ingredients[param[0]] = +param[1];
    }
    this.setState({ ingredients });
  }

  checkoutCancelledHandler = () => {
    this.props.history.goBack();
  };

  checkoutContinuedHandler = () => {
    this.props.history.replace("/checkout/contact-Data");
  };

  render() {
    return (
      <div>
        <CheckoutSummary
          checkoutContinuedHandler={this.checkoutContinuedHandler}
          checkoutCancelledHandler={this.checkoutCancelledHandler}
          ingredients={this.state.ingredients}
        />
        <Route
          component={ContactData}
          path={this.props.match.path + "/contact-data"}
        />
      </div>
    );
  }
}

export default Checkout;
