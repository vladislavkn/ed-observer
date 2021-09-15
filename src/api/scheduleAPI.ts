import { addDays, differenceInDays, subDays } from "date-fns";
import {
  CommonSchedule,
  CommonScheduleDay,
  CommonScheduleDayLesson,
  Schedule,
  ScheduleDayLesson,
} from "../types";
import asyncMap, { transliterate } from "../utils";
import LessonHomework from "./lessonHomework";

class ScheduleAPI {
  public async getCurrentSchedule(
    commonSchedule: CommonSchedule,
    date: Date,
    groupName: string
  ): Promise<Schedule> {
    const currentWeekMonday = this.getCurrentWeekMonday(date);
    const weekParity = this.getCurrentWeekParity(currentWeekMonday);

    return await this.getSchedule(
      commonSchedule[weekParity === 0 ? "even" : "odd"],
      currentWeekMonday,
      groupName
    );
  }

  private async getSchedule(
    days: CommonScheduleDay[],
    mondayDate: Date,
    groupName: string
  ): Promise<Schedule> {
    return asyncMap(days, async (day, index) => {
      const dayDate = addDays(mondayDate, index);

      return {
        date: dayDate,
        lessons: await asyncMap(day.lessons, async (lesson) => {
          const lessonId = this.getLessonId(lesson, groupName, dayDate);

          return {
            ...lesson,
            id: lessonId,
            homework: await new LessonHomework(lessonId).fetchHomework(),
          };
        }),
      };
    });
  }

  private getLessonId(
    lesson: CommonScheduleDayLesson | ScheduleDayLesson,
    groupName: string,
    date: Date
  ) {
    return `${date.getDate()}_${date.getMonth()}_${date.getFullYear()}_${transliterate(
      groupName
    )}_${lesson.time}`;
  }

  private getCurrentWeekMonday(date: Date): Date {
    return subDays(date, Math.abs(1 - date.getDay()));
  }

  private getCurrentWeekParity(date: Date): number {
    const septemberFirst = new Date(`09.01.${new Date().getFullYear()}`);

    const daysFromFirstMonday = differenceInDays(
      date,
      this.getCurrentWeekMonday(septemberFirst)
    );

    const weeksFromSeptemberFirst = Math.floor(daysFromFirstMonday / 7) + 1;
    return weeksFromSeptemberFirst % 2;
  }
}

export default new ScheduleAPI();
