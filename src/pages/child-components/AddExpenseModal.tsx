import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import cross from "../../assets/cross.svg";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategory, getCategory } from "../../hooks/slices/categoriesSlice";
import { fetchType } from "../../hooks/slices/typeSlice";
import AddExpense from "../../apis/add-expense";
import { Spinner } from "../../shared-components/spinner";
import UpdateExpense from "../../apis/update-expense";
interface ModalProps {
  isOpen: boolean;
  userId: string;
  updateData?: any;
  onClose: () => void;
}
function AddExpenseModal({ isOpen, onClose, updateData, userId }: ModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const categories = useSelector((state: any) => {
    return state.category.categoryData;
  });
  const types = useSelector((state: any) => {
    return state.type.typeData;
  });
  const [loader, setLoader] = useState(false);
  const dispatch = useDispatch();
  const schema = z.object({
    title: z.string().min(1, "Title Required").trim(),
    description: z.string().min(1, "Description Required").trim(),
    amount: z
      .string()
      .min(1, "Amount Required")
      .transform((value) => Number(value)),
    date: z.string().date("Date is Required"),
    typeId: z.string().min(1, "Type Required").uuid(),
    categoryId: z.string().min(1, "Category Required").uuid(),
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
  async function submitModal(data: schemaType) {
    if (updateData == undefined) {
      setLoader(await AddExpense(userId, data));
    } else {
      setLoader(await UpdateExpense(userId, updateData.id, data));
    }
    console.log(loader);
  }
  useEffect(() => {
    if (isOpen) {
      dispatch(fetchCategory(userId) as any);
      dispatch(fetchType(userId) as any);
      dialogRef.current?.showModal();
    } else {
      reset();
      dialogRef.current?.close();
    }
    if (loader) {
      reset();
      onClose();
      dialogRef.current?.close();
    }
  }, [isOpen, dispatch, loader]);

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-slate-50 bg-opacity-5 backdrop-blur-sm z-10"></div>
      )}
      <dialog ref={dialogRef} className=" rounded-lg p-6 w-1/2 mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Create Record</h2>
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
            <div className="flex flex-col py-1">
              <label htmlFor="amount">Amount</label>
              <input
                type="text"
                id="amount"
                placeholder="Write amount"
                defaultValue={updateData?.amount}
                {...register("amount")}
              />
              {errors.amount && (
                <p className="error-message">{errors.amount.message}</p>
              )}
            </div>
            <div className="flex flex-col py-1">
              <label htmlFor="date">Date</label>
              <input
                type="date"
                id="date"
                placeholder="Write date"
                defaultValue={updateData?.date}
                {...register("date")}
              />
              {errors.date && (
                <p className="error-message">{errors.date.message}</p>
              )}
            </div>
            <div className="flex flex-col py-1">
              <label htmlFor="categoryId">Category</label>
              <select
                {...register("categoryId")}
                id="categoryId"
                className="capitalize"
                defaultValue={updateData?.expenseCategoryId}
              >
                {categories?.map((category: any, key: any) => {
                  return (
                    <option key={key} value={category.id}>
                      {category.title}
                    </option>
                  );
                })}
              </select>
              {errors.categoryId && (
                <p className="error-message">{errors.categoryId.message}</p>
              )}
            </div>
            <div className="flex flex-col py-1">
              <label htmlFor="typeId">TypeId</label>
              <select
                {...register("typeId")}
                id="typeId"
                className="capitalize"
                defaultValue={updateData?.expenseTypeId}
              >
                {types?.map((type: any, key: any) => {
                  return (
                    <option key={key} value={type.id}>
                      {type.title}
                    </option>
                  );
                })}
              </select>
              {errors.typeId && (
                <p className="error-message">{errors.typeId.message}</p>
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
                  className="bg-accent text-white ms-4 font-bold px-4 py-2 rounded flex justify-between items-center"
                >
                  Submit
                  {loader ? <Spinner /> : ""}
                </button>
              </div>
            </div>
          </form>
        </div>
      </dialog>
    </>
  );
}

export default AddExpenseModal;
