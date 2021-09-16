import { combineReducers } from "redux";
import editorReducer from "./editor";
import scheduleReducer from "./schedule";
import userReducer from "./user";

export default combineReducers({
  user: userReducer,
  schedule: scheduleReducer,
  editor: editorReducer,
});
