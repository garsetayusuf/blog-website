import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserState } from "../interface/user.interface";
import { UsersType } from "../types/userType";

const initialState: UserState = {
  users: [],
  usersSearch: [],
  showModal: false,
  mode: "create",
  userId: null,
  loading: true,
  searchValue: "",
  timer: null,
};

// Create Slice
const usersSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    getUsers: (state: any, action: PayloadAction<Array<UsersType>>) => {
      state.users = action.payload;
    },
    setUsersSearch: (state: any, action: PayloadAction<Array<UsersType>>) => {
      state.usersSearch = action.payload;
    },
    setShowModal: (state: any, action: PayloadAction<boolean>) => {
      state.showModal = action.payload;
    },
    setMode: (
      state: any,
      action: PayloadAction<"create" | "update" | "delete">
    ) => {
      state.mode = action.payload;
    },
    setUserId: (state: any, action: PayloadAction<string | any>) => {
      state.userId = action.payload;
    },
    setLoading: (state: any, action: PayloadAction<string | any>) => {
      state.loading = action.payload;
    },
    setSearchValue: (state: any, action: PayloadAction<string | any>) => {
      state.searchValue = action.payload;
    },
    setTimer: (state: any, action: PayloadAction<string | any>) => {
      state.timer = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  getUsers,
  setUsersSearch,
  setShowModal,
  setMode,
  setUserId,
  setLoading,
  setSearchValue,
  setTimer,
} = usersSlice.actions;
export default usersSlice.reducer;
