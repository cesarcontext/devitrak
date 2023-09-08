import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/es/storage";
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  persistStore,
} from "redux-persist";
import consumerSlide from "./slides/consumerSlide";
import deviceSlides from "./slides/deviceSlides";
import eventSlide from "./slides/eventSlide";
import articleHandlerSlide from "./slides/articleHandlerSlide";
import stripeSlide from "./slides/stripeSlide";
import helperSlide from "./slides/helperSlide";

const persistConfig = {
  key: "root",
  storage,
};

const reducers = combineReducers({
  consumer: consumerSlide,
  deviceHandler: deviceSlides,
  event:eventSlide,
  articleHandler: articleHandlerSlide,
  stripe: stripeSlide,
  helper: helperSlide,
});

const persistedReducers = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

let persistor = persistStore(store)

export { store, persistor }