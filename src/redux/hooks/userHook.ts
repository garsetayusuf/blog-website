/* eslint-disable react-hooks/exhaustive-deps */
import { useAppDispatch, useAppSelector } from "@/redux/hooks/defaultHooks";
import { resetFormData } from "@/redux/slices/formSlice";
import {
  createUser,
  getAllUserWithPagination,
  updateUserById,
} from "@/api/userApi";
import { setLoading, setShowModal, setUsers } from "../slices/userSlice";
import { setCurrentPage, setTotalPage } from "../slices/paginatorSlice";

export const useGetAllUserSearch = () => {
  const dispatch = useAppDispatch();
  const { searchValue } = useAppSelector((state) => state.user);

  const fetchDataSearch = async () => {
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

      const result = allUserData.filter(
        (user) =>
          user.name.toLowerCase().includes(searchValue.toLowerCase()) ||
          user.email.toLowerCase().includes(searchValue.toLowerCase())
      );
      const totalPageResult = Math.ceil(result.length / 100) * 1; // Round up to the nearest integer

      dispatch(setUsers(result));
      dispatch(setTotalPage(totalPageResult));
      dispatch(setLoading(false));
    } catch (error) {
      console.log(error);
    }
  };

  return { fetchDataSearch };
};

export const useGetAllUserPagination = () => {
  const dispatch = useAppDispatch();
  const { currentPage, currentSize } = useAppSelector(
    (state) => state.paginator
  );

  const fetchDataPagination = async () => {
    try {
      const response = await getAllUserWithPagination(currentPage, currentSize);
      const totalPages = response.headers["x-pagination-pages"];

      dispatch(setUsers(response.data));
      dispatch(setTotalPage(totalPages));
      dispatch(setLoading(false));
    } catch (error) {
      console.log(error);
    }
  };

  return { fetchDataPagination };
};

export const useUpdateUserById = () => {
  const dispatch = useAppDispatch();
  const { userId } = useAppSelector((state) => state.user);
  const form = useAppSelector((state) => state.form);
  const { fetchDataPagination } = useGetAllUserPagination();

  const updateData = async () => {
    try {
      const response = await updateUserById(userId, form);

      if (response.status === 200) {
        fetchDataPagination();
        dispatch(setCurrentPage(1));
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
  const { fetchDataPagination } = useGetAllUserPagination();

  const createData = async () => {
    try {
      const response = await createUser(form);

      if (response.status === 201) {
        fetchDataPagination();
        dispatch(setCurrentPage(1));
        dispatch(setShowModal(false));
        dispatch(resetFormData());
      }
    } catch (error) {
      console.log(error);
    }
  };

  return { createData };
};
