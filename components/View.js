import { h } from "hyperapp";
import { Link, Route, Switch } from "@hyperapp/router";
import D3Map from "./map/D3Map";
import GioMap from "./map/GioMap";

const View = (state, actions) => (
  <Switch>
    <Route path="/" render={D3Map(state, actions)} />
    <Route path="/globe" render={GioMap(state, actions)} />
  </Switch>
);

export default View;
