import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: "",
};

export const slice = createSlice({
  name: "data",
  initialState: initialState,
  reducers: {
    dataChange(state, { payload }) {
      return { ...state, data: payload };
    },
  },
});

export const { dataChange } = slice.actions;
export const selectData = (state: { data: string }) => state.data;
export default slice.reducer;
