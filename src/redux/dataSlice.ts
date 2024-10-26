import { createSlice } from "@reduxjs/toolkit";
import { CompaniesResponse } from "../services/companies.service";

export type dataType = {
  selectedCompanyId: string;
  companies: CompaniesResponse;
};

const initialState: dataType = {
  selectedCompanyId: "",
  companies: [],
};

export const slice = createSlice({
  name: "data",
  initialState: initialState,
  reducers: {
    selectedCompanyIdChange(state, { payload }) {
      return { ...state, selectedCompanyId: payload };
    },
    companiesChange(state, { payload }) {
      return { ...state, companies: payload };
    },
  },
});

export const { selectedCompanyIdChange, companiesChange } = slice.actions;
export const selectData = (state: { data: dataType }) => state.data;
export default slice.reducer;
