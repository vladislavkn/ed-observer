import { ScheduleActions } from "../actions/schedule";
import { ActionWithPayload, CommonSchedule, Schedule } from "../types";

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
  action: ActionWithPayload<
    ScheduleActions,
    CommonSchedule | Schedule | Error | undefined
  >
): ScheduleState {
  switch (action.type) {
    case ScheduleActions.SET_COMMON_SCHEDULE_SUCCESS:
      return {
        ...state,
        commonSchedule: action.payload as CommonSchedule,
        error: null,
        loading: false,
      };
    case ScheduleActions.SET_COMMON_SCHEDULE_FAILTURE:
      return {
        ...state,
        commonSchedule: null,
        error: action.payload as Error,
        loading: false,
      };
    case ScheduleActions.START_COMMON_SCHEDULE_LOAD:
      return { ...state, error: null, loading: true };
    case ScheduleActions.SET_SCHEDULE:
      return { ...state, schedule: action.payload as Schedule };
    default:
      return state;
  }
}
