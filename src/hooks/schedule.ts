import { useSelector } from "react-redux";
import { RootState } from "../store";

export const useScheduleState = () =>
  useSelector<RootState, RootState["schedule"]>((state) => state.schedule);
