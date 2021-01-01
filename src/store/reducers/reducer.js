import * as actionTypes from "../actions";

const INGREDIENT_PRICES = {
  salad: 50,
  cheese: 40,
  meat: 150,
  bacon: 70,
};

const initialState = {
  ingredients: {
    salad: 0,
    cheese: 0,
    meat: 0,
    bacon: 0,
  },
  totalPrice: 100,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingName]: state.ingredients[action.ingName] + 1,
        },
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingName],
      };
    case actionTypes.REMOVE_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingName]: state.ingredients[action.ingName] - 1,
        },
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingName],
      };
    default:
      return state;
  }
};

export default reducer;
