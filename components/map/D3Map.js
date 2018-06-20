import { h } from "hyperapp";
import Table from "./Table";

const D3Map = (state, actions) => () => (
  <div>
    <section class="upper">
      <div
        style={styles}
        oncreate={e => actions.initializeMap(e)}
        id="d3Map"
      />
    </section>
    <section class="lower">
      <div class="container">
       <Table snaps={state.snaps} />
      </div>
    </section>
  </div>
);

const styles = {
  textAlign: "center",
  width: "100%"
};

export default D3Map;
