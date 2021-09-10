import { Weekday } from "../types";
import { formatDayAndMonth, formatWeekDay } from "../utils";
import AppEmptyFallback from "./AppEmptyFallback";
import WeekdayLessonCard from "./WeekdayLessonCard";

const WeekdayCard: React.FC<{
  weekday: Weekday;
}> = ({ weekday }) => (
  <div>
    <p className="mb-0">
      <small>{formatDayAndMonth(weekday.date)}</small>
    </p>
    <div className="d-flex align-items-center">
      <h2 className="text-capitalize me-2">{formatWeekDay(weekday.date)}</h2>
      {weekday.isOnline && <span className="badge bg-primary">Удаленно</span>}
    </div>
    <div>
      {weekday.lessons.map((lesson) => (
        <div className="mb-2" key={lesson.id}>
          <WeekdayLessonCard lesson={lesson} />
        </div>
      ))}
      {weekday.lessons.length === 0 && (
        <AppEmptyFallback message="Нет предметов" />
      )}
    </div>
  </div>
);

export default WeekdayCard;
