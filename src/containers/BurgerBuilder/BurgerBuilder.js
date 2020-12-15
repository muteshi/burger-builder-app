import React, { Component } from "react";

import Aux from "../../hoc/Auxilliary";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0,
    },
  };
  render() {
    const ingredients = this.state.ingredients;
    return (
      <Aux>
        <Burger ingredients={ingredients} />
        <BuildControls />
      </Aux>
    );
  }
}

export default BurgerBuilder;
