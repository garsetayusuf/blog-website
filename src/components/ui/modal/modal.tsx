import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/defaultHooks";
import ModalForm from "./modalForm/modalForm";
import { resetFormData } from "@/redux/slices/formSlice";
import { setShowModal } from "@/redux/slices/userSlice";
import ModalDelete from "./modalDelete/modalDelete";

const Modal = () => {
  const dispatch = useAppDispatch();
  const { showModal, mode } = useAppSelector((state) => state.user);

  return (
    <Dialog open={showModal}>
      <DialogContent
        onClick={() => (
          dispatch(setShowModal(false)), dispatch(resetFormData())
        )}
      >
        {mode === "create" ? (
          <ModalForm />
        ) : mode === "delete" ? (
          <ModalDelete />
        ) : (
          <ModalForm />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
