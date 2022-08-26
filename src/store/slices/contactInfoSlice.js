import { createSlice } from "@reduxjs/toolkit";

const user = {
    _id: "",
    groupName: "",
    name: "",
    email: "",
    phoneNumber: "",
    amount: ""
};

const contactInfoSlice = createSlice({
  name: "contactInfo",
  initialState: {
    user: [ user ],
  },
  reducers: {
    onAddNewContact: (state, { payload }) => {
      state.user.push( payload );
      state.user.shift();
    },
    onUpdateContact: (state, { payload }) => {
      state.user = state.user.map((contact) => {
        if (contact._id === payload._id) {
          return payload;
        }
        return contact;
      });
    },
  },
});

export default contactInfoSlice.reducer;

// Action creators are generated for each case reducer function
export const { onAddNewContact, onUpdateContact } = contactInfoSlice.actions;
