import client from "../service/nes";
import { location } from "@hyperapp/router";
import d3m from "../modules/d3-map";
import d3 from "../modules/d3-importer";
import { remove } from "immutable";

export default {
  location: location.actions,
  subscribeToStream: () => (state, actions) => {
    client.then(conn => {
      conn.subscribe("/", update => {
        actions.saveSnapshot(update);
        actions.plotMap(update);
      });
    });
  },
  saveSnapshot: d => state => {
    if (state.snaps.length < 6) {
      return { snaps: [...state.snaps, d] };
    } else {
      let shiftSnap = remove(state.snaps, 0);
      return { snaps: [...shiftSnap, d] };
    }
  },
  initializeD3Map: el => (state, actions) => {
    d3m.d3DrawMap(el);
    actions.subscribeToStream();
  },
  plotMap: d => (state, actions) => {
    if (d.dst.location) d3m.d3PlotMap(d);
  }
};
