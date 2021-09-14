import { onAuthStateChanged } from "firebase/auth";
import React from "react";
import { useEffect } from "react";
import { Provider, useDispatch } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { removeUser, setUserFailture, setUserSuccess } from "./actions/user";
import Footer from "./components/Footer";
import Navigation from "./components/Navigation";
import { auth } from "./firebase";
import LoginPage from "./pages/LoginPage";
import WeekdaysPage from "./pages/WeekdaysPage";
import store from "./store";

const App: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(
      auth,
      (user) => {
        if (user) {
          toast.success(`Вы вошли в аккаунт как ${user.email}`);
          dispatch(setUserSuccess(user));
        } else {
          toast.success(`Вы успешно вышли из аккаунта`);
          dispatch(removeUser());
        }
      },
      (error: Error) => {
        toast.error(`Ошибка: ${error.message}`);
        dispatch(setUserFailture(error));
      }
    );
  });

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Navigation />
        <Switch>
          <Route path="/login" component={LoginPage} />
          <Route path="/" component={WeekdaysPage} />
        </Switch>
        <Footer />
      </BrowserRouter>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={true}
        pauseOnHover
      />
    </Provider>
  );
};

export default App;
