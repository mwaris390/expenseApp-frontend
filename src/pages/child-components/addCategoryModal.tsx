import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { z } from "zod";
import cross from "../../assets/cross.svg";
import { Spinner } from "../../shared-components/spinner";
import {
  addCategory,
  updateCategory,
} from "../../hooks/slices/categoriesSlice";
type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  userId: string;
  updateData?: any;
};
function AddCategoryModal({ isOpen, onClose, userId, updateData }: ModalProps) {
  const dispatch = useDispatch();
  const categories = useSelector((state: any) => state.category);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [loader, setLoader] = useState(false);
  const schema = z.object({
    title: z.string().min(1, "Title Required").trim(),
    description: z.string().min(1, "Description Required").trim(),
  });
  type schemaType = z.infer<typeof schema>;
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<schemaType>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });
  const submitModal = async (data: schemaType) => {
    // setLoader(true);
    try {
      if (updateData == undefined) {
        await dispatch(addCategory({ userId, data }) as any);
      } else {
        let categoryId: string = updateData.id;
        await dispatch(updateCategory({ categoryId, data }) as any);
      }
      reset();
      onClose();
      dialogRef.current?.close();
    } catch (e) {}
  };
  useEffect(() => {
    if (isOpen) {
      dialogRef.current?.showModal();
    } else {
      reset();
      dialogRef.current?.close();
    }
  }, [isOpen, dispatch]);
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-slate-50 bg-opacity-5 backdrop-blur-sm z-10"></div>
      )}
      <dialog ref={dialogRef} className=" rounded-lg p-6 w-1/2 mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">
            {updateData == undefined ? "Add Category" : "Update Category"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <img src={cross} className="w-[15px]" alt="cross" />
          </button>
        </div>
        <div>
          <form method="dialog" onSubmit={handleSubmit(submitModal)}>
            <div className="flex flex-col py-1">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                id="title"
                defaultValue={updateData?.title}
                placeholder="Write Title"
                {...register("title")}
              />
              {errors.title && (
                <p className="error-message">{errors.title.message}</p>
              )}
            </div>
            <div className="flex flex-col py-1">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                placeholder="Write description"
                defaultValue={updateData?.description}
                {...register("description")}
              />
              {errors.description && (
                <p className="error-message">{errors.description.message}</p>
              )}
            </div>
            <div className="mt-6">
              <div className="flex justify-end">
                <button
                  onClick={onClose}
                  className="bg-slate-400 text-white font-bold px-4 py-2 rounded"
                >
                  Close
                </button>
                <button
                  disabled={!isValid}
                  type="submit"
                  className="bg-accent text-white ms-4 font-bold px-4 py-2 rounded flex justify-between items-center disabled:bg-purple-300"
                >
                  Submit
                  {loader && <Spinner />}
                </button>
              </div>
            </div>
          </form>
        </div>
      </dialog>
    </>
  );
}

export default AddCategoryModal;
