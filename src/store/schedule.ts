import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import commonScheduleAPI from "../api/commonScheduleAPI";
import LessonHomework from "../api/lessonHomework";
import scheduleAPI from "../api/scheduleAPI";
import { CommonSchedule, Homework, Schedule } from "../types";
import asyncMap from "../utils";

interface ScheduleState {
  commonSchedule: CommonSchedule | null;
  schedule: Schedule | null;
  error: Error | null;
  isLoading: boolean;
}

const initialState: ScheduleState = {
  commonSchedule: null,
  schedule: null,
  error: null,
  isLoading: false,
};

interface FetchHomeworkOptions {
  groupName: string;
  date: Date;
  commonSchedule?: CommonSchedule;
}
export const fetchHomework = createAsyncThunk(
  "schedule/fetchHomework",
  async (options: FetchHomeworkOptions, thunkAPI) => {
    thunkAPI.dispatch(setLoading(true));
    try {
      const state = thunkAPI.getState() as ScheduleState;

      const commonSchedule = options.commonSchedule ?? state.commonSchedule;
      if (!commonSchedule) throw new Error("Расписание не загружено");

      const schedule = await scheduleAPI.getCurrentSchedule(
        commonSchedule,
        options.date,
        options.groupName
      );
      thunkAPI.dispatch(setSchedule(schedule));
      thunkAPI.dispatch(setError(null));
    } catch (error) {
      thunkAPI.dispatch(setError(error as Error));
      toast.error(`Ошибка: ${(error as Error).message}`);
      console.error(error);
    } finally {
      thunkAPI.dispatch(setLoading(false));
    }
  }
);

export const fetchSchedule = createAsyncThunk(
  "schedule/fetchSchedule",
  async (groupName: string, thunkAPI) => {
    thunkAPI.dispatch(setLoading(true));
    try {
      const commonSchedule = await commonScheduleAPI.fetchCommonSchedule(
        groupName
      );
      thunkAPI.dispatch(setCommonSchedule(commonSchedule));
      thunkAPI.dispatch(setError(null));
    } catch (error) {
      thunkAPI.dispatch(setError(error as Error));
      toast.error(`Ошибка: ${(error as Error).message}`);
      console.error(error);
    } finally {
      thunkAPI.dispatch(setLoading(false));
    }
  }
);

export const refetchSchedule = createAsyncThunk(
  "schedule/refetchSchedule",
  async (options: FetchHomeworkOptions, thunkAPI) => {
    await thunkAPI.dispatch(fetchSchedule(options.groupName));
    await thunkAPI.dispatch(fetchHomework(options));
  }
);

export const saveHomeworks = createAsyncThunk(
  "schedule/saveHomeworks",
  async (_, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as ScheduleState;
      if (!state.schedule)
        throw new Error(
          "Невозможно сохранить домашние задания - расписание не загружено"
        );

      await asyncMap(state.schedule, async (day) =>
        asyncMap(day.lessons, async (lesson) =>
          new LessonHomework(lesson.id)
            .setHomework(lesson.homework)
            .catch((error) => {
              throw new Error(
                `Не удалось обновить домашнее задание (${error.message})`
              );
            })
        )
      );

      await thunkAPI.dispatch(fetchSchedule("ИНБО-01-21"));
      await thunkAPI.dispatch(setError(null));
      toast.success("Информация успешно обновлена");
    } catch (error) {
      thunkAPI.dispatch(setError(error as Error));
      toast.error(`Ошибка: ${(error as Error).message}`);
      console.error(error);
    }
  }
);

const scheduleSlice = createSlice({
  name: "schedule",
  initialState,
  reducers: {
    setError(state, action: PayloadAction<ScheduleState["error"]>) {
      state.error = action.payload;
    },
    setLoading(state, action: PayloadAction<ScheduleState["isLoading"]>) {
      state.isLoading = action.payload;
    },
    setSchedule(state, action: PayloadAction<ScheduleState["schedule"]>) {
      state.schedule = action.payload;
    },
    setCommonSchedule(
      state,
      action: PayloadAction<ScheduleState["commonSchedule"]>
    ) {
      state.commonSchedule = action.payload;
    },
    setLessonHomework(
      state,
      action: PayloadAction<{ homework: Homework; lessonId: string }>
    ) {
      if (!state.schedule) return;

      let dayIndex, lessonIndex;
      state.schedule?.forEach((day, _dayIndex) => {
        day.lessons.forEach((lesson, _lessonIndex) => {
          if (lesson.id === action.payload.lessonId) {
            dayIndex = _dayIndex;
            lessonIndex = _lessonIndex;
          }
        });
      });

      if (!dayIndex || !lessonIndex) return;
      state.schedule[dayIndex].lessons[lessonIndex].homework =
        action.payload.homework;
    },
  },
});

export const {
  setError,
  setLoading,
  setSchedule,
  setCommonSchedule,
  setLessonHomework,
} = scheduleSlice.actions;
export default scheduleSlice.reducer;

interface ContainSchedule {
  schedule: ScheduleState;
}
export const selectScheduleState = (state: ContainSchedule) => state.schedule;
export const selectMonday = (state: ContainSchedule) =>
  (state.schedule.schedule && state.schedule.schedule[0].date) ?? null;
