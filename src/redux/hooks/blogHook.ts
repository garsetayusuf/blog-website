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

  const fetchData = async () => {
    try {
      dispatch(setBlog([]));
      const response = await getAllBlogWithPagination(1, 100);
      const totalPages = response.headers["x-pagination-pages"];
      const currentPage = response.headers["x-pagination-page"];
      const round = Math.ceil(totalPages / 100) * 1; // Round up to the nearest integer

      let allUserData: any[] = [];
      allUserData = allUserData.concat(response.data);

      for (let page = currentPage; page <= round; page++) {
        const nextPageResponse = await getAllBlogWithPagination(page, 100);

        // Filter out users already present in allUserData
        const uniqueUsers = nextPageResponse.data.filter((user: any) => {
          return !allUserData.some(
            (existingUser) => existingUser.id === user.id
          );
        });

        // Concatenate unique users to allUserData
        allUserData = allUserData.concat(uniqueUsers);
      }

      dispatch(setBlog(allUserData));
      dispatch(setTotalPage(totalPages));
    } catch (error) {
      console.log(error);
    }
  };

  return { fetchData };
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
        dispatch(setLoadingComment(false));
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [blogId]);
};

export const useCommentBlogsById = () => {
  const dispatch = useAppDispatch();
  const { blogId } = useAppSelector((state) => state.blogs);
  const { form } = useAppSelector((state) => state);

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
