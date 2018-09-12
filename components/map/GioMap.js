import { h } from "hyperapp";

const GioMap = (state, actions) => () => (
  <div class="gio__area" oncreate={e => actions.initializeGio(e)} />
);

export default GioMap;
