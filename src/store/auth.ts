import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { User } from "firebase/auth";
import { toast } from "react-toastify";
import authApi from "../api/authApi";
import { UserSignInData } from "../types";

interface AuthState {
  user: User | null;
  isLoading: boolean;
}

const initialState: AuthState = {
  user: null,
  isLoading: false,
};

export const signIn = createAsyncThunk(
  "auth/signIn",
  async (payload: UserSignInData, thunkAPI) => {
    thunkAPI.dispatch(setLoading(true));
    try {
      const userCredential = await authApi.login(payload);
      if (userCredential.user) {
        toast.success(`Вы вошли в аккаунт как ${userCredential.user.email}`);
        thunkAPI.dispatch(setUser(userCredential.user));
      } else {
        toast.warn("Не удалось войти: почта или пароль не совпадают");
      }
    } catch (error) {
      toast.error(`Ошибка: ${(error as Error).message}`);
      console.error(error);
    } finally {
      thunkAPI.dispatch(setLoading(false));
    }
  }
);

export const signOut = createAsyncThunk("auth/signOut", async (_, thunkAPI) => {
  thunkAPI.dispatch(setLoading(true));
  try {
    await authApi.logout();
    toast.success(`Вы успешно вышли из аккаунта`);
    thunkAPI.dispatch(setUser(null));
  } catch (error) {
    toast.error(`Ошибка: ${(error as Error).message}`);
    console.error(error);
  } finally {
    thunkAPI.dispatch(setLoading(false));
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    setUser(state, action: PayloadAction<User | null>) {
      state.user = action.payload;
    },
  },
});

export const { setUser, setLoading } = authSlice.actions;
export default authSlice.reducer;

interface ContainAuth {
  auth: AuthState;
}
export const selectUser = (state: ContainAuth) => state.auth.user;
export const selectUserLoading = (state: ContainAuth) => state.auth.isLoading;
