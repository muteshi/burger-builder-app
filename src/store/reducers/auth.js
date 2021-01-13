import { AUTH_FAIL, AUTH_START, AUTH_SUCCESS } from "../actions/actionTypes";
import { newObject } from "../utility/utility";

const initialState = {
  token: null,
  userId: null,
  error: null,
  loading: false,
};
const authStart = (state, action) => {
  return newObject(state, {
    error: null,
    loading: true,
  });
};
const authFail = (state, action) => {
  return newObject(state, {
    error: action.error,
    loading: false,
  });
};
const authSuccess = (state, action) => {
  return newObject(state, {
    error: null,
    loading: false,
    token: action.idToken,
    userId: action.userId,
  });
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_START:
      return authStart(state, action);
    case AUTH_SUCCESS:
      return authSuccess(state, action);
    case AUTH_FAIL:
      return authFail(state, action);
    default:
      return state;
  }
};

export default reducer;
