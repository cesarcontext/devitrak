import { createSlice } from "@reduxjs/toolkit";

const stripeSlice = createSlice({
  name: "stripe",
  initialState: {
    customer: undefined,
    paymentIntent: [],
    paymentIntentSelected: undefined,
    paymentIntentDetailSelected: [],
    paymentIntentReceiversAssigned: undefined,
  },
  reducers: {
    onAddNewPaymentIntent: (state, { payload }) => {
        state.paymentIntent.push(payload)
    },
    onAddPaymentIntentSelected: (state, { payload }) => {
      state.paymentIntentSelected = payload
    },
    onAddPaymentIntentDetailSelected: (state, { payload }) => {
      state.paymentIntentDetailSelected= payload
    },
    onCheckReceiverPaymentIntent: (state, { payload}) => {
      state.paymentIntentReceiversAssigned = payload
    },
    onAddCustomer: (state, { payload})=> {
      state.customer = payload
    }
  },
});

export default stripeSlice.reducer;

// Action creators are generated for each case reducer function
export const { onAddNewPaymentIntent, onAddPaymentIntentSelected, onAddPaymentIntentDetailSelected, onCheckReceiverPaymentIntent, onAddCustomer } = stripeSlice.actions;