import { createSlice } from "@reduxjs/toolkit";

const companySlice = createSlice({
  name: "company",
  initialState: {
    company: undefined,
  },
  reducers: {
    onAddCompanyInfo: (state, { payload }) => {
      state.company = payload;
    },
    onResetCompanyInfo:(state)=>{
      state.company = undefined
    }
  },
});

// action creators are generated for each case reducer function

export const { onAddCompanyInfo, onResetCompanyInfo } = companySlice.actions;

export default companySlice.reducer;
