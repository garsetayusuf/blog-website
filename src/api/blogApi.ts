import { instance } from "@/plugin/axios";

export const createComentById = async (id: any, form: any) => {
  const response = await instance.post(`/posts/${id}/comments`, form);
  return response;
};

export const getCommentById = async (id: any) => {
  const response = await instance.get(`/posts/${id}/comments`);
  return response;
};

export const getBlogById = async (id: any) => {
  const response = await instance.get(`/posts/${id}`);
  return response;
};

export const getAllBlogWithPagination = async (page: any, size: any) => {
  const response = await instance.get(`/posts?page=${page}&per_page=${size}`);
  return response;
};
