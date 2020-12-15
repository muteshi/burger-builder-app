import React, { Component } from "react";

import Aux from "../../../hoc/Layout/Auxilliary/Auxilliary";
import Button from "../../UI/Button/Button";

class OrderSummary extends Component {
  state = {};

  render() {
    const ingSummary = Object.keys(this.props.ingredients).map((ingKey) => {
      return (
        <li key={ingKey}>
          <span style={{ textTransfrom: "capitalize" }}>
            {ingKey}:{this.props.ingredients[ingKey]}
          </span>
        </li>
      );
    });
    return (
      <Aux>
        <h3>Your Order</h3>
        <p>A delicious burger with the following ingredients </p>
        <ul>{ingSummary}</ul>
        <p>Continue to checkout</p>
        <p>
          <strong>Total Price: Ksh {this.props.price.toFixed(2)} </strong>
        </p>
        <Button btnType="Danger" clicked={this.props.cancelled}>
          CANCEL
        </Button>
        <Button btnType="Success" clicked={this.props.continued}>
          CONTINUE
        </Button>
      </Aux>
    );
  }
}

export default OrderSummary;
