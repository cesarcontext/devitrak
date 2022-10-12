import { createSlice } from "@reduxjs/toolkit";

const users = [
  {
    id: "",
    groupName: "",
    name: "",
    email: "",
    phoneNumber: "",
    status: "",
  }];

  const errorMessage = undefined

const contactInfoSlice = createSlice({
  name: "contactInfo",
  initialState: {
    users,
    errorMessage
  },
  reducers: {
    onCheckContact: (state, { payload }) => {
      state.users.push(payload);
      state.users.shift();
      state.errorMessage = undefined
    },
    onAddNewContact: (state, { payload }) => {
      state.users.push(payload);
      state.users.shift();
      state.errorMessage = undefined
    },
    onUpdateContact: (state, { payload }) => {
      state.users.push(payload);
      state.users.shift();
      state.errorMessage = undefined
    },
  },
});

export default contactInfoSlice.reducer;

// Action creators are generated for each case reducer function
export const { onAddNewContact, onUpdateContact, onCheckContact } = contactInfoSlice.actions;
