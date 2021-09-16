import { ScheduleDayLesson } from "../types";
import ScheduleDayCardLessonText from "./ScheduleDayCardLessonText";

const ScheduleDayCardLesson: React.FC<{ lesson: ScheduleDayLesson }> = ({
  lesson,
}) => (
  <div className="card">
    <div className="card-body">
      <h6 className="card-title">{lesson.name}</h6>
      <p className="card-text">
        <ScheduleDayCardLessonText lesson={lesson} />
      </p>
      <div className="flex align-items-center">
        {[
          { lection: "Лекция", practice: "Практика", lab: "Лабораторная" }[
            lesson.type
          ],
          lesson.adress,
          lesson.time,
          lesson.teacher,
        ]
          .filter(Boolean)
          .map((prop) => (
            <span key={prop} className="badge bg-secondary me-1">
              {prop}
            </span>
          ))}
      </div>
    </div>
  </div>
);

export default ScheduleDayCardLesson;
