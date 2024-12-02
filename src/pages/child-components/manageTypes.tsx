import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import plus from "../../assets/plus.svg";
import update from "../../assets/update.svg";
import del from "../../assets/del.svg";
import AddTypeModal from "../child-components/AddTypeModal";
import { deleteType, fetchType } from "../../hooks/slices/typeSlice";
import NoData from "../../utils/no-data";

export function ManageTypes() {
  const user = useSelector((state: any) => state.user);
  const type = useSelector((state: any) => state.type);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updateData, setUpdateData] = useState();
  const dispatch = useDispatch();
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setUpdateData(undefined);
  };
  const updateType = (category: any) => {
    setUpdateData(category);
    setIsModalOpen(true);
  };
  const delType = async (id: string) => {
    await dispatch(deleteType({ id }) as any);
    await dispatch(fetchType(user.id) as any);
  };

  useEffect(() => {
    if (!isModalOpen) {
      dispatch(fetchType(user.id) as any);
    }
  }, [dispatch, isModalOpen]);

  return (
    <>
      <header className="flex justify-between items-center mb-8">
        <h2 className="bg-white text-black rounded-3xl px-3 shadow w-fit h-fit">
          Expense Types
        </h2>
        <div>
          <button
            onClick={openModal}
            className="flex justify-between items-center bg-accent text-white font-bold rounded-3xl py-1 px-3 shadow w-fit"
          >
            <img className="w-[30px] me-2" src={plus} alt="add" />
            Add Type
          </button>
          {isModalOpen && (
            <AddTypeModal
              isOpen={isModalOpen}
              onClose={closeModal}
              userId={user.id}
              updateData={updateData}
            />
          )}
        </div>
      </header>
      <main>
        <section>
          {type.typeData.length > 0 && (
            <div className="shadow max-h-[70vh]  overflow-auto">
              <table className="w-full h-full table-auto border-collapse">
                <thead className="bg-accent text-left text-white font-bold sticky top-0">
                  <tr>
                    <th className="px-4 py-2">#</th>
                    <th className="px-4 py-2">Title</th>
                    <th className="px-4 py-2">Description</th>
                    <th className="px-4 py-2">Type</th>
                    <th className="px-4 py-2">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white ">
                  {type.typeData.map((type: any, index: number) => {
                    return (
                      <tr key={type.id}>
                        <td className="px-4 py-2">{index + 1}</td>
                        <td className="px-4 py-2 capitalize">{type.title}</td>
                        <td className="px-4 py-2 capitalize">
                          {type.description}
                        </td>
                        <td className="px-4 py-2 ">
                          {type.isCommon ? "General" : "Personal"}
                        </td>
                        <td className="whitespace-nowrap px-4 py-2">
                          {!type.isCommon && (
                            <>
                              <button
                                onClick={() => updateType(type)}
                                className="m-1"
                              >
                                <img
                                  className="w-[25px]"
                                  src={update}
                                  loading="lazy"
                                  alt="update"
                                />
                              </button>
                              <button
                                onClick={() => delType(type.id)}
                                className="m-1"
                              >
                                <img className="w-[25px]" src={del} alt="del" />
                              </button>
                            </>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
          {type.typeData.length <= 0 && <NoData />}
        </section>
      </main>
    </>
  );
}
