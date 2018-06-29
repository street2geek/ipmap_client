import { h } from "hyperapp";
import Table from "./Table";
import Filter from "./FilterMenu";

const D3Map = (state, actions) => () => (
  <div class={`map ${state.filterMenu}`}>
    <Filter />
    <div class="map__wrapper">
      <section class="map__upper">
        <button class="map__toggle" onclick={() => actions.toggleFilter()} />
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
