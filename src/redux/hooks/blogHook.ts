/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/defaultHooks";
import { resetFormData } from "@/redux/slices/formSlice";
import {
  createComentById,
  getAllBlogWithPagination,
  getBlogById,
  getCommentById,
} from "@/api/blogApi";
import {
  setBlog,
  setBlogDetail,
  setComment,
  setLoadingComment,
} from "../slices/blogSlice";
import { setTotalPage } from "../slices/paginatorSlice";

export const useGetBlogs = () => {
  const dispatch = useAppDispatch();
  const { currentPage, currentSize } = useAppSelector(
    (state) => state.paginator
  );

  const fetchDataPagination = async () => {
    try {
      const response = await getAllBlogWithPagination(currentPage, currentSize);
      const totalPages = response.headers["x-pagination-pages"];
      let allBlogData: any[] = [];
      allBlogData = allBlogData.concat(response.data);
      allBlogData.sort((a, b) => (a.title > b.title ? 1 : -1));

      dispatch(setBlog(allBlogData));
      dispatch(setTotalPage(totalPages));
    } catch (error) {
      console.log(error);
    }
  };

  return { fetchDataPagination };
};

export const useGetBlogsById = () => {
  const dispatch = useAppDispatch();
  const { blogId } = useAppSelector((state) => state.blogs);

  useEffect(() => {
    const fetchData = async () => {
      dispatch(
        setBlogDetail({
          body: "",
          id: 0,
          title: "",
          user_id: 0,
        })
      );
      dispatch(setComment([]));
      dispatch(setLoadingComment(true));

      try {
        const responseBlog = await getBlogById(blogId);
        const responseComment = await getCommentById(blogId);

        dispatch(setBlogDetail(responseBlog.data));
        dispatch(setComment(responseComment.data));
        setTimeout(() => {
          dispatch(setLoadingComment(false));
        }, 1000);
      } catch (error) {
        console.log(error);
      }
    };

    if (blogId) {
      fetchData();
    }
  }, [blogId]);
};

export const useCommentBlogsById = () => {
  const dispatch = useAppDispatch();
  const { blogId } = useAppSelector((state) => state.blogs);
  const form = useAppSelector((state) => state.form);

  const postData = async () => {
    try {
      const response = await createComentById(blogId, form);

      if (response.status === 201) {
        const responseComment = await getCommentById(blogId);

        dispatch(setComment(responseComment.data));
        dispatch(resetFormData());
      }
    } catch (error) {
      console.log(error);
    }
  };

  return { postData };
};
