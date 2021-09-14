import { combineReducers } from "redux";
import scheduleReducer from "./schedule";
import userReducer from "./user";

export default combineReducers({
  user: userReducer,
  schedule: scheduleReducer,
});
