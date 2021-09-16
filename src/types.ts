import { Action } from "redux";

export type ScheduleLessonDTO = {
  name: string;
  teachers: string[];
  rooms: string[];
  time_start: string;
  time_end: string;
  types: string;
  weeks: number[];
};

export type ScheduleDayDTO = {
  lessons: ScheduleLessonDTO[][];
};

export type ScheduleDTO = {
  group: string;
  schedule: {
    1: ScheduleDayDTO;
    2: ScheduleDayDTO;
    3: ScheduleDayDTO;
    4: ScheduleDayDTO;
    5: ScheduleDayDTO;
    6: ScheduleDayDTO;
  };
};

export type Homework = {
  userId: string;
  text: string;
  isDraft?: boolean;
  dateUpdated: string;
};

export type CommonScheduleDayLesson = {
  name: string;
  type: "lection" | "practice" | "lab";
  time: string;
  teacher?: string;
  adress?: string;
  order?: number;
  weeks: number[];
};

export type CommonScheduleDay = {
  lessons: CommonScheduleDayLesson[];
};

export type CommonSchedule = CommonScheduleDay[];

export type ActionWithPayload<A, T> = Action<A> & {
  payload: T;
};

export type ScheduleDayLesson = CommonScheduleDayLesson & {
  homework: Homework;
  id: string;
};

export type ScheduleDay = {
  lessons: ScheduleDayLesson[];
  date: Date;
};

export type Schedule = ScheduleDay[];
