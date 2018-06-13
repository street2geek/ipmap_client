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
  saveSnapshot: data => state => {
    return { snaps: [data, ...state.snaps] };
  },
  resetSnapShot: () => {
    return { snaps: [] };
  },
  initializeD3Map: el => (state, actions) => {
    d3m.d3DrawMap(el);
    actions.subscribeToStream();
    setInterval(actions.resetSnapShot, 50000);
  },
  plotMap: () => (state, actions) => {
    console.log(state.snaps);
    let d = state.snaps.filter(snap => snap.dst.location);
    d3m.d3PlotMap(d);
  }
};
