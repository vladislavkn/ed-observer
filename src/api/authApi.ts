import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../firebase";
import { UserSignInData } from "../types";

class AuthApi {
  async login(paylaod: UserSignInData) {
    return signInWithEmailAndPassword(auth, paylaod.email, paylaod.password);
  }

  async logout() {
    return await signOut(auth);
  }
}

export default new AuthApi();
