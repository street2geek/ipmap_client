import { h } from "hyperapp";
import { take } from "lodash";
import { TableData } from "./TableData";

const Table = ({ snaps }) => {
  console.log(snaps);
  return (
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
          snaps.map((snap) => (
            <TableData timestamp={snap.timestamp} src={snap.src} />
          )),
          5
        )}
      </tbody>
    </table>
  );
};

export default Table;
