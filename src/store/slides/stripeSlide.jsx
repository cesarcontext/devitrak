import { createSlice } from "@reduxjs/toolkit";

const stripeSlice = createSlice({
  name: "stripe",
  initialState: {
    customerStripe: undefined,
    amount: 0,
    clientSecret: undefined,
    transactionsHistory: undefined,
  },
  reducers: {
    onAddCustomerStripeInfo: (state, { payload }) => {
      state.customerStripe = payload;
    },
    onResetCustomerStripeInfo: (state) => {
      state.customerStripe = undefined;
    },
    onAddAmountStripeInfo: (state, { payload }) => {
      state.amount = payload;
    },
    onAddPaymentIntent: (state, { payload }) => {
      state.clientSecret = payload;
    },
    onAddTransactionHistory: (state, { payload }) => {
      state.transactionsHistory = payload;
    },
    onHardResetStripe: (state) => {
      state.customerStripe = undefined;
      state.amount = 0;
      state.clientSecret = undefined;
      state.transactionsHistory = undefined;
    },
  },
});

// action creators are generated for each case reducer function

export const {
  onAddCustomerStripeInfo,
  onResetCustomerStripeInfo,
  onAddAmountStripeInfo,
  onAddPaymentIntent,
  onAddTransactionHistory,
  onHardResetStripe,
} = stripeSlice.actions;

export default stripeSlice.reducer;
