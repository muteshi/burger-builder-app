import { put } from "redux-saga/effects";
import axiosInstance from "../../axiosOrders";
import { fetchIngredientsFailed, setIngredient } from "../actions";

const INGREDIENT_URL =
  "https://web-gurus-media--1492326682375.firebaseio.com/ingredients.json";

export function* initIngredientSaga(action) {
  try {
    const response = yield axiosInstance.get(INGREDIENT_URL);
    yield put(setIngredient(response.data));
  } catch (error) {
    yield put(fetchIngredientsFailed());
  }
}
