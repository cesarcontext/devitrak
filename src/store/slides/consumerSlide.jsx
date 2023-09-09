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
    onResetConsumerInfo:(state)=>{
      state.consumer = undefined
    }
  },
});

// action creators are generated for each case reducer function

export const { onAddConsumerInfo, onResetConsumerInfo } = consumerSlice.actions;

export default consumerSlice.reducer;
