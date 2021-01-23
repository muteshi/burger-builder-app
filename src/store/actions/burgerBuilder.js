import {
  ADD_INGREDIENT,
  FETCH_INGREDIENTS_FAILED,
  INIT_INGREDIENT,
  REMOVE_INGREDIENT,
  SET_INGREDIENTS,
} from "./actionTypes";

export const addIngredient = (name) => {
  return {
    type: ADD_INGREDIENT,
    ingName: name,
  };
};
export const removeIngredient = (name) => {
  return {
    type: REMOVE_INGREDIENT,
    ingName: name,
  };
};

export const setIngredient = (ingredients) => {
  return {
    type: SET_INGREDIENTS,
    ingredients,
  };
};
export const fetchIngredientsFailed = () => {
  return {
    type: FETCH_INGREDIENTS_FAILED,
  };
};

export const initIngredient = () => {
  return {
    type: INIT_INGREDIENT,
  };
};
