import "babel-polyfill";
import { app, h } from "hyperapp";
import actions from "./actions";
import view from "./components/View";
import { location } from "@hyperapp/router";

import "milligram/dist/milligram.css";
import "./index.scss";

const state = {
  location: location.state,
  snaps: [],
  filteredSnaps: [],
  services: []
};

const main = app(state, actions, view, document.body);

const unsubscribe = location.subscribe(main.location);
