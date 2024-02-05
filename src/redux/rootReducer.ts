import { combineReducers } from "redux";
import navigationSlice from "@/redux/slices/navigationSlice";
import blogSlice from "./slices/blogSlice";
import formSlice from "./slices/formSlice";
import paginatorSlice from "./slices/paginatorSlice";
import userSlice from "./slices/userSlice";

const rootReducers = combineReducers({
  navigation: navigationSlice,
  blogs: blogSlice,
  user: userSlice,
  form: formSlice,
  paginator: paginatorSlice,
});

export default rootReducers;
