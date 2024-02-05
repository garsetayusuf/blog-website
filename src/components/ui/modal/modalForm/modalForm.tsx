// import { useCommentBlogsById } from "@/redux/hooks/blogHook";
import {
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/defaultHooks";
import { resetFormData, setFormData } from "@/redux/slices/formSlice";
import Styles from "@/styles/modal.module.css";
import { useCreateUser, useUpdateUserById } from "@/redux/hooks/userHook";
import { setShowModal } from "@/redux/slices/userSlice";

const ModalForm = () => {
  const dispatch = useAppDispatch();
  const { updateData } = useUpdateUserById();
  const { createData } = useCreateUser();
  const { name, email, gender, status } = useAppSelector((state) => state.form);
  const { mode } = useAppSelector((state) => state.user);

  const handleInputChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { id, value } = event.target;
    dispatch(setFormData({ [id]: value }));
  };

  const HandelSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (mode === "create") {
      createData();
    } else if (mode === "update") {
      updateData();
    }
  };

  const handleClose = () => {
    dispatch(setShowModal(false));
    dispatch(resetFormData());
  };

  return (
    <DialogHeader>
      <DialogTitle>
        {mode === "create" ? "Create User" : "Edit User"}
      </DialogTitle>
      <form className="space-y-4 pt-5" onSubmit={HandelSubmit}>
        <div className="space-y-2 text-left">
          <label
            className="text-sm font-medium text-gray-700 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            htmlFor="name"
          >
            Name
          </label>
          <input
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:outline-[#1890FF] focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            id="name"
            required
            placeholder="Enter your name"
            value={name}
            onChange={handleInputChange}
          />
        </div>
        <div className="space-y-2 text-left">
          <label
            className="text-sm font-medium text-gray-700 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            htmlFor="email"
          >
            Email
          </label>
          <input
            type="email"
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:outline-[#1890FF] focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            id="email"
            required
            placeholder="Enter your email"
            value={email}
            onChange={handleInputChange}
          />
        </div>
        <div className="grid grid-flow-col gap-4 items-center">
          <div className="space-y-2 text-left">
            <label
              className="text-sm font-medium text-gray-700 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              htmlFor="gender"
            >
              Gender
            </label>
            <select
              className={`${Styles.selectDefault} flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:outline-[#1890FF] focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50`}
              id="gender"
              required
              value={gender}
              onChange={handleInputChange}
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
          <div className="space-y-2 text-left">
            <label
              className="text-sm font-medium text-gray-700 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              htmlFor="status"
            >
              Status
            </label>
            <select
              className={`${
                status === "active" ? Styles.selectActive : Styles.selectInctive
              } flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:outline-[#1890FF] focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50`}
              id="status"
              required
              value={status}
              onChange={handleInputChange}
            >
              <option value="active" className="bg-green-200 text-green-800">
                Active
              </option>
              <option value="inactive" className="bg-red-200 text-red-800">
                inactive
              </option>
            </select>
          </div>
        </div>

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
            className="flex flex-row items-center focus:outline-none bg-[#1890FF] rounded-lg px-3 py-2 text-sm font-semibold text-white hover:bg-[#52a7f6]"
          >
            Submit
          </button>
        </DialogFooter>
      </form>
    </DialogHeader>
  );
};

export default ModalForm;
