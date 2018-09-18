import client from "../service/nes";
import { location } from "@hyperapp/router";
import d3m from "../modules/d3-map";
import { Controller } from "../node_modules/giojs/build/gio.module.js";
//import { remove } from "immutable";
import { uniq } from "lodash";
//import honeypotData from "../assets/data/honeypot-locations.js";

export default {
  location: location.actions,
  subscribeToStream: gio => (state, actions) => {
    client.then(conn => {
      conn.subscribe("/", data => {
        let contains = state.pots.some(pot => {
          console.log(pot);
          return JSON.stringify(data.dst.ip) === JSON.stringify(pot.ip);
        });

        console.log(contains);
        const dst = Object.assign(
          { id: ++state.markerid, radius: 3, increase: contains },
          data.dst
        );
        actions.saveSnapshot(data);
        actions.saveHoneyPotlocations(dst);
        actions.plotMap(data);
        actions.plotGio();
      });
      return { connection: conn };
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
  initializeGio: el => (state, actions) => {
    const gio = new Controller(el);
    gio.init();
    actions.subscribeToStream();
    return { gio: gio };
  },
  saveHoneyPotlocations: dst => state => {
    let contains = state.pots.some(pot => {
      console.log(pot);
      return JSON.stringify(dst.ip) === JSON.stringify(pot.ip);
    });

    //console.log(contains);
    if (contains != true) {
      state.pots.push(dst);
    }

    return { hplocations: uniq(state.pots) };
  },
  plotMap: data => state => {
    d3m.d3PlotHoneyPotLocale(state.hplocations);
    //d3m.d3PlotTarget(data);
  },
  plotGio: data => state => {
    console.log(state.snaps);
    let d = state.snaps.map(el => {
      return {
        e: el.src.country_code2,
        i: el.dst.country_code2,
        v: 1000000
      };
    });
    state.gio.addData(d);
  }
};
