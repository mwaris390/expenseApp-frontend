import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";
type Expense = {
  id: string;
  title: string;
  description: string;
  amount: number;
  date: string;
  userId: string;
  expenseTypeId: string;
  expenseCategoryId: string;
  createdAt: string;
  updatedAt: string;
  category: {
    title: string;
  };
  type: {
    title: string;
  };
};
export interface ExpenseInitialState {
  expenseData: Expense[] | undefined;
  status: "idle" | "fulfilled" | "rejected" | "pending";
  error: string | null;
}
interface myAsyncConfig {
  rejectValue: string;
}
let initialState: ExpenseInitialState = {
  expenseData: [],
  status: "idle",
  error: null,
};

export const fetchExpenseData = createAsyncThunk<
  Expense[],
  string,
  myAsyncConfig
>("expense/fetchExpenseData", async (userId, thunkAPI) => {
  try {
    const response = await axios.get(`expense/${userId}`);
    // toast.success(response.data.message)
    return response.data.data;
  } catch (e: any) {
    console.log(e.response.data.error);
    toast.error(e.response.data.error);
    return thunkAPI.rejectWithValue(e.response.data.message);
  }
});
const ExpenseSlice = createSlice({
  name: "expense",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchExpenseData.pending, (state) => {
        state.status = "pending";
      })
      .addCase(fetchExpenseData.fulfilled, (state,action) => {
        state.status = 'fulfilled'
        state.expenseData = action.payload
      })
      .addCase(fetchExpenseData.rejected,(state,action)=>{
        state.status = 'rejected'
        state.error = action.error.message || "Failed to fetch Expense Data";
      })
  },
});
export default ExpenseSlice.reducer
