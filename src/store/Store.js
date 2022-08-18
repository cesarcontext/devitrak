import { configureStore } from '@reduxjs/toolkit'
import contactInfoSlice from './slices/contactInfoSlice'
import deviceSlice from './slices/deviceSlice'
import uiSlice from './slices/uiSlice'

export const store = configureStore({
  reducer: {
    device: deviceSlice,
    ui: uiSlice,
    contactInfo: contactInfoSlice
  },
})