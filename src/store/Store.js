import { configureStore } from "@reduxjs/toolkit";
import adminSlice from "./slices/adminSlice";
import contactInfoSlice from "./slices/contactInfoSlice";
import deviceSlice from "./slices/deviceSlice";
import paymentInfoSlice from "./slices/paymentInfoSlice";
import stripeSlice from "./slices/stripeSlice";
import uiSlice from "./slices/uiSlice";

export const store = configureStore({
  reducer: {
    device: deviceSlice,
    ui: uiSlice,
    contactInfo: contactInfoSlice,
    paymentInfo: paymentInfoSlice,
    admin: adminSlice,
    stripe: stripeSlice,
  },
});
