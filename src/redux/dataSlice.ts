import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  company: "",
};

export const slice = createSlice({
  name: "data",
  initialState: initialState,
  reducers: {
    companyChange(state, { payload }) {
      return { ...state, company: payload };
    },
  },
});

export const { companyChange } = slice.actions;
export const selectCompany = (state: { company: string }) => state.company;
export default slice.reducer;
