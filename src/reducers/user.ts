import { User } from "firebase/auth";
import { UserActions } from "../actions/user";
import { ActionWithPayload } from "../types";

type UserState = {
  user: User | null;
  error: Error | null;
  loading: boolean;
};

const initialState: UserState = {
  user: null,
  error: null,
  loading: false,
};

export default function userReducer(
  state = initialState,
  action: ActionWithPayload<UserActions, User | Error | undefined>
): UserState {
  switch (action.type) {
    case UserActions.SET_USER_SUCCESS:
      return {
        ...state,
        user: action.payload as User,
        loading: false,
        error: null,
      };
    case UserActions.SET_USER_FAILTURE:
      return {
        ...state,
        user: null,
        loading: false,
        error: action.payload as Error,
      };
    case UserActions.START_USER_LOAD:
      return { ...state, loading: true, error: null };
    case UserActions.REMOVE_USER:
      return { ...state, user: null, loading: false, error: null };
    default:
      return state;
  }
}
