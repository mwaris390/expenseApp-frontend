import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

import toast from "react-hot-toast";
type Category = {
  id: string;
  title: string;
  description: string;
  userId: string | null;
  isCommon: boolean;
  createdAt: string;
  updatedAt: string;
};
const initialState: categoryState = {
  categoryData: [
    {
      id: "",
      title: "",
      description: "",
      isCommon: false,
      userId: "",
      createdAt: "",
      updatedAt: "",
    },
  ],
  status: "idle",
  error: "",
};
export interface categoryState {
  categoryData: Category[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}
interface MyAsyncThunkConfig {
  rejectValue: string;
}
export const fetchCategory = createAsyncThunk<
  Category[],
  string,
  MyAsyncThunkConfig
>("category/fetchCategory", async (userId: string, thunkAPI) => {
  try {
    const response = await axios.get(`expense-category/${userId}`);
    toast.success(response.data.message);
    return response.data.data;
  } catch (e: any) {
    toast.error(e.response.data.message);
    return thunkAPI.rejectWithValue(e);
  }
});
export const addCategory = createAsyncThunk<
  any,
  { userId: string; data: any },
  MyAsyncThunkConfig
>("category/addCategory", async ({ userId, data }, thunkAPI) => {
  try {
    const response = await axios.post(
      `expense-category-by-user`,
      Object.assign(data, { userId })
    );
    toast.success(response.data.message);
    return response.data.data;
  } catch (e: any) {
    toast.error(e.response.data.message);
    return thunkAPI.rejectWithValue(e);
  }
});
export const deleteCategory = createAsyncThunk<
  any,
  { id: string },
  MyAsyncThunkConfig
>("category/deleteCategory", async ({ id }, thunkAPI) => {
  try {
    const response = await axios.delete(`expense-category`, {
      data: { id:id },
    });
    toast.success(response.data.message);
    return response.data.data;
  } catch (e: any) {
    console.log(e.response.data.error);
    
    toast.error(e.response.data.message);
    return thunkAPI.rejectWithValue(e);
  }
});
export const updateCategory = createAsyncThunk<
  any,
  { categoryId: string; data: any },
  MyAsyncThunkConfig
>("category/updateCategory", async ({ categoryId, data }, thunkAPI) => {
  try {
    const response = await axios.put(
      `expense-category`,
      Object.assign(data, { id: categoryId })
    );
    toast.success(response.data.message);
    return response.data.data;
  } catch (e: any) {
    toast.error(e.response.data.message);
    return thunkAPI.rejectWithValue(e);
  }
});
const CategorySlice = createSlice({
  name: "category",
  initialState: initialState,
  reducers: {
    getCategory: (state) => {
      return state;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategory.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchCategory.fulfilled,
        (state, action: PayloadAction<Category[]>) => {
          state.categoryData = action.payload;
          state.status = "succeeded";
        }
      )
      .addCase(fetchCategory.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch category data";
      })

      .addCase(addCategory.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addCategory.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(addCategory.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to add category data";
      })

      .addCase(deleteCategory.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteCategory.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to delete category data";
      })

      .addCase(updateCategory.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateCategory.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to update category data";
      });
  },
});

export const { getCategory } = CategorySlice.actions;
export default CategorySlice.reducer;
