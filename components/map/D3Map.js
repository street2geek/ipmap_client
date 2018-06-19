import { h } from "hyperapp";
import Table from "./Table";

const D3Map = ({snaps, init}) => (
  <div>
    <section class="upper">
      <div
        style={styles}
        oncreate={e => init(e)}
        id="d3Map"
      />
    </section>
    <section class="lower">
      <div class="container">
       <Table items={snaps} />
      </div>
    </section>
  </div>
);

const styles = {
  textAlign: "center",
  width: "100%"
};

export default D3Map;
