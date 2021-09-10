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
