import { createSlice } from '@reduxjs/toolkit';

const payment = {
    _id: new Date().getTime(),
    cardNumber: '',
    mm: '',
    yy: '',
    cvc: '',
    zip: ''
}

const paymentInfoSlice = createSlice({
    name: 'paymentInfo',
    initialState: {
        payment: [payment]
    },
        reducers: {
            onAddNewPaymentInfo: (state, { payload }) => {
                state.payment.push( payload );
                state.payment.shift();
              },
        },
    });

// action creators are generated for each case reducer function

export const { onAddNewPaymentInfo } = paymentInfoSlice.actions;

export default paymentInfoSlice.reducer;
