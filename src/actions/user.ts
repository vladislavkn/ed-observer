import { User } from "firebase/auth";
import { toast } from "react-toastify";
import { AnyAction } from "redux";
import { ThunkAction } from "redux-thunk";
import authApi from "../api/authApi";
import { RootState } from "../store";

export enum UserActions {
  SET_USER_SUCCESS = "SET_USER_SUCCESS",
  SET_USER_FAILTURE = "SET_USER_FAILTURE",
  START_USER_LOAD = "START_USER_LOAD",
  REMOVE_USER = "REMOVE_USER",
}

export const login =
  (
    email: string,
    password: string,
    callback: () => void
  ): ThunkAction<void, RootState, Promise<void>, AnyAction> =>
  (dispatch) => {
    authApi
      .login(email, password)
      .then((userData) => {
        if (userData.user) {
          toast.success(`Вы вошли в аккаунт как ${userData.user.email}`);
          callback();
        } else toast.warn("Неверные данные");
      })
      .catch((error) => {
        toast.error(`Ошибка: ${error.message}`);
        console.error(error);
      });
  };

export const logout =
  (): ThunkAction<void, RootState, Promise<void>, AnyAction> => async () => {
    await authApi.logout();
    toast.success(`Вы успешно вышли из аккаунта`);
  };

export const setUserSuccess = (user: User) => ({
  type: UserActions.SET_USER_SUCCESS,
  payload: user,
});

export const setUserFailture = (error: Error) => ({
  type: UserActions.SET_USER_FAILTURE,
  payload: error,
});

export const startUserLoad = () => ({
  type: UserActions.START_USER_LOAD,
});

export const removeUser = () => ({
  type: UserActions.REMOVE_USER,
});
