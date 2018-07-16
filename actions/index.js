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
        const d = Object.assign({ id: ++i }, data);
        actions.saveSnapshot(d);
        actions.plotMap(d);
      });
    });
  },
  saveSnapshot: data => state => {
    return { snaps: [data, ...state.snaps] };
  },
  resetSnapShot: () => {
    return { snaps: [] };
  },
  initializeMap: el => (state, actions) => {
    d3m.d3DrawMap(el);
    d3m.d3PlotHoneyPotLocale();
    actions.subscribeToStream();
    setInterval(actions.resetSnapShot, 60000);
  },
  plotMap: data => state => {
    console.log(data);
    //let d = data.filter(item => item.dst.location);
    d3m.d3PlotIpLocale(data);
  },
  filter: (key, value) => state => {
    return {
      filter: Object.assign(
        {
          key: value
        },
        state.filter
      )
    };
  }
};
