import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Footer from "./components/Footer";
import Navigation from "./components/Navigation";
import { UserProvider } from "./context/userContext";
import LoginPage from "./pages/LoginPage";
import WeekdaysPage from "./pages/WeekdaysPage";

const App: React.FC = () => {
  return (
    <UserProvider>
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
    </UserProvider>
  );
};

export default App;
