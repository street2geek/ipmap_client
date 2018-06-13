import { h } from "hyperapp";

const Info = ({ timestamp, src }) => {
  return (
    <tr>
      <td>{timestamp}</td>
      <td>{src.ip}</td>
      <td>{src.asn.asn}</td>
      <td>{`${src.city_name || ""}, ${src.country_name}`}</td>
      <td>{src.port}</td>
    </tr>
  );
};

export default Info;
