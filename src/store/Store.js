import { combineReducers, configureStore } from "@reduxjs/toolkit";
import adminSlice from "./slices/adminSlice";
import contactInfoSlice from "./slices/contactInfoSlice";
import deviceSlice from "./slices/deviceSlice";
import stripeSlice from "./slices/stripeSlice";
import privacyPolicyUserResponseSlice from "./slices/privacyPolicyUserResponseSlice";
import uiSlice from "./slices/uiSlice";
import storage from "redux-persist/es/storage";
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const reducers = combineReducers({
  device: deviceSlice,
  contactInfo: contactInfoSlice,
  admin: adminSlice,
  stripe: stripeSlice,
  privacyPolicyUserResponse: privacyPolicyUserResponseSlice,
  ui: uiSlice
});

const persistedReducers = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
