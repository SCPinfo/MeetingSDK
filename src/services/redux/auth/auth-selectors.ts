import { createSelector } from "@reduxjs/toolkit";

const authSelector = (state) => state.auth;

/**
 * Returns the logged in status.
 *
 * @returns {Boolean}
 */
export const isLoggedInSelector = createSelector(
  authSelector,
  ( authState) => {
    return authState.isLoggedIn;
  }
);


/**
 * Returns User Token.
 *
 * @returns {String}
 */
export const userTokenSelector = createSelector(
  authSelector,
  ( authState) => {
    return authState.token;
  }
)


/**
 * Returns Logged in user .
 *
 * @returns {User}
 */
export const currentUserSelector = createSelector(
  authSelector,
  (authState) => {
    return authState.user ;
  }
);
