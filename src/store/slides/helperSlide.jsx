import { createSlice } from "@reduxjs/toolkit";

const helperSlice = createSlice({
  name: "helper",
  initialState: {
    browser: undefined,
    schemeStyle: undefined
  },
  reducers: {
    onDetectingBrowser: (state, { payload }) => {
      state.browser = payload;
    },
    onAddSchemeStyle:(state, { payload }) => {
      state.schemeStyle = payload
    }
  },
});

// action creators are generated for each case reducer function

export const { onDetectingBrowser, onAddSchemeStyle } = helperSlice.actions;

export default helperSlice.reducer;
