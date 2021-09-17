import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import AppAuthController from "./components/AppAuthController";
import Footer from "./components/Footer";
import Navigation from "./components/Navigation";
import LoginPage from "./pages/LoginPage";
import NotFound from "./pages/NotFound";
import SchedulePage from "./pages/SchedulePage";
import store from "./store";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Navigation />
        <div
          className="shadow-sm position-relative border-b"
          style={{ zIndex: 1 }}
        >
          <div className="container pt-4">
            <Switch>
              <Route path="/login" component={LoginPage} exact />
              <Route path="/" component={SchedulePage} exact />
              <Route component={NotFound} />
            </Switch>
          </div>
        </div>
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
