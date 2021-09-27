import { doc, DocumentReference, getDoc, setDoc } from "firebase/firestore";
import { auth, firestore } from "../firebase";
import { Homework, ScheduleDayLesson } from "../types";

export default class LessonHomework {
  private static homeworkDocs: Record<ScheduleDayLesson["id"], LessonHomework> =
    {};

  constructor(public lessonId: string) {
    if (LessonHomework.homeworkDocs[lessonId])
      return LessonHomework.homeworkDocs[lessonId];
  }

  public async fetchHomework(): Promise<Homework> {
    const doc = await getDoc(this.doc);
    if (doc.exists()) return doc.data();
    return {
      text: "",
      userId: auth.currentUser?.uid ?? "",
      isDraft: true,
      dateUpdated: new Date().toISOString(),
    };
  }

  public async setHomework(homework: Homework): Promise<void> {
    if (homework.isDraft && homework.text.length === 0) return;
    if (homework.hasOwnProperty("isDraft")) {
      const { isDraft, ...homeworkWithoutDraftField } = homework;
      homework = homeworkWithoutDraftField;
    }
    if (!auth.currentUser)
      throw new Error(
        "Незарегестрированный пользователь не может сохранять домашние задания"
      );

    await setDoc(this.doc, {
      ...homework,
      userId: auth.currentUser.uid,
      dateUpdated: new Date().toISOString(),
    });
  }

  private get doc() {
    return doc(
      firestore,
      "homeworks",
      this.lessonId
    ) as DocumentReference<Homework>;
  }
}
