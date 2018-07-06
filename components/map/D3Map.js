import { h } from "hyperapp";
import Table from "./Table";

const D3Map = (state, actions) => () => (
  <div class="map">
    <div class="map__wrapper">
      <section class="map__upper">
        <div
          style={styles}
          oncreate={e => actions.initializeMap(e)}
          id="d3Map"
        />
      </section>
      <section class="map__lower">
        <div class="container">
          <Table snaps={state.snaps} />
        </div>
      </section>
    </div>
  </div>
);

const styles = {
  textAlign: "center",
  width: "100%"
};

export default D3Map;
