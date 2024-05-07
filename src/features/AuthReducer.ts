import IUser, { IAuthResponse } from "./../models/UserModel";
import { createSlice } from "@reduxjs/toolkit";
import { UserReducerState } from "../app/state";

const authReducer = createSlice({
  name: "AuthReducer",
  initialState: UserReducerState,
  reducers: {
    handleLogout: (state) => {
      state.user = null;
      state.token = null;
      state.prefix = null;
    },
    setAuth: (state, action: { payload: IAuthResponse }) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.prefix = action.payload.prefix;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setUserInfo: (state, action: { payload: IUser }) => {
      state.user = action.payload;
    },
    setOtpPrefix: (state, action) => {
      state.prefix = action.payload;
    },
  },
});

export const { handleLogout, setAuth, setUserInfo, setToken, setOtpPrefix } =
  authReducer.actions;
export default authReducer.reducer;
