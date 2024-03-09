import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";
import { User } from "../../../models/user";


export interface IAuthState {
  isLoggedIn: boolean,
  showSessionExpiredDialog: boolean,
  user: User,
  token: string,
  refreshToken: string,
  securityUser: any,
}

const initialState: IAuthState = {
  isLoggedIn: false,
  showSessionExpiredDialog: false,
  user: null,
  token: null,
  refreshToken: null,
  securityUser: null,
};


const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    setShowSessionExpiredDialog: ((state, action: PayloadAction<boolean>) => {
      state.showSessionExpiredDialog = action.payload
    }),
    setSecurityUser: ((state, action: PayloadAction<any>) => {
      state.securityUser = action.payload
    }),
    setLoggedInUser: ((state, action: PayloadAction<{ token: string, refreshToken: string }>) => {
      const { token, refreshToken } = action.payload;
      state.token = token;
      state.refreshToken = refreshToken
      state.user = jwtDecode(token);
    }),
    setRegisterStatus: ((state, action: PayloadAction<string>) => {
      const registerStatus  = action.payload;
      state.user.registerStatus = registerStatus

    }),
    setIsLoggedIn: ((state, action: PayloadAction<boolean>) => {
      const isLoggedIn  = action.payload;
      state.isLoggedIn = isLoggedIn

    }),
    resetAuthState: () => {
      return { ...initialState };
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
