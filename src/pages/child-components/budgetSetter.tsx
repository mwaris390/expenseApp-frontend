import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import plus from "../../assets/plus.svg";
import AddBudgetModal from "./AddBudgetModal";
import update from "../../assets/update.svg";
import del from "../../assets/del.svg";
import reset from "../../assets/reset.svg";
import { ReadBudget } from "../../apis/read-budget";
import { ReadableDate } from "../../utils/readableDate";
import { DeleteBudget } from "../../apis/delete-budget";
import NoData from "../../utils/no-data";
import { ResetBudget } from "../../apis/reset-budget";
export function BudgetSetter() {
  const user = useSelector((state: any) => state.user);
  const [budgets, setBudgets] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updateData, setUpdateData] = useState(undefined);
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setUpdateData(undefined);
  };
  const delBudget = async (id: string) => {
    const result = await DeleteBudget(id);
    if (result) {
      setBudgets(await ReadBudget(user.id));
    }
  };
  const updateBudget = (budget: any) => {
    setUpdateData(budget);
    setIsModalOpen(true);
  };
   const resetBudget = async(id: any) => {
     const result = await ResetBudget(id, user.id);
     if (result) {
       setBudgets(await ReadBudget(user.id));
     }
   };
  const getBudget = async () => {
    setBudgets(await ReadBudget(user.id));
  };
  useEffect(() => {
    if (!isModalOpen) {
      getBudget();
    }
  }, [isModalOpen]);
  console.log(budgets);

  return (
    <>
      <header className="flex justify-between items-center mb-8">
        <h2 className="bg-white text-black rounded-3xl px-3 shadow w-fit h-fit">
          Manage Budget
        </h2>
        <div>
          <button
            onClick={openModal}
            className="flex justify-between items-center bg-accent text-white font-bold rounded-3xl py-1 px-3 shadow w-fit"
          >
            <img
              className="w-[30px] me-2"
              src={plus}
              loading="lazy"
              alt="add"
            />
            Add Budget
          </button>
          {isModalOpen && (
            <AddBudgetModal
              isModal={isModalOpen}
              onClose={closeModal}
              userId={user.id}
              updateData={updateData}
            />
          )}
        </div>
      </header>
      <main>
        <section>
          {budgets.length > 0 && (
            <div className="shadow max-h-[70vh]  overflow-auto">
              <table className="w-full h-full table-auto border-collapse">
                <thead className="bg-accent text-center text-white font-bold sticky top-0">
                  <tr>
                    <th className="px-4 py-2">#</th>
                    <th className="px-4 py-2">Category</th>
                    <th className="px-4 py-2">Start of Date</th>
                    <th className="px-4 py-2">End of Date</th>
                    <th className="px-4 py-2">Limit Amount</th>
                    <th className="px-4 py-2">Actual Amount</th>
                    <th className="px-4 py-2">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white ">
                  {budgets.map((budget: any, index: number) => {
                    return (
                      <tr key={budget.id}>
                        <td className="px-4 py-2">{index + 1}</td>
                        <td className="px-4 py-2 capitalize">
                          {budget.category.title}
                        </td>
                        <td className="px-4 py-2">
                          {ReadableDate(budget.startDate, false)}
                        </td>
                        <td className="px-4 py-2">
                          {ReadableDate(budget.endDate, false)}
                        </td>
                        <td className="px-4 py-2">{budget.limitAmount}</td>
                        <td className="px-4 py-2">
                          {budget.amount != null ? budget.amount : "0"}
                        </td>
                        <td className="whitespace-nowrap px-4 py-2">
                          <button
                            onClick={() => resetBudget(budget.id)}
                            className="m-1"
                          >
                            <img
                              className="w-[25px]"
                              src={reset}
                              alt="update"
                            />
                          </button>
                          <button
                            onClick={() => updateBudget(budget)}
                            className="m-1"
                          >
                            <img
                              className="w-[25px]"
                              src={update}
                              alt="update"
                            />
                          </button>
                          <button
                            onClick={() => delBudget(budget.id)}
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
          {budgets.length <= 0 && <NoData />}
        </section>
      </main>
    </>
  );
}
