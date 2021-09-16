import { ScheduleDay } from "../types";
import { formatDayAndMonth, formatWeekDay } from "../utils";
import AppEmptyFallback from "./AppEmptyFallback";
import ScheduleDayCardLesson from "./ScheduleDayCardLesson";

const ScheduleDayCard: React.FC<{
  day: ScheduleDay;
}> = ({ day }) => (
  <div>
    <p className="mb-0">
      <small>{formatDayAndMonth(day.date)}</small>
    </p>
    <div className="d-flex align-items-center">
      <h2 className="text-capitalize me-2">{formatWeekDay(day.date)}</h2>
    </div>
    <div>
      {day.lessons.map((lesson) => (
        <div className="mb-2" key={lesson.id}>
          <ScheduleDayCardLesson lesson={lesson} />
        </div>
      ))}
      {day.lessons.length === 0 && <AppEmptyFallback message="Нет предметов" />}
    </div>
  </div>
);

export default ScheduleDayCard;
