import { createSlice } from "@reduxjs/toolkit";

const users = 
  {
    id: "",
    groupName: "",
    name: "",
    email: "",
    phoneNumber: "",
    category:"",
    status: "",
  };

  const errorMessage = undefined

const contactInfoSlice = createSlice({
  name: "contactInfo",
  initialState: {
    users,
    errorMessage
  },
  reducers: {
    onCheckContact: (state, { payload }) => {
      state.users = payload;
      state.errorMessage = undefined
    },
    onAddNewContact: (state, { payload }) => {
      state.users = payload;
      state.errorMessage = undefined
    },
    onUpdateContact: (state, { payload }) => {
      state.users = payload;
      state.errorMessage = undefined
    },
  },
});

export default contactInfoSlice.reducer;

// Action creators are generated for each case reducer function
export const { onAddNewContact, onUpdateContact, onCheckContact } = contactInfoSlice.actions;
