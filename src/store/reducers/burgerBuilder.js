import * as actionTypes from "../actions/actionTypes";
import { newObject } from "../utility/utility";

const INGREDIENT_PRICES = {
  salad: 50,
  cheese: 40,
  meat: 150,
  bacon: 70,
};

const initialState = {
  ingredients: null,
  totalPrice: 200,
  error: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    //using utility function
    case actionTypes.ADD_INGREDIENT:
      const newIng = {
        [action.ingName]: state.ingredients[action.ingName] + 1,
      };
      const newIngs = newObject(state.ingredients, newIng);

      const newState = {
        ingredients: newIngs,
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingName],
      };
      return newObject(state, newState);

    case actionTypes.REMOVE_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingName]: state.ingredients[action.ingName] - 1,
        },
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingName],
      };
    case actionTypes.SET_INGREDIENTS:
      return {
        ...state,
        error: false,
        totalPrice: 200,
        ingredients: {
          salad: action.ingredients.salad,
          bacon: action.ingredients.bacon,
          cheese: action.ingredients.cheese,
          meat: action.ingredients.meat,
        },
      };
    case actionTypes.FETCH_INGREDIENTS_FAILED:
      return {
        ...state,
        error: true,
      };
    default:
      return state;
  }
};

export default reducer;
