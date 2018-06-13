import { h } from "hyperapp";
import Info from "./Info";
import { take } from "lodash";

const D3Map = (state, actions) => () => (
  <div>
    <section class="upper">
      <div
        style={styles}
        oncreate={e => actions.initializeD3Map(e)}
        id="d3Map"
      />
    </section>
    <section class="lower">
      <div class="container">
        <table class="table ">
          <thead>
            <tr>
              <th>Time Stamp</th>
              <th>Attacker IP</th>
              <th>Attacker Name</th>
              <th>Attacker Origin</th>
              <th>Port</th>
            </tr>
          </thead>
          <tbody id="d3TableBody">
            {take(
              state.snaps.map(({ timestamp, src }) => (
                <Info timestamp={timestamp} src={src} />
              )),
              5
            )}
          </tbody>
        </table>
      </div>
    </section>
  </div>
);

const styles = {
  textAlign: "center",
  width: "100%"
};

export default D3Map;
