import { createSlice } from "@reduxjs/toolkit";

const creditCardState = {
  id: "",
  cardName: "",
  cardNumber: "",
  country: "",
  cvv: "",
  mm: "",
  yy: "",
  zip: "",
  user: { //send user info to relate credit card with user
    id: "",
  },
  device: "" //send deivce info to determine the number of devices required
};

const paymentInfoSlice = createSlice({
  name: "paymentInfo",
  initialState: {
    creditCardState: [ creditCardState ]
  },
  reducers: {
    onAddNewCreditCardInfo: (state, { payload }) => {
        state.creditCardState.push( payload );
        state.creditCardState.shift();
      },
      onUpdateCreditCardInfo: (state, { payload }) => {
        state.creditCardState = state.creditCardState.map((creditCard) => {
          if (creditCard.id === payload.id) {
            return payload;
            
          }
          state.creditCardState.shift()
          return creditCardState;
  
        });
        state.creditCardState.shift()
      },
  },
});

// action creators are generated for each case reducer function

export const { onAddNewCreditCardInfo, onUpdateCreditCardInfo } = paymentInfoSlice.actions;

export default paymentInfoSlice.reducer;
