import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { z } from "zod";
import { fetchCategory } from "../../hooks/slices/categoriesSlice";
import { Spinner } from "../../shared-components/spinner";
import cross from "../../assets/cross.svg";
import { AddBudget } from "../../apis/add-budget";
import { UpdateBudget } from "../../apis/update-budget";
interface ModalProps {
  isModal: boolean;
  onClose: () => void;
  updateData?: any;
  userId: string;
}
function AddBudgetModal({ isModal, onClose, userId, updateData }: ModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(isModal);
  const categories = useSelector((state: any) => {
    return state.category.categoryData;
  });
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);
  const schema = z.object({
    categoryId: z.string().min(1, "Category required").uuid(),
    startDate: z
      .string()
      .min(1, "Start Date required")
      .date()
      .transform((val) => {
        return val + "T00:00:00Z";
      }),
    endDate: z
      .string()
      .min(1, "End Date required")
      .date()
      .transform((val) => {
        return val + "T00:00:00Z";
      }),
    limitAmount: z
      .string()
      .min(1, "limit Amount required")
      .transform((val) => {
        return parseInt(val);
      })
      .pipe(z.number().min(1, "imit Amount required")),
  });
  type schemaType = z.infer<typeof schema>;
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isValid },
  } = useForm<schemaType>({
    mode: "onChange",
    resolver: zodResolver(schema),
  });
  const submit = async (data: schemaType) => {
    if (updateData == undefined) {
      let res = await AddBudget(userId, data);
      setIsModalOpen(res);
    } else {
      let res = await UpdateBudget(userId, updateData.id, data);
      setIsModalOpen(res);
    }
  };
  useEffect(() => {
    if (isModalOpen) {
      dispatch(fetchCategory(userId) as any);
      dialogRef.current?.showModal();
    } else {
      reset();
      onClose();
      dialogRef.current?.close();
    }
  }, [dispatch, isModalOpen]);
  console.log(updateData,'update');

  return (
    <>
      {isModal && (
        <div className="fixed inset-0 bg-slate-50 bg-opacity-5 backdrop-blur-sm z-10"></div>
      )}
      <dialog ref={dialogRef} className=" rounded-lg p-6 w-1/2 mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">
            {updateData == undefined ? "Create Budget" : "Update Budget"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <img src={cross} className="w-[15px]" alt="cross" />
          </button>
        </div>
        <div>
          <form method="dialog" onSubmit={handleSubmit(submit)}>
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
              <label htmlFor="amount">Amount</label>
              <input
                type="number"
                id="limitAmount"
                placeholder="Write amount"
                defaultValue={updateData?.limitAmount}
                {...register("limitAmount")}
              />
              {errors.limitAmount && (
                <p className="error-message">{errors.limitAmount.message}</p>
              )}
            </div>
            <div className="flex flex-col py-1">
              <label htmlFor="date">Start Date</label>
              <input
                type="date"
                id="startDate"
                placeholder="Write date"
                defaultValue={updateData?.startDate.split("T")[0]}
                {...register("startDate")}
              />
              {errors.startDate && (
                <p className="error-message">{errors.startDate.message}</p>
              )}
            </div>
            <div className="flex flex-col py-1">
              <label htmlFor="date">End Date</label>
              <input
                type="date"
                id="endDate"
                placeholder="Write date"
                defaultValue={updateData?.endDate.split("T")[0]}
                {...register("endDate")}
              />
              {errors.endDate && (
                <p className="error-message">{errors.endDate.message}</p>
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
                  {updateData == undefined ? "Submit" : "Update"}

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

export default AddBudgetModal;
