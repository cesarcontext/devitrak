import { createSlice } from "@reduxjs/toolkit";

const stripeSlice = createSlice({
  name: "stripe",
  initialState: {
    paymentIntent: []
  },
  reducers: {
    onAddNewPaymentIntent: (state, { payload }) => {
        state.paymentIntent.push(payload)
    }
  },
});

export default stripeSlice.reducer;

// Action creators are generated for each case reducer function
export const { onAddNewPaymentIntent } = stripeSlice.actions;