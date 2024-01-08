import { createSlice } from "@reduxjs/toolkit";

const stripeSlice = createSlice({
  name: "stripe",
  initialState: {
    customerStripe: undefined,
    amount: 0,
    clientSecret: undefined,
    transactionsHistory: undefined
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
    onAddTransactionHistory:(state, { payload }) => {
      state.transactionsHistory = payload
    }
  },
});

// action creators are generated for each case reducer function

export const { onAddCustomerStripeInfo, onResetCustomerStripeInfo, onAddAmountStripeInfo, onAddPaymentIntent, onAddTransactionHistory } =
  stripeSlice.actions;

export default stripeSlice.reducer;
