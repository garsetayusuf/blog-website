import { instance } from "@/plugin/axios";

export const createUser = async (data: any) => {
  const response = await instance.post(`/users`, data);
  return response;
};

export const getUserById = async (id: any) => {
  const response = await instance.get(`/users/${id}`);
  return response;
};

export const updateUserById = async (id: any, data: any) => {
  const response = await instance.put(`/users/${id}`, data);
  return response;
};

export const deleteUserById = async (id: any) => {
  const response = await instance.delete(`/users/${id}`);
  return response;
};

export const getAllUserWithPagination = async (page: any, size: any) => {
  const response = await instance.get(`/users?page=${page}&per_page=${size}`);
  return response;
};
