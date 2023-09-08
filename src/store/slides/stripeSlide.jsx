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
  },
});

// action creators are generated for each case reducer function

export const { onAddCustomerStripeInfo } = stripeSlice.actions;

export default stripeSlice.reducer;
