import { ScheduleDayLesson } from "../types";
import Linkify from "react-linkify";
import { useUser } from "../hooks/user";
import { useDispatch } from "react-redux";
import { setLessonHomework } from "../actions/schedule";

const ScheduleDayCardLesson: React.FC<{ lesson: ScheduleDayLesson }> = ({
  lesson,
}) => {
  const user = useUser();
  const dispatch = useDispatch();
  const onChange = (text: string) =>
    dispatch(setLessonHomework({ ...lesson.homework, text }, lesson.id));

  return (
    <div className="card">
      <div className="card-body">
        <h6 className="card-title">{lesson.name}</h6>
        <p className="card-text">
          {user ? (
            <textarea
              className="w-100 border-0"
              style={{ outline: "none" }}
              placeholder="Домашнее задание"
              rows={3}
              value={lesson.homework.text}
              onChange={(e) => onChange(e.target.value)}
            ></textarea>
          ) : (
            <Linkify
              componentDecorator={(url, text) => (
                <a
                  className="link-primary"
                  target="_blank"
                  href={url}
                  rel="noreferrer"
                  key={url}
                >
                  {text}
                </a>
              )}
            >
              {lesson.homework.text}
            </Linkify>
          )}
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
};

export default ScheduleDayCardLesson;
