import { useSelector } from "react-redux";
import { RootState } from "../store";

export const useScheduleState = () =>
  useSelector<RootState, RootState["schedule"]>((state) => state.schedule);

export const useCurrentMonday = () =>
  useSelector<RootState, Date | null>(
    (state) =>
      (state.schedule.schedule && state.schedule.schedule[0].date) ?? null
  );
