import client from "../service/nes";
import { location } from "@hyperapp/router";
import d3m from "../modules/d3-map";
//import { remove } from "immutable";

export default {
  location: location.actions,
  subscribeToStream: () => (state, actions) => {
    let i = 0;

    let collection = []; // or use state snaps object instead.

    client.then(conn => {
      conn.subscribe("/", data => {
        const d = Object.assign({ id: ++i }, data);

        collection.push(d);

        actions.saveSnapshot(d);
        actions.plotMap(collection);
      });
    });

    setInterval(() => {
      collection = [];
    }, 30000);
  },
  saveSnapshot: data => state => {
    return { snaps: [data, ...state.snaps] };
  },
  resetSnapShot: () => {
    return { snaps: [] };
  },
  initializeMap: el => (state, actions) => {
    d3m.d3DrawMap(el);
    actions.subscribeToStream();
    setInterval(actions.resetSnapShot, 30000);
  },
  plotMap: data => state => {
    //console.log(data);
    let d = data.filter(item => item.dst.location);
    //let d = state.snaps.filter(item => item.dst.location);
    d3m.d3PlotMap(d);
  }
};
