import React from "react";

import Aux from "../../../hoc/Auxilliary";
import Button from "../../UI/Button/Button";

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
      <p>
        <strong>Total Price: Ksh {props.price.toFixed(2)} </strong>
      </p>
      <Button btnType="Danger" clicked={props.cancelled}>
        CANCEL
      </Button>
      <Button btnType="Success" clicked={props.continued}>
        CONTINUE
      </Button>
    </Aux>
  );
};

export default orderSummary;
