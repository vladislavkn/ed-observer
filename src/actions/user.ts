import { User } from "firebase/auth";

export enum UserActions {
  SET_USER_SUCCESS,
  SET_USER_FAILTURE,
  START_USER_LOAD,
  REMOVE_USER,
}

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
