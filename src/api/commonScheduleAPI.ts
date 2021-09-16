import {
  CommonSchedule,
  CommonScheduleDay,
  CommonScheduleDayLesson,
  ScheduleDayDTO,
  ScheduleDTO,
  ScheduleLessonDTO,
} from "../types";

class CommonScheduleAPI {
  public async fetchCommonSchedule(groupName: string): Promise<CommonSchedule> {
    const scheduleDTO = await this.fetchScheduleDTO(groupName);
    return this.getCommonScheduleWeek(scheduleDTO);
  }

  private getCommonScheduleWeek(scheduleDTO: ScheduleDTO): CommonScheduleDay[] {
    return Object.values(scheduleDTO.schedule).map((scheduleDayDTO) =>
      this.getCommonScheduleDay(scheduleDayDTO)
    );
  }

  private getCommonScheduleDay(
    scheduleDayDTO: ScheduleDayDTO
  ): CommonScheduleDay {
    return {
      lessons: scheduleDayDTO.lessons.reduce(
        (lessons, lessonVariants, index) => [
          ...lessons,
          ...lessonVariants.map((lesson) =>
            this.getCommonScheduleDayLesson(lesson, index)
          ),
        ],
        [] as CommonScheduleDayLesson[]
      ),
    };
  }

  private getCommonScheduleDayLesson(
    lesson: ScheduleLessonDTO,
    order: number
  ): CommonScheduleDayLesson {
    const lessonTypes: Record<
      ScheduleLessonDTO["types"],
      CommonScheduleDayLesson["type"]
    > = { лк: "lection", пр: "practice", "лаб\nлаб": "lab" };

    return {
      name: lesson.name,
      type: lessonTypes[lesson.types],
      time: `${lesson.time_start}-${lesson.time_end}`,
      teacher: lesson?.teachers.join(" "),
      adress: lesson.rooms.join(", "),
      order,
      weeks: lesson.weeks,
    };
  }

  private fetchScheduleDTO(groupName: string): Promise<ScheduleDTO> {
    return fetch(this.getAPIUrl(groupName)).then((res) => {
      if (!res.ok) {
        throw new Error(`Неполадки с сервером: код ${res.status}`);
      } else {
        return res.json();
      }
    });
  }

  private getAPIUrl(groupName: string) {
    return (
      process.env.REACT_APP_API_URL + `/schedule/${groupName}/full_schedule`
    );
  }
}

export default new CommonScheduleAPI();
