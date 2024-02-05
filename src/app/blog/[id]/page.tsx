"use client";

import BlogDetail from "@/components/blog/blogDetail/blogDetail";
import { useAppDispatch } from "@/redux/hooks/defaultHooks";
import { setBlogId } from "@/redux/slices/blogSlice";
import { useParams } from "next/navigation";
import { useEffect } from "react";

const Detail = () => {
  const dispatch = useAppDispatch();
  const params = useParams<{ id: string }>();

  useEffect(() => {
    dispatch(setBlogId(params.id));
  }, [dispatch, params]);

  return <BlogDetail />;
};

export default Detail;
