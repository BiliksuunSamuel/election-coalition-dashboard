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
  },
});

export const { handleLogout } = authReducer.actions;
export default authReducer.reducer;
