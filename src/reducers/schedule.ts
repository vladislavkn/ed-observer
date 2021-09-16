import { ScheduleActions, setLessonHomework } from "../actions/schedule";
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
    | CommonSchedule
    | Schedule
    | Error
    | ReturnType<typeof setLessonHomework>["payload"]
    | undefined
  >
): ScheduleState {
  switch (action.type) {
    case ScheduleActions.SET_COMMON_SCHEDULE:
      return {
        ...state,
        commonSchedule: action.payload as CommonSchedule,
        error: null,
        loading: false,
      };
    case ScheduleActions.SET_SCHEDULE:
      return {
        ...state,
        schedule: action.payload as Schedule,
        error: null,
        loading: false,
      };
    case ScheduleActions.START_LOAD:
      return { ...state, schedule: null, error: null, loading: true };
    case ScheduleActions.SET_FAILTURE:
      return { ...state, error: action.payload as Error, loading: false };
    case ScheduleActions.SET_LESSON_HOMEWORK:
      const payload = action.payload as ReturnType<
        typeof setLessonHomework
      >["payload"];

      return {
        ...state,
        schedule:
          state.schedule?.map((day) => ({
            ...day,
            lessons: day.lessons.map((lesson) => {
              if (lesson.id !== payload.lessonId) return lesson;
              return { ...lesson, homework: payload.homework };
            }),
          })) ?? null,
      };
    default:
      return state;
  }
}
