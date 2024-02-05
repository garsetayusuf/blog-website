import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BlogState } from "../interface/blog.interface";
import { BlogsType, CommentType } from "../types/blogType";

const initialState: BlogState = {
  blogs: [],
  blogsCurrent: [],
  showEllipsis: false,
  blogId: null,
  blogDetail: {
    body: "",
    id: 0,
    title: "",
    user_id: 0,
  },
  comment: [],
  loadingComment: true,
};

// Create Slice
const blogsSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    setBlog: (state: any, action: PayloadAction<Array<BlogsType>>) => {
      state.blogs = action.payload;
    },
    setBlogCurrent: (state: any, action: PayloadAction<Array<BlogsType>>) => {
      state.blogsCurrent = action.payload;
    },
    setShowEllipsis: (state: any, action: PayloadAction<boolean>) => {
      state.showEllipsis = action.payload;
    },
    setBlogId: (state: any, action: PayloadAction<string | null>) => {
      state.blogId = action.payload;
    },
    setBlogDetail: (state: any, action: PayloadAction<BlogsType>) => {
      state.blogDetail = action.payload;
    },
    setComment: (state: any, action: PayloadAction<Array<CommentType>>) => {
      state.comment = action.payload;
    },
    setLoadingComment: (state: any, action: PayloadAction<boolean>) => {
      state.loadingComment = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setBlog,
  setBlogCurrent,
  setShowEllipsis,
  setBlogDetail,
  setBlogId,
  setComment,
  setLoadingComment,
} = blogsSlice.actions;
export default blogsSlice.reducer;
