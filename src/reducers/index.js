import { combineReducers } from "redux";
import config from "./config";
import leftSidebar from "./left-sidebar";
import palettes from "./palettes";
import navigation from "./navigation";
import firebase from "./firebase";
const rootReducer = combineReducers({
  navigation,
  config,
  leftSidebar,
  palettes,
  firebase,
});

export default rootReducer;
