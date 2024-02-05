import React from "react";
import {
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../dialog";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/defaultHooks";
import { setShowModal } from "@/redux/slices/userSlice";
import { deleteUserById } from "@/api/userApi";
import { useGetAllUser } from "@/redux/hooks/userHook";
import { resetFormData } from "@/redux/slices/formSlice";

const ModalDelete = () => {
  const dispatch = useAppDispatch();
  const { fetchData } = useGetAllUser();
  const { userId } = useAppSelector((state) => state.user);

  const handleClose = () => {
    dispatch(setShowModal(false));
  };

  const handleSubmit = async () => {
    const response = await deleteUserById(userId);

    if (response.status === 204) {
      fetchData();
      dispatch(resetFormData());
      dispatch(setShowModal(false));
    }
  };
  return (
    <DialogHeader>
      <DialogTitle>Delete User</DialogTitle>
      <DialogDescription className="pt-5">
        Are you sure you want to delete?
      </DialogDescription>
      <DialogFooter className="sm:justify-end pt-3">
        <button
          type="button"
          className="flex flex-row items-center focus:outline-none bg-white rounded-lg px-3 py-2 text-sm font-semibold text-red-600 hover:bg-red-200 hover:text-red-600"
          onClick={handleClose}
        >
          Close
        </button>
        <button
          type="submit"
          onClick={handleSubmit}
          className="flex flex-row items-center focus:outline-none bg-[#1890FF] rounded-lg px-3 py-2 text-sm font-semibold text-white hover:bg-[#52a7f6]"
        >
          Submit
        </button>
      </DialogFooter>
    </DialogHeader>
  );
};

export default ModalDelete;
