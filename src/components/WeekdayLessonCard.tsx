import { Lesson } from "../types";

const WeekdayLessonCard: React.FC<{ lesson: Lesson }> = ({ lesson }) => (
  <div className="card">
    <div className="card-body">
      <h6 className="card-title">{lesson.name}</h6>

      <p className="card-text">{lesson.homework ?? "Нет домашнего задания"}</p>
      <div className="flex align-items-center">
        {[
          { lection: "Лекция", practice: "Практика", lab: "Лабораторная" }[
            lesson.type
          ],
          lesson.adress,
          lesson.time,
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

export default WeekdayLessonCard;
