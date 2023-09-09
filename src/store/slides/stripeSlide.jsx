import { createSlice } from "@reduxjs/toolkit";

const stripeSlice = createSlice({
  name: "stripe",
  initialState: {
    customerStripe: undefined,
  },
  reducers: {
    onAddCustomerStripeInfo: (state, { payload }) => {
      state.customerStripe = payload;
    },
    onResetCustomerStripeInfo: (state) => {
      state.customerStripe = undefined
    }
  },
});

// action creators are generated for each case reducer function

export const { onAddCustomerStripeInfo, onResetCustomerStripeInfo } = stripeSlice.actions;

export default stripeSlice.reducer;
