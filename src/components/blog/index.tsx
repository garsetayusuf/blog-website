/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useAppSelector } from "@/redux/hooks/defaultHooks";
import { useGetBlogs } from "@/redux/hooks/blogHook";
import Pagination from "../ui/pagination";
import { useEffect, useRef } from "react";
import BlogItem from "./blogItem/blogitem";
import LoadingIcon from "../ui/loadingIcon";

export const Blog = () => {
  const { fetchDataPagination } = useGetBlogs();
  const { blogs } = useAppSelector((state) => state.blogs);
  const { currentPage, currentSize } = useAppSelector(
    (state) => state.paginator
  );

  useEffect(() => {
    fetchDataPagination();
  }, [currentPage, currentSize]);

  return (
    <div className="h-full w-full md:px-24 xl:px-32 2xl:px-96 p-5 bg-white">
      <div className="grid max-sm:grid-cols-1 max-lg:grid-cols-2 grid-cols-3 gap-4 pb-5">
        {blogs &&
          blogs.map((item, index) => {
            return <BlogItem key={index} item={item} />;
          })}
      </div>
      {blogs.length > 0 ? <Pagination /> : <LoadingIcon />}
    </div>
  );
};
