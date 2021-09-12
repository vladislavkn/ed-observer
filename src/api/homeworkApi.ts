import { doc, DocumentReference, getDoc, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { auth, firestore } from "../firebase";
import inMemoryCache from "../inMemoryCache";
import { Homework } from "../types";

class HomeworkApi {
  async getHomeworkByLessonId(lessonId: string) {
    try {
      return inMemoryCache.getAsync(lessonId, () =>
        this.fetchHomeworkByLessonId(lessonId)
      );
    } catch (e) {
      console.error(e);
      toast.error((e as Error).message);
    }
  }

  async updateHomeworkByLessonId(lessonId: string, text: string) {
    try {
      const docRef = this.getDocRef(lessonId);

      await setDoc(docRef, {
        text,
        userId: auth.currentUser?.uid,
      });

      return this.getDocData(docRef);
    } catch (e) {
      console.error(e);
      toast.error((e as Error).message);
    }
  }

  private fetchHomeworkByLessonId(lessonId: string) {
    const docRef = this.getDocRef(lessonId);
    return this.getDocData(docRef);
  }

  private getDocRef(lessonId: string) {
    return doc(firestore, "homeworks", lessonId) as DocumentReference<Homework>;
  }

  private async getDocData(docRef: DocumentReference<Homework>) {
    return (await getDoc(docRef)).data();
  }
}

export default new HomeworkApi();
