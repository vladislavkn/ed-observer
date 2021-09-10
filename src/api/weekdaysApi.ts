import addDays from "date-fns/addDays";
import { Lesson, ScheduleDTO, Weekday } from "../types";
import { getWeekMonday, getWeekParity, transliterate } from "../utils";

class WeekdaysApi {
  private schedule: Record<string, ScheduleDTO> = {};

  public async getWeek(startDate: Date, groupName: string): Promise<Weekday[]> {
    const scheduleDTO = await this.getSchedule(groupName);

    return this.generateWeekdays(
      scheduleDTO,
      getWeekMonday(startDate),
      getWeekParity(startDate)
    );
  }

  public async revalidate(groupName: string) {
    if (this.schedule[groupName]) delete this.schedule[groupName];

    await this.getSchedule(groupName);
  }

  private generateWeekdays(
    schedule: ScheduleDTO,
    monday: Date,
    weekParity: number
  ): Weekday[] {
    return new Array(6).fill(null).map((_, i) => {
      const day = addDays(monday, i);
      return {
        date: day,
        id: day.getTime(),
        lessons: this.generateCurrentWeekdayLessons(schedule, day, weekParity),
      };
    });
  }

  private generateCurrentWeekdayLessons(
    schedule: ScheduleDTO,
    day: Date,
    weekParity: number
  ) {
    return schedule.schedule[
      day.getDay() as 1 | 2 | 3 | 4 | 5 | 6
    ].lessons.reduce((all, cur) => {
      const lesson: Lesson = cur
        .filter((lesson) => lesson.weeks[0] % 2 === weekParity)
        .map((lesson) => ({
          name: lesson.name,
          id: this.generateLessonId(
            day,
            schedule.group,
            `${lesson.time_start}-${lesson.time_end}`
          ),
          type: { лк: "lection", пр: "practice", "лаб\nлаб": "lab" }[
            lesson.types
          ] as Lesson["type"],
          time: `${lesson.time_start}-${lesson.time_end}`,
          adress: lesson.rooms.join(" "),
        }))[0];

      return lesson ? [...all, lesson] : all;
    }, [] as Lesson[]);
  }

  private generateLessonId(day: Date, groupName: string, time: string) {
    return day.toISOString() + transliterate(groupName) + time;
  }

  async getSchedule(groupName: string): Promise<ScheduleDTO> {
    if (this.schedule[groupName]) return this.schedule[groupName];

    let cachedSchedule = localStorage.getItem(`schedule_${groupName}`);
    if (cachedSchedule) {
      this.schedule[groupName] = JSON.parse(cachedSchedule);
    } else {
      this.schedule[groupName] = await this.fetchSchedule(groupName);
      localStorage.setItem(
        `schedule_${groupName}`,
        JSON.stringify(this.schedule[groupName])
      );
    }

    return this.schedule[groupName];
  }

  private async fetchSchedule(groupName: string): Promise<ScheduleDTO> {
    const data: ScheduleDTO = await fetch(
      process.env.REACT_APP_API_URL + `/schedule/${groupName}/full_schedule`
    ).then((res) => res.json());

    return data;
  }
}

export default new WeekdaysApi();
