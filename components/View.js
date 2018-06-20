import { h } from "hyperapp";
import { Link, Route, Switch } from "@hyperapp/router";
import D3Map from "./map/D3Map";

const View = (state, actions) => (
  <div>
    <Switch>
      <Route path="/" render={D3Map(state, actions)} />
    </Switch>
  </div>
);

export default View;
