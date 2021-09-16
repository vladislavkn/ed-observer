import { useDispatch } from "react-redux";
import { setLessonHomework } from "../actions/schedule";
import { useUser } from "../hooks/user";
import { ScheduleDayLesson } from "../types";
import Linkify from "react-linkify";
import { usePreview } from "../hooks/editor";
import TextareaAutosize from "react-textarea-autosize";
import { FormEvent } from "react";

const ScheduleDayCardLessonText: React.FC<{
  lesson: ScheduleDayLesson;
}> = ({ lesson }) => {
  const user = useUser();
  const preview = usePreview();
  const showTextarea = user && !preview;
  const dispatch = useDispatch();
  const onChange = (e: FormEvent<HTMLTextAreaElement>) =>
    dispatch(
      setLessonHomework(
        { ...lesson.homework, text: (e.target as HTMLTextAreaElement).value },
        lesson.id
      )
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
