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
    return this.convertScheduleDTOToCommonSchedule(scheduleDTO);
  }

  private fetchScheduleDTO(groupName: string): Promise<ScheduleDTO> {
    return fetch(this.getAPIUrl(groupName)).then((res) => {
      if(!res.ok)) {
        throw new Error(`Неполадки с сервером: код ${res.status}`)
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

  private convertScheduleDTOToCommonSchedule(
    scheduleDTO: ScheduleDTO
  ): CommonSchedule {
    return {
      even: this.getCommonScheduleWeek(scheduleDTO, 0),
      odd: this.getCommonScheduleWeek(scheduleDTO, 1),
    };
  }

  private getCommonScheduleWeek(
    scheduleDTO: ScheduleDTO,
    parity: number
  ): CommonScheduleDay[] {
    return Object.values(scheduleDTO.schedule).map((scheduleDayDTO) =>
      this.getCommonScheduleDay(scheduleDayDTO, parity)
    );
  }

  private getCommonScheduleDay(
    scheduleDayDTO: ScheduleDayDTO,
    parity: number
  ): CommonScheduleDay {
    return {
      lessons: scheduleDayDTO.lessons
        .map((lessonVariants, index) =>
          this.getCommonScheduleDayLessonByVariant(
            lessonVariants,
            index,
            parity
          )
        )
        .filter(Boolean) as unknown as CommonScheduleDayLesson[],
    };
  }

  private getCommonScheduleDayLessonByVariant(
    lessonVariants: ScheduleLessonDTO[],
    order: number,
    parity: number
  ): CommonScheduleDayLesson | null {
    const lesson = lessonVariants.filter(
      (lesson) => lesson.weeks[0] % 2 === parity
    )[0];
    if (!lesson) return null;

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
    };
  }
}

export default new CommonScheduleAPI();
