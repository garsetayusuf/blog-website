import { createSlice } from "@reduxjs/toolkit";
import { FormState } from "../interface/form.interface";

const initialState: FormState = {
  id: 0,
  name: "",
  email: "",
  body: "",
  gender: "male",
  status: "active",
};

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    setFormData: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },
    resetFormData: () => {
      return initialState;
    },
  },
});

export const { setFormData, resetFormData } = formSlice.actions;
export default formSlice.reducer;
