import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

type TypeData = {
  id: string;
  title: string;
  description: string;
  userId: string | null;
  isCommon: boolean;
  createdAt: string;
  updatedAt: string;
};
interface MyAsyncThunkConfig {
  rejectValue: string;
}
export interface TypeState {
  typeData: TypeData[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

export const fetchType = createAsyncThunk<TypeData[], string, MyAsyncThunkConfig>(
  "type/fetchType",
  async (userId: string, thunkAPI) => {
    try {
      const response = await axios.get(`expense-type/${userId}`);
      return response.data.data;
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);
export const addType = createAsyncThunk<
  any,
  { userId: string; data: any },
  MyAsyncThunkConfig
>("type/addType", async ({ userId, data }, thunkAPI) => {
  try {
    const response = await axios.post(
      `expense-type-by-user`,
      Object.assign(data, { userId })
    );
    toast.success(response.data.message);
    return response.data.data;
  } catch (e: any) {
    toast.error(e.response.data.message);
    return thunkAPI.rejectWithValue(e);
  }
});
export const deleteType = createAsyncThunk<
  any,
  { id: string },
  MyAsyncThunkConfig
>("type/deleteType", async ({ id }, thunkAPI) => {
  try {
    const response = await axios.delete(`expense-type`, {
      data: { id },
    });
    toast.success(response.data.message);
    return response.data.data;
  } catch (e: any) {
    toast.error(e.response.data.message);
    return thunkAPI.rejectWithValue(e);
  }
});
export const updateType = createAsyncThunk<
  any,
  { id: string; data: any },
  MyAsyncThunkConfig
>("type/updateType", async ({ id, data }, thunkAPI) => {
  try {
    const response = await axios.put(
      `expense-type`,
      Object.assign(data, { id })
    );
    toast.success(response.data.message);
    return response.data.data;
  } catch (e: any) {
    toast.error(e.response.data.message);
    return thunkAPI.rejectWithValue(e);
  }
});

const initialState: TypeState = {
  typeData: [{
    id: "",
    title: "",
    description: "",
    isCommon: false,
    userId: "",
    createdAt: "",
    updatedAt: "",
  }],
  status: "idle",
  error: "",
};

const TypeSlice = createSlice({
  name: "type",
  initialState: initialState,
  reducers: {
    getType: (state) => {
      return state;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchType.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchType.fulfilled,
        (state, action: PayloadAction<TypeData[]>) => {
          state.typeData = action.payload;
          state.status = "succeeded";
        }
      )
      .addCase(fetchType.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch type data";
      })

      .addCase(addType.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addType.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(addType.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to add type data";
      })


      .addCase(deleteType.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteType.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(deleteType.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to delete type data";
      })


      .addCase(updateType.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateType.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(updateType.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to update type data";
      });
  },
});
export const { getType } = TypeSlice.actions;
export default TypeSlice.reducer;
