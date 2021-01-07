import axiosInstance from "../../axiosOrders";
import {
  ADD_INGREDIENT,
  FETCH_INGREDIENTS_FAILED,
  REMOVE_INGREDIENT,
  SET_INGREDIENTS,
} from "./actionTypes";

const INGREDIENT_URL =
  "https://web-gurus-media--1492326682375.firebaseio.com/ingredients.json";

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
  return (dispatch) => {
    axiosInstance
      .get(INGREDIENT_URL)
      .then((response) => {
        dispatch(setIngredient(response.data));
      })
      .catch((error) => {
        dispatch(fetchIngredientsFailed());
      });
  };
};
