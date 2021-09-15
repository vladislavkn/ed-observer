import { CommonSchedule, Schedule } from "../types";

export enum ScheduleActions {
  SET_COMMON_SCHEDULE_SUCCESS,
  SET_COMMON_SCHEDULE_FAILTURE,
  SET_SCHEDULE,
  START_COMMON_SCHEDULE_LOAD,
}

export const setCommonScheduleSuccess = (commonSchedule: CommonSchedule) => ({
  type: ScheduleActions.SET_COMMON_SCHEDULE_SUCCESS,
  payload: commonSchedule,
});

export const setCommonScheduleFailture = (error: Error) => ({
  type: ScheduleActions.SET_COMMON_SCHEDULE_FAILTURE,
  payload: error,
});

export const setSchedule = (schedule: Schedule) => ({
  type: ScheduleActions.SET_SCHEDULE,
  payload: schedule,
});

export const startCommonScheduleLoad = () => ({
  type: ScheduleActions.START_COMMON_SCHEDULE_LOAD,
});
