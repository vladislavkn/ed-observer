import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { auth } from "../firebase";
import { setUser } from "../store/auth";

const AppAuthController: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(
      auth,
      (user) => dispatch(setUser(user)),
      (error: Error) => {
        toast.error(`Ошибка: ${error.message}`);
        dispatch(setUser(null));
      }
    );
  });

  return null;
};

export default AppAuthController;
