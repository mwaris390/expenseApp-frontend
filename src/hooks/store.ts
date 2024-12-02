import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";
import CategorySlice from "./slices/categoriesSlice"
import TypeSlice from "./slices/typeSlice";
import ExpenseSlice from "./slices/expenseSlice"
export const Store = configureStore({
  reducer: {
    user: userSlice,
    category: CategorySlice,
    type:TypeSlice,
    expense:ExpenseSlice
  },
});