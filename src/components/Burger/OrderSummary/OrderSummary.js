import React from "react";

import Aux from "../../../hoc/Auxilliary";

const orderSummary = (props) => {
  const ingSummary = Object.keys(props.ingredients).map((ingKey) => {
    return (
      <li key={ingKey}>
        <span style={{ textTransfrom: "capitalize" }}>
          {ingKey}:{props.ingredients[ingKey]}
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
    </Aux>
  );
};

export default orderSummary;
