import { createSlice } from "@reduxjs/toolkit";

const consumerSlice = createSlice({
  name: "consumer",
  initialState: {
    consumer: undefined,
  },
  reducers: {
    onAddConsumerInfo: (state, { payload }) => {
      state.consumer = payload;
    },
  },
});

// action creators are generated for each case reducer function

export const { onAddConsumerInfo } = consumerSlice.actions;

export default consumerSlice.reducer;
