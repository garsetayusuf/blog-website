import {
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../dialog";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/defaultHooks";
import { setSearchValue, setShowModal } from "@/redux/slices/userSlice";
import { deleteUserById } from "@/api/userApi";
import { resetFormData } from "@/redux/slices/formSlice";
import { useGetAllUserPagination } from "@/redux/hooks/userHook";

const ModalDelete = () => {
  const dispatch = useAppDispatch();
  const { userId } = useAppSelector((state) => state.user);
  const { fetchDataPagination } = useGetAllUserPagination();

  const handleClose = () => {
    dispatch(setShowModal(false));
  };

  const handleSubmit = async () => {
    const response = await deleteUserById(userId);

    if (response.status === 204) {
      dispatch(setSearchValue(""));
      fetchDataPagination();
      dispatch(resetFormData());
      dispatch(setShowModal(false));
    }
  };
  return (
    <DialogHeader>
      <DialogTitle>Delete User</DialogTitle>
      <DialogDescription className="pt-5">
        Are you sure to delete?
      </DialogDescription>
      <DialogFooter className="flex flex-row justify-end pt-4 max-sm:gap-3">
        <button
          type="button"
          className="flex flex-row items-center focus:outline-none bg-gray-100 rounded-lg px-3 py-2 text-sm font-semibold text-red-600 hover:bg-red-200 hover:text-red-600"
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
