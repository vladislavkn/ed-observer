import { useDispatch } from "react-redux";
import { setLessonHomework } from "../actions/schedule";
import { useUser } from "../hooks/user";
import { ScheduleDayLesson } from "../types";
import Linkify from "react-linkify";
import { usePreview } from "../hooks/editor";

const ScheduleDayCardLessonText: React.FC<{
  lesson: ScheduleDayLesson;
}> = ({ lesson }) => {
  const user = useUser();
  const preview = usePreview();
  const dispatch = useDispatch();
  const onChange = (text: string) =>
    dispatch(setLessonHomework({ ...lesson.homework, text }, lesson.id));

  return user && !preview ? (
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
  );
};

export default ScheduleDayCardLessonText;
