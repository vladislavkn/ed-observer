import { useEffect } from "react";
import { useState } from "react";
import homeworkApi from "../api/homeworkApi";
import { homeworkEmmiter } from "../emmiters";
import { Lesson } from "../types";
import Linkify from "react-linkify";
import { useUser } from "../selectors/user";

const WeekdayLessonCard: React.FC<{ lesson: Lesson }> = ({ lesson }) => {
  const [homeworkText, setHomeworkText] = useState("");
  const user = useUser();

  useEffect(() => {
    homeworkApi
      .getHomeworkByLessonId(lesson.id)
      .then((res) => setHomeworkText(res?.text ?? ""));
  }, [lesson.id]);

  useEffect(() => {
    if (user)
      return homeworkEmmiter.subscribe("save", async () =>
        homeworkApi.updateHomeworkByLessonId(lesson.id, homeworkText)
      );
  }, [homeworkText, lesson.id, user]);

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
              value={homeworkText}
              onChange={(e) => setHomeworkText(e.target.value)}
            ></textarea>
          ) : (
            <Linkify
              componentDecorator={(url, text) => (
                <a
                  className="link-primary"
                  target="_blank"
                  href={url}
                  rel="noreferrer"
                >
                  {text}
                </a>
              )}
            >
              {homeworkText}
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

export default WeekdayLessonCard;
