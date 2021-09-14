import { Action } from "redux";

export type Lesson = {
  name: string;
  id: string;
  teacher?: string;
  adress?: string;
  homework?: string;
  type: "lection" | "practice" | "lab";
  time: string;
};

export type Weekday = {
  isOnline?: boolean;
  date: Date;
  lessons: Lesson[];
  id: number | string;
};

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
};

export type CommonScheduleDayLesson = {
  name: string;
  id: string;
  type: "lection" | "practice" | "lab";
  time: string;
  teacher?: string;
  adress?: string;
  homework?: string;
  order?: number;
};

export type CommonScheduleDay = CommonScheduleDayLesson[];

export type Schedule = CommonScheduleDay[];

export type CommonSchedule = {
  odd: Schedule;
  even: Schedule;
};

export type ActionWithPayload<A, T> = Action<A> & {
  payload: T;
};
