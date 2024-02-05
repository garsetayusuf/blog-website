/* eslint-disable react-hooks/exhaustive-deps */
import { useAppDispatch, useAppSelector } from "@/redux/hooks/defaultHooks";
import { resetFormData } from "@/redux/slices/formSlice";
import {
  createUser,
  getAllUserWithPagination,
  updateUserById,
} from "@/api/userApi";
import {
  getUsers,
  setLoading,
  setShowModal,
  setUsersSearch,
} from "../slices/userSlice";
import { setTotalPage } from "../slices/paginatorSlice";

export const useGetAllUser = () => {
  const dispatch = useAppDispatch();

  const fetchData = async () => {
    try {
      const response = await getAllUserWithPagination(1, 100);
      const totalPages = response.headers["x-pagination-pages"];
      const currentPage = response.headers["x-pagination-page"];
      const round = Math.ceil(totalPages / 100) * 1; // Round up to the nearest integer

      let allUserData: any[] = [];
      allUserData = allUserData.concat(response.data);

      for (let page = currentPage; page <= round; page++) {
        const nextPageResponse = await getAllUserWithPagination(page, 100);

        // Filter out users already present in allUserData
        const uniqueUsers = nextPageResponse.data.filter((user: any) => {
          return !allUserData.some(
            (existingUser) => existingUser.id === user.id
          );
        });

        // Concatenate unique users to allUserData
        allUserData = allUserData.concat(uniqueUsers);
      }

      dispatch(getUsers(allUserData));
      dispatch(setUsersSearch(allUserData));
      dispatch(setTotalPage(totalPages));
      dispatch(setLoading(false));
    } catch (error) {
      console.log(error);
    }
  };

  return { fetchData };
};

export const useUpdateUserById = () => {
  const dispatch = useAppDispatch();
  const { userId } = useAppSelector((state) => state.user);
  const form = useAppSelector((state) => state.form);
  const { fetchData } = useGetAllUser();

  const updateData = async () => {
    try {
      const response = await updateUserById(userId, form);

      if (response.status === 200) {
        fetchData();
        dispatch(setShowModal(false));
        dispatch(resetFormData());
      }
    } catch (error) {
      console.log(error);
    }
  };

  return { updateData };
};

export const useCreateUser = () => {
  const dispatch = useAppDispatch();
  const form = useAppSelector((state) => state.form);
  const { fetchData } = useGetAllUser();

  const createData = async () => {
    try {
      const response = await createUser(form);

      if (response.status === 201) {
        fetchData();
        dispatch(setShowModal(false));
        dispatch(resetFormData());
      }
    } catch (error) {
      console.log(error);
    }
  };

  return { createData };
};
