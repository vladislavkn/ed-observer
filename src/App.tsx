import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import AppAuthController from "./components/AppAuthController";
import Footer from "./components/Footer";
import Navigation from "./components/Navigation";
import LoginPage from "./pages/LoginPage";
import WeekdaysPage from "./pages/WeekdaysPage";
import store from "./store";

const App: React.FC = () => {
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
      <AppAuthController />
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
