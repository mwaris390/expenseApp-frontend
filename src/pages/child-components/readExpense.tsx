import { useDispatch, useSelector } from "react-redux";
import plus from "../../assets/plus.svg";
import del from "../../assets/del.svg";
import update from "../../assets/update.svg";
import { useEffect, useState } from "react";
import AddExpenseModal from "./AddExpenseModal";
import { fetchExpenseData } from "../../hooks/slices/expenseSlice";
import { ReadableDate } from "../../utils/readableDate";
import { DeleteExpense } from "../../apis/delete-expense";
import NoData from "../../utils/no-data";
export function ReadExpense() {
  const user = useSelector((state: any) => state.user);
  const expense = useSelector((state: any) => state.expense);
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updateData, setUpdateData] = useState(undefined);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setUpdateData(undefined);
  };
  const deleteExpense = async (
    id: string,
    categoryId: string,
    amount: number
  ) => {
    console.log(id);
    await DeleteExpense(id, user.id, categoryId, amount);
    dispatch(fetchExpenseData(user.id) as any);
  };
  const updateExpense = (expense: any) => {
    console.log(expense);
    setUpdateData(expense);
    setIsModalOpen(true);
  };

  useEffect(() => {
    if (!isModalOpen) {
      dispatch(fetchExpenseData(user.id) as any);
    }
  }, [dispatch, isModalOpen]);

  return (
    <>
      <header className="flex justify-between items-center mb-8">
        <h2 className="bg-white text-black rounded-3xl px-3 shadow w-fit h-fit">
          Cash Flow Management
        </h2>
        <div>
          <button
            onClick={openModal}
            className="flex justify-between items-center bg-accent text-white font-bold rounded-3xl py-1 px-3 shadow w-fit"
          >
            <img className="w-[30px] me-2" src={plus} alt="add" />
            Add Record
          </button>
          {isModalOpen ? (
            <AddExpenseModal
              isOpen={isModalOpen}
              onClose={closeModal}
              userId={user.id}
              updateData={updateData}
            />
          ) : (
            ""
          )}
        </div>
      </header>
      <main>
        <section>
          {expense.expenseData.length > 0 && (
            <div className="shadow max-h-[70vh]  overflow-auto">
              <table className="w-full h-full table-auto border-collapse">
                <thead className="bg-accent text-center text-white font-bold sticky top-0">
                  <tr>
                    <th className="px-4 py-2">#</th>
                    <th className="px-4 py-2">Title</th>
                    <th className="px-4 py-2">Description</th>
                    <th className="px-4 py-2">Amount</th>
                    <th className="px-4 py-2">Date</th>
                    <th className="px-4 py-2">Category</th>
                    <th className="px-4 py-2">Type</th>
                    {/* <th className="px-4 py-2">Created At</th> */}
                    <th className="px-4 py-2">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white ">
                  {expense.expenseData.map((expense: any, index: number) => {
                    return (
                      <tr key={expense.id}>
                        <td className="px-4 py-2">{index + 1}</td>
                        <td className="px-4 py-2 capitalize">
                          {expense.title}
                        </td>
                        <td className="px-4 py-2 capitalize">
                          {expense.description}
                        </td>
                        <td className="px-4 py-2">{expense.amount}</td>
                        <td className="px-4 py-2">
                          {ReadableDate(expense.date, false)}
                        </td>
                        <td className="px-4 py-2 capitalize">
                          {expense.category.title}
                        </td>
                        <td className="px-4 py-2 capitalize">
                          {expense.type.title}
                        </td>
                        {/* <td className="px-4 py-2">
                        {ReadableDate(expense.createdAt)}
                      </td> */}
                        <td className="whitespace-nowrap px-4 py-2">
                          <button
                            onClick={() => updateExpense(expense)}
                            className="m-1"
                          >
                            <img
                              className="w-[25px]"
                              src={update}
                              alt="update"
                            />
                          </button>
                          <button
                            onClick={() =>
                              deleteExpense(
                                expense.id,
                                expense.category.id,
                                expense.amount
                              )
                            }
                            className="m-1"
                          >
                            <img className="w-[25px]" src={del} alt="del" />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
          {expense.expenseData.length <= 0 && <NoData />}
        </section>
      </main>
    </>
  );
}
