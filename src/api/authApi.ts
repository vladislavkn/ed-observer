import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../firebase";

class AuthApi {
  async login(email: string, password: string) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  async logout() {
    return await signOut(auth);
  }
}

export default new AuthApi();
