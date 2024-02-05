import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { INavigation } from "../interface/navigation.interface";

const initialState: INavigation = {
  width: null,
  isShow: false,
  isShowButton: false,
};

export const navigationSlice = createSlice({
  name: "navigation",
  initialState,
  reducers: {
    setWidth: (state: any, action: PayloadAction<any>) => {
      state.width = action.payload;
    },
    setIsShow: (state: any, action: PayloadAction<boolean>) => {
      state.isShow = action.payload;
    },
    setIsShowButton: (state: any, action: PayloadAction<boolean>) => {
      state.isShowButton = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setWidth, setIsShow, setIsShowButton } = navigationSlice.actions;
export default navigationSlice.reducer;
