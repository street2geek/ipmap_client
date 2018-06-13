import client from "../service/nes";
import { location } from "@hyperapp/router";
import d3m from "../modules/d3-map";
//import { remove } from "immutable";

export default {
  location: location.actions,
  subscribeToStream: () => (state, actions) => {
    let i = 0;
    client.then(conn => {
      conn.subscribe("/", data => {
        actions.saveSnapshot(Object.assign({ id: ++i }, data));
        actions.plotMap();
      });
    });
  },
  saveSnapshot: d => state => {
    return { snaps: [d, ...state.snaps] };
  },
  resetSnapShot: () => {
    return { snaps: [] };
  },
  initializeD3Map: el => (state, actions) => {
    d3m.d3DrawMap(el);
    actions.subscribeToStream();
    setInterval(actions.resetSnapShot, 50000);
  },
  plotMap: d => (state, actions) => {
    console.log(state.snaps);
    d3m.d3PlotMap(state.snaps);
  }
};
