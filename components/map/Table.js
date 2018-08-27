import { h } from "hyperapp";
import { take } from "lodash";

const Table = ({ snaps }) => {
  //console.log(snaps);
  return (
    <table class="table ">
      <thead>
        <tr>
          <th>Time Stamp</th>
          <th>Attacker IP</th>
          <th>Attacker Name</th>
          <th>Attacker Origin</th>
          <th>Attacker Target</th>
          <th>Port</th>
        </tr>
      </thead>
      <tbody id="d3TableBody">
        {take(
          snaps.map(snap => (
            <tr>
              <td>{snap.timestamp}</td>
              <td>{snap.src.ip}</td>
              <td>{snap.src.asn.asn}</td>
              <td>{`${snap.src.city_name + "," || ""} ${snap.src.country_name}`}</td>
              <td>{`${snap.dst.city_name + "," || ""} ${snap.dst.country_name}`}</td>
              <td>{snap.src.port}</td>
            </tr>
          )),
          5
        )}
      </tbody>
    </table>
  );
};

export default Table;
