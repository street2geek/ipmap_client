import { h } from "hyperapp";
import { Link, Route, Switch } from "@hyperapp/router";
import D3Map from "./map/D3Map";
import Filter from "./filter/Filter";

const View = (state, actions) => (
  <div>
    <Switch>
      <Route path="/" render={D3Map(state, actions)} />
      <Route path="/filter" render={Filter(state, actions)} />
    </Switch>
  </div>
);

export default View;
