import { createSlice } from "@reduxjs/toolkit";
import {
  AssetsResponse,
  CompaniesResponse,
} from "../services/companies.service";

export type dataType = {
  selectedCompanyId: string;
  companies: CompaniesResponse;
  selectedComponentId: string;
  assets: AssetsResponse;
};

const initialState: dataType = {
  selectedCompanyId: "",
  companies: [],
  selectedComponentId: "",
  assets: [],
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
    selectedComponentIdChange(state, { payload }) {
      return { ...state, selectedComponentId: payload };
    },
    assetsChange(state, { payload }) {
      return { ...state, assets: payload };
    },
  },
});

export const {
  selectedCompanyIdChange,
  companiesChange,
  selectedComponentIdChange,
  assetsChange,
} = slice.actions;
export const selectData = (state: { data: dataType }) => state.data;
export default slice.reducer;
