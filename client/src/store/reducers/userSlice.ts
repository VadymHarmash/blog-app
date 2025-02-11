import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUserToLogin } from "../../../interfaces/IUserToLogin";
import { IUser } from "../../../interfaces/IUser";

interface UserState {
  user: IUserToLogin | null;
  isAuthenticated: boolean;
}

const initialState: UserState = {
  user: null,
  isAuthenticated: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login(state, action: PayloadAction<IUserToLogin>) {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    logout(state) {
      state.user = null;
      state.isAuthenticated = false;
    },
    signUp(state, action: PayloadAction<IUser>) {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
  },
});

export const { login, logout, signUp } = userSlice.actions;
export default userSlice.reducer;
