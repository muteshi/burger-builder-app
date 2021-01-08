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

const addIngredient = (state, action) => {
  const newIng = {
    [action.ingName]: state.ingredients[action.ingName] + 1,
  };
  const newIngs = newObject(state.ingredients, newIng);
  const newState = {
    ingredients: newIngs,
    totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingName],
  };
  return newObject(state, newState);
};

const removeIngredient = (state, action) => {
  const newIng = {
    [action.ingName]: state.ingredients[action.ingName] - 1,
  };
  const newIngs = newObject(state.ingredients, newIng);
  const newState = {
    ingredients: newIngs,
    totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingName],
  };
  return newObject(state, newState);
};

const setIngredients = (state, action) => {
  return newObject(state, {
    ingredients: {
      salad: action.ingredients.salad,
      bacon: action.ingredients.bacon,
      cheese: action.ingredients.cheese,
      meat: action.ingredients.meat,
    },
    error: false,
    totalPrice: 200,
  });
};

const fetchIngredientsFail = (state, action) => {
  return newObject(state, { error: true });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      return addIngredient(state, action);
    case actionTypes.REMOVE_INGREDIENT:
      return removeIngredient(state, action);
    case actionTypes.SET_INGREDIENTS:
      return setIngredients(state, action);
    case actionTypes.FETCH_INGREDIENTS_FAILED:
      return fetchIngredientsFail(state, action);
    default:
      return state;
  }
};

export default reducer;
