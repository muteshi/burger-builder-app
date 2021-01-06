import { ADD_INGREDIENT, REMOVE_INGREDIENT } from "./actionTypes";

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
