import { CommonSchedule, Schedule } from "../types";

export enum ScheduleActions {
  SET_COMMON_SCHEDULE_SUCCESS,
  SET_COMMON_SCHEDULE_FAILTURE,
  SET_SCHEDULE_SUCCESS,
  SET_SCHEDULE_FAILTURE,
  START_LOAD,
}

export const setCommonScheduleSuccess = (commonSchedule: CommonSchedule) => ({
  type: ScheduleActions.SET_COMMON_SCHEDULE_SUCCESS,
  payload: commonSchedule,
});

export const setCommonScheduleFailture = (error: Error) => ({
  type: ScheduleActions.SET_COMMON_SCHEDULE_FAILTURE,
  payload: error,
});

export const setScheduleSuccess = (schedule: Schedule) => ({
  type: ScheduleActions.SET_SCHEDULE_SUCCESS,
  payload: schedule,
});

export const setScheduleFailture = (error: Error) => ({
  type: ScheduleActions.SET_SCHEDULE_FAILTURE,
  payload: error,
});

export const startLoad = () => ({
  type: ScheduleActions.START_LOAD,
});
