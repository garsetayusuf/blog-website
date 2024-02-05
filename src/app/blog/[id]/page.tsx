"use client";

import BlogDetail from "@/components/blog/blogDetail/blogDetail";
import { useGetBlogsById } from "@/redux/hooks/blogHook";
import { useAppDispatch } from "@/redux/hooks/defaultHooks";
import { setBlogId } from "@/redux/slices/blogSlice";
import { useParams } from "next/navigation";

const Detail = () => {
  const dispatch = useAppDispatch();
  const params = useParams<{ id: string }>();

  dispatch(setBlogId(params.id));
  useGetBlogsById();

  return <BlogDetail />;
};

export default Detail;
