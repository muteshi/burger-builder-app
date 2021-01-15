import { AUTH_SUCCESS } from "../actions/actionTypes";
import reducer from "./auth";

describe("auth reducer", () => {
  it("should return the initial state", () => {
    expect(reducer(undefined, {})).toEqual({
      token: null,
      userId: null,
      error: null,
      loading: false,
      authRedirectPath: "/",
    });
  });
  it("should store a token upon login", () => {
    expect(
      reducer(
        {
          token: null,
          userId: null,
          error: null,
          loading: false,
          authRedirectPath: "/",
        },
        {
          type: AUTH_SUCCESS,
          idToken: "some-token",
          userId: "some-user-id",
        }
      )
    ).toEqual({
      token: "some-token",
      userId: "some-userid",
      error: null,
      loading: false,
      authRedirectPath: "/",
    });
  });
});
