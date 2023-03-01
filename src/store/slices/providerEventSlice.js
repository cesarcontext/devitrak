import { createSlice } from "@reduxjs/toolkit";

const providerEventSlice = createSlice({
  name: "providerEvent",
  initialState: {
    provider: undefined,
    eventSelected:undefined
  },
  reducers: {
    onAddProvider: (state, { payload }) => {
      state.provider = payload;
    },
    onAddEventSelected: (state, { payload }) => {
        state.eventSelected = payload;
      },
  },
});

export default providerEventSlice.reducer;

// Action creators are generated for each case reducer function
export const { onAddEventSelected, onAddProvider} = providerEventSlice.actions;