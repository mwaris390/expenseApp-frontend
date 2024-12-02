import { createSlice, PayloadAction } from "@reduxjs/toolkit";
type User = {
  id: string;
  email: string;
  pic: string;
  isVerified: boolean;
};
const initialState: User = {
  id: localStorage.getItem("userId") || "",
  email: localStorage.getItem("email") || "",
  pic: localStorage.getItem("pic") || "",
  isVerified:
    localStorage.getItem("isVerified") == "false" ? false : true || false,
};
const UserSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.email = action.payload.email;
      state.id = action.payload.id;
      state.isVerified = action.payload.isVerified;
      state.pic = action.payload.pic;
      localStorage.setItem("userId", action.payload.id);
      localStorage.setItem("email", action.payload.email);
      localStorage.setItem("isVerified", String(action.payload.isVerified));
      localStorage.setItem("pic", action.payload.pic);
    },
    setVerified: (state, action: PayloadAction<{ isVerified: boolean }>) => {
      state.isVerified = action.payload.isVerified;
      localStorage.setItem("isVerified", String(action.payload.isVerified));
    },
  },
});
export const { setUser, setVerified } = UserSlice.actions;
export default UserSlice.reducer;
