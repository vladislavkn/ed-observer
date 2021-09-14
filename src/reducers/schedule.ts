import { Action } from "redux";
import { CommonSchedule, Schedule } from "../types";

type ScheduleState = {
  commonSchedule: CommonSchedule | null;
  schedule: Schedule | null;
  error: Error | null;
  loading: boolean;
};

const initialState: ScheduleState = {
  commonSchedule: null,
  schedule: null,
  error: null,
  loading: false,
};

export default function scheduleReducer(
  state = initialState,
  action: Action
): ScheduleState {
  switch (action.type) {
    default:
      return state;
  }
}
