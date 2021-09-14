import { useSelector } from "react-redux";
import { RootState } from "../store";

export const useUser = () =>
  useSelector<RootState, RootState["user"]["user"]>((state) => state.user.user);
