import { h } from "hyperapp";

const Filter = (state, actions) => () => (
  <div class="filter">
    <div class="container">
      <h2 class="heading">Select to filter</h2>
      <div class="row">
      <section title="Service" class="column">
        <ul>
          <li><div class="switch"> <input type="checkbox" value="" name="" id="service-filter-1" checked /> <label for="service-filter-1"></label> </div></li>
          <li><div class="switch"> <input type="checkbox" value="" name="" id="service-filter-2" checked />  <label for="service-filter-2"></label></div></li>
          <li><div class="switch"> <input type="checkbox" value="" name="" id="service-filter-3" checked />  <label for="service-filter-3"></label></div></li>
        </ul>
      </section>
      </div>
    </div>
  </div>
);

export default Filter;
