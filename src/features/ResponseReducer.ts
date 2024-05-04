import { createSlice } from "@reduxjs/toolkit";
import { ResponseReducerState } from "../app/state";

const responseReducer = createSlice({
  name: "ResponseReducer",
  initialState: ResponseReducerState,
  reducers: {
    setPending: (state) => {
      state.loading = true;
      state.message = null;
      state.error = null;
    },
    setMessage: (state, action) => {
      state.error = null;
      state.message = action.payload;
      state.loading = false;
    },
    setError: (state, action) => {
      state.loading = false;
      state.message = null;
      state.error = action.payload;
    },
    clearResponse: (state) => {
      state.loading = false;
      state.error = null;
      state.message = null;
    },
  },
});

export default responseReducer.reducer;
export const { setPending, setError, clearResponse, setMessage } =
  responseReducer.actions;
