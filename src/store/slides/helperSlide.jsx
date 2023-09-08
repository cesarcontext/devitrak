import { createSlice } from "@reduxjs/toolkit";

const helperSlice = createSlice({
  name: "helper",
  initialState: {
    browser: undefined,
  },
  reducers: {
    onDetectingBrowser: (state, { payload }) => {
      state.browser = payload;
    },
  },
});

// action creators are generated for each case reducer function

export const { onDetectingBrowser } = helperSlice.actions;

export default helperSlice.reducer;
