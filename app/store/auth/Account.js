import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  token: null,
  data: {},
};

const slice = createSlice({
  name: "account",
  initialState,
  reducers: {
    onLoginSucces: (state, action) => {
      state.token = action?.payload;
    },
  },
});

export const { onLoginSucces } = slice.actions;

export default slice.reducer;
