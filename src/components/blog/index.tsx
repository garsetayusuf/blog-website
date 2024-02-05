/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useAppDispatch, useAppSelector } from "@/redux/hooks/defaultHooks";
import { useGetBlogs } from "@/redux/hooks/blogHook";
import Pagination from "../ui/pagination";
import { useEffect, useRef } from "react";
import { setBlogCurrent } from "@/redux/slices/blogSlice";
import BlogItem from "./blogItem/blogitem";
import { RotatingLines } from "react-loader-spinner";

export const Blog = () => {
  const dispatch = useAppDispatch();
  const { fetchData } = useGetBlogs();
  const initialized = useRef(false);
  const { blogs, blogsCurrent } = useAppSelector((state) => state.blogs);
  const { currentPage, currentSize } = useAppSelector(
    (state) => state.paginator
  );

  useEffect(() => {
    if (!initialized.current) {
      fetchData();
      initialized.current = true;
    }

    // Calculate start and end indices for slicing the array
    const startIndex = (currentPage - 1) * currentSize;
    const endIndex = currentPage * currentSize;

    // Get the data for the current page
    const data = blogs.slice(startIndex, endIndex);
    dispatch(setBlogCurrent(data));
  }, [blogs, currentPage, currentSize, dispatch]);

  return (
    <div className="h-full w-full md:px-24 xl:px-32 2xl:px-96 p-5 bg-white">
      <div className="grid max-sm:grid-cols-1 max-lg:grid-cols-2 grid-cols-3 gap-4 pb-5">
        {blogsCurrent &&
          blogsCurrent.map((item, index) => {
            return <BlogItem key={index} item={item} />;
          })}
      </div>
      {blogsCurrent.length > 0 ? (
        <Pagination />
      ) : (
        <div className="flex justify-center items-center h-[80vh]">
          <RotatingLines
            visible={true}
            width="96"
            strokeColor="#1890FF"
            strokeWidth="3"
            animationDuration="0.75"
            ariaLabel="rotating-lines-loading"
          />
        </div>
      )}
    </div>
  );
};
