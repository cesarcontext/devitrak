import { createSlice } from "@reduxjs/toolkit";

const users = {
    id: "",
    groupName: "",
    name: "",
    email: "",
    phoneNumber: "",
}

const contactInfoSlice = createSlice({
  name: "contactInfo",
  initialState: {
    users: [ users ],
  },
  reducers: {
    onAddNewContact: (state, { payload }) => {
      state.users.push( payload );
      state.users.shift();
    },
    onUpdateContact: (state, { payload }) => {
      state.users = state.users.map((user) => {
        if (user.id === payload.id) {
          return payload;
        }
        return users;
      });
    },
  },
});

export default contactInfoSlice.reducer;

// Action creators are generated for each case reducer function
export const { onAddNewContact, onUpdateContact } = contactInfoSlice.actions;
