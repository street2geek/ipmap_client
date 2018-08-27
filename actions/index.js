import client from "../service/nes";
import { location } from "@hyperapp/router";
import d3m from "../modules/d3-map";
//import { remove } from "immutable";
import { uniq } from "lodash";
import honeypotData from "../assets/data/honeypot-locations.js";

export default {
  location: location.actions,
  subscribeToStream: () => (state, actions) => {
    let i = 0;

    client.then(conn => {
      conn.subscribe("/", data => {
        const d = Object.assign({ id: ++i }, data);
        actions.saveSnapshot(d);
        actions.saveHoneyPotlocations(d);
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
    actions.subscribeToStream();
    setInterval(actions.resetSnapShot, 60000);
  },
  saveHoneyPotlocations: data => state => {
    //console.log(data.dst.location);
    let contains = state.pots.some(elem => {
      return JSON.stringify(data.dst) === JSON.stringify(elem);
    });
    //console.log(contains);
    if (!contains) {
      state.pots.push(data.dst);
    }

    return { hplocations: uniq(state.pots) };
  },
  plotMap: data => state => {
    d3m.d3PlotHoneyPotLocale(state.hplocations);
    //d3m.d3PlotIpLocale(data);
  }
};
