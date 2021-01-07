import * as actionTypes from "../actions/actionTypes";

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
