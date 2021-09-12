import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { toast } from "react-toastify";
import { auth } from "../firebase";

class AuthApi {
  async login(email: string, password: string) {
    return signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        toast.success(`Вы вошли в аккаунт как ${userCredential.user.email}`);
        return userCredential.user;
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        toast.error(`Ошибка ${errorCode}: ${errorMessage}`);
      });
  }

  async logout() {
    return await signOut(auth);
  }
}

export default new AuthApi();
