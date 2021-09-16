import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { setUserSuccess, removeUser, setUserFailture } from "../actions/user";
import { auth } from "../firebase";

const AppAuthController: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(
      auth,
      (user) => {
        if (user) {
          dispatch(setUserSuccess(user));
        } else {
          dispatch(removeUser());
        }
      },
      (error: Error) => {
        toast.error(`Ошибка: ${error.message}`);
        dispatch(setUserFailture(error));
      }
    );
  });

  return null;
};

export default AppAuthController;
