import { feature, mesh } from "topojson";
import d3 from "./d3-importer";
import * as world from "../node_modules/world-atlas/world/110m.json";

export default (function() {
  const width = 1366;
  const height = 768;
  const getProjection = () => d3.geoEquirectangular();

  function d3DrawMap(el) {
    let projection = getProjection();
    projection
      .center([5, 15])
      .scale([width / (1.9 * Math.PI)])
      .translate([width / 2, height / 2]);

    let path = d3.geoPath().projection(projection);

    let svg = d3
      .select(el)
      .append("svg")
      .attr("class", "svg-map")
      .attr("viewBox", `0 0 ${width} ${height}`);

    let countries = feature(world, world.objects.countries).features;

    svg
      .selectAll(".country")
      .data(countries)
      .enter()
      .insert("path", ".graticule")
      .attr("class", "land-boundary")
      .attr("d", path)
      .on("mouseover", function() {
        d3.select(this).attr("class", "focus-boundary");
      })
      .on("mouseout", function() {
        d3.select(this).attr("class", "land-boundary");
      });

    svg
      .datum(mesh(world, world.objects.countries, (a, b) => a !== b))
      .append("path")
      .attr("d", path)
      .attr("class", "country-boundary");
  }

  function d3PlotMap(data) {
    let projection = getProjection()
      .center([5, 15])
      .scale([width / (1.9 * Math.PI)])
      .translate([width / 2, height / 2]);

    let circle = d3
      .select("svg")
      .selectAll("circle")
      .data(data);

    //circle.exit().remove();

    circle
      .enter()
      .append("circle")
      .merge(circle)
      .attr("cx", d => {
        console.log(d);
        return projection([d.dst.location.lon, d.dst.location.lat])[0];
      })
      .attr("cy", d => projection([d.dst.location.lon, d.dst.location.lat])[1]);

    circle
      .attr("r", 4)
      .attr("fill", "#c4e3f3")
      .attr("fill-opacity", 0.8)
      .attr("stroke", "#361")
      .attr("stroke-width", "1px")
      .attr("stroke-opacity", 0.4);

    circleTransition(circle);
  }

  function circleTransition(circle) {
    circle
      .transition()
      .delay(d => Math.floor(Math.random() * 100 + 0))
      .duration(150)
      .ease(d3.easeCubicInOut)
      .attr("r", 40)
      .attr("fill", "#EF4836")
      .attr("fill-opacity", 0.7)
      .on("end", function() {
        let dot = d3.select(this);

        dot
          .transition()
          .duration(100)
          .attr("r", 2.2)
          .attr("fill", "#EF4836")
          .attr("stroke", "#361")
          .attr("stroke-width", "1px")
          .on("end", function() {
            let point = d3.select(this);

            point
              .transition()
              .duration(100)
              .attr("fill", "#fff");
          });
      });
  }

  return {
    d3DrawMap,
    d3PlotMap
  };
})();
