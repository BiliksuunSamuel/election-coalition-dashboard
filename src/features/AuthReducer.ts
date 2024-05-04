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
    },
    setAuth: (state, action: { payload: IAuthResponse }) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setUserInfo: (state, action: { payload: IUser }) => {
      state.user = action.payload;
    },
  },
});

export const { handleLogout, setAuth, setUserInfo, setToken } =
  authReducer.actions;
export default authReducer.reducer;
