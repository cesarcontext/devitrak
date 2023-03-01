import { createSlice } from "@reduxjs/toolkit";

const response = true

const privacyPolicyUserResponseSlice = createSlice({
  name: "privacyPolicyUserResponse",
  initialState: {
    response
  },
  reducers: {
    onUserPrivacyPolicyResponse: (state, { payload }) => {
      state.response = payload;
    },
  },
});

export default privacyPolicyUserResponseSlice.reducer;

// Action creators are generated for each case reducer function
export const { onUserPrivacyPolicyResponse } =
  privacyPolicyUserResponseSlice.actions;
