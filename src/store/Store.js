import { combineReducers, configureStore } from "@reduxjs/toolkit";
import adminSlice from "./slices/adminSlice";
import contactInfoSlice from "./slices/contactInfoSlice";
import deviceSlice from "./slices/deviceSlice";
import paymentInfoSlice from "./slices/paymentInfoSlice";
import stripeSlice from "./slices/stripeSlice";
import uiSlice from "./slices/uiSlice";
import storage from "redux-persist/es/storage"
import {persistReducer} from "redux-persist"

const persistConfig = {
  key: "root",
  version: 1,
  storage
}

const reducers = combineReducers({
    device: deviceSlice,
    ui: uiSlice,
    contactInfo: contactInfoSlice,
    paymentInfo: paymentInfoSlice,
    admin: adminSlice,
    stripe: stripeSlice,
})

const persistedReducers = persistReducer(persistConfig, reducers)
export const store = configureStore({
  reducer: persistedReducers,
});
