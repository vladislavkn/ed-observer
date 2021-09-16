import { toast } from "react-toastify";
import { AnyAction } from "redux";
import { ThunkAction } from "redux-thunk";
import commonScheduleAPI from "../api/commonScheduleAPI";
import LessonHomework from "../api/lessonHomework";
import scheduleAPI from "../api/scheduleAPI";
import { RootState } from "../store";
import { CommonSchedule, Homework, Schedule } from "../types";
import asyncMap from "../utils";

export enum ScheduleActions {
  SET_COMMON_SCHEDULE = "SET_COMMON_SCHEDULE",
  SET_SCHEDULE = "SET_SCHEDULE",
  SET_FAILTURE = "SET_FAILTURE",
  START_LOAD = "START_LOAD",
  SET_LESSON_HOMEWORK = "SET_LESSON_HOMEWORK",
}

export const setCommonSchedule = (commonSchedule: CommonSchedule) => ({
  type: ScheduleActions.SET_COMMON_SCHEDULE,
  payload: commonSchedule,
});

export const setSchedule = (schedule: Schedule) => ({
  type: ScheduleActions.SET_SCHEDULE,
  payload: schedule,
});

export const setFailture = (error: Error) => ({
  type: ScheduleActions.SET_FAILTURE,
  payload: error,
});

export const startLoad = () => ({
  type: ScheduleActions.START_LOAD,
});

export const setLessonHomework = (homework: Homework, lessonId: string) => ({
  type: ScheduleActions.SET_LESSON_HOMEWORK,
  payload: {
    homework,
    lessonId,
  },
});

export const fetchAllSchedule =
  (
    groupName: string,
    date: Date
  ): ThunkAction<void, RootState, Promise<void>, AnyAction> =>
  (dispatch) => {
    dispatch(startLoad());

    commonScheduleAPI
      .fetchCommonSchedule(groupName)
      .then((commonSchedule) => {
        dispatch(setCommonSchedule(commonSchedule));
        return scheduleAPI.getCurrentSchedule(commonSchedule, date, groupName);
      })
      .then((schedule) => {
        dispatch(setSchedule(schedule));
      })
      .catch((error) => {
        toast.error(`Ошибка при загрузке расписания: ${error.message}`);
        console.error(error);
        dispatch(setFailture(error));
      });
  };

export const fetchSchedule =
  (
    groupName: string,
    date: Date
  ): ThunkAction<void, RootState, Promise<void>, AnyAction> =>
  (dispatch, getState) => {
    const state = getState();
    if (!state.schedule.commonSchedule) return;

    dispatch(startLoad());

    scheduleAPI
      .getCurrentSchedule(state.schedule.commonSchedule, date, groupName)
      .then((schedule) => dispatch(setSchedule(schedule)))
      .catch((error) => {
        toast.error(`Ошибка при загрузке расписания: ${error.message}`);
        console.error(error);
        dispatch(setFailture(error));
      });
  };

export const saveLessonHomeworks =
  (): ThunkAction<void, RootState, Promise<void>, AnyAction> =>
  async (dispatch, getState) => {
    const state = getState();
    if (!state.schedule.schedule) return;

    await asyncMap(state.schedule.schedule, async (day) =>
      asyncMap(
        day.lessons,
        async (lesson) =>
          await new LessonHomework(lesson.id)
            .setHomework(lesson.homework)
            .catch((error) =>
              toast.error(
                `Ошибка при обновлении домашнего задания: ${error.message}`
              )
            )
      )
    );

    await dispatch(
      fetchSchedule("ИНБО-01-21", state.schedule.schedule[0].date)
    );
    toast.success("Информация успешно обновлена");
  };
