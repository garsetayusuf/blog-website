import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IPaginator } from "../interface/paginator.interface";

const initialState: IPaginator = {
  currentPage: 1,
  currentSize: 10,
  totalPage: 10,
};

export const paginatorSlice = createSlice({
  name: "paginator",
  initialState,
  reducers: {
    setCurrentPage: (state: any, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setCurrentSize: (state: any, action: PayloadAction<number>) => {
      state.currentSize = action.payload;
    },
    setTotalPage: (state: any, action: PayloadAction<number>) => {
      state.totalPage = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setCurrentPage, setCurrentSize, setTotalPage } =
  paginatorSlice.actions;
export default paginatorSlice.reducer;
