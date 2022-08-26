import { createSlice } from "@reduxjs/toolkit";

const paymentState = {
  cardName: "",
  cardNumber: "",
  country: "",
  cvv: "",
  mm: "",
  yy: "",
  zip: "",
};

const paymentInfoSlice = createSlice({
  name: "paymentInfo",
  initialState: {
    paymentState: [ paymentState ]
  },
  reducers: {
    onAddNewPaymentInfo: (state, { payload }) => {
        state.paymentState.push( payload );
        // state.paymentState.shift();
      },
  },
});

// action creators are generated for each case reducer function

export const { onAddNewPaymentInfo } = paymentInfoSlice.actions;

export default paymentInfoSlice.reducer;
