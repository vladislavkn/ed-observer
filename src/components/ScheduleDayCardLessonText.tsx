import { useDispatch } from "react-redux";
import { ScheduleDayLesson } from "../types";
import Linkify from "react-linkify";
import TextareaAutosize from "react-textarea-autosize";
import { FormEvent } from "react";
import { useAppSelector } from "../store";
import { selectUser } from "../store/auth";
import { selectIsPreview } from "../store/editor";
import { setLessonHomework } from "../store/schedule";

const ScheduleDayCardLessonText: React.FC<{
  lesson: ScheduleDayLesson;
}> = ({ lesson }) => {
  const user = useAppSelector(selectUser);
  const preview = useAppSelector(selectIsPreview);
  const dispatch = useDispatch();

  const showTextarea = user && !preview;
  const onChange = (e: FormEvent<HTMLTextAreaElement>) =>
    dispatch(
      setLessonHomework({
        homework: {
          ...lesson.homework,
          text: (e.target as HTMLTextAreaElement).value,
        },
        lessonId: lesson.id,
      })
    );

  return showTextarea ? (
    <TextareaAutosize
      className="w-100 border-0 p-0 overflow-hidden"
      style={{ outline: "none" }}
      placeholder="Домашнее задание"
      value={lesson.homework.text}
      onChange={onChange}
    ></TextareaAutosize>
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
