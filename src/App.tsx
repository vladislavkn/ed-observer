import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import Navigation from "./components/Navigation";
import LoginPage from "./pages/LoginPage";
import WeekdaysPage from "./pages/WeekdaysPage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navigation />

        <Switch>
          <Route path="/login" component={LoginPage} />
          <Route path="/edit">
            <Redirect to="/login" />
          </Route>
          <Route path="/" component={WeekdaysPage} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
