import "babel-polyfill";
import { app } from "hyperapp";
import actions from "./actions";
import view from "./components/View";
import { location } from "@hyperapp/router";

import "milligram/dist/milligram.css";
import "./index.css";

const state = {
  location: location.state,
  snaps: []
};

const main = app(state, actions, view, document.body);

const unsubscribe = location.subscribe(main.location);
