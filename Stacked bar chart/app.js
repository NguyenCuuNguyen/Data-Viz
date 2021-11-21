/*
Iterate through 3 fruit name for each fruit name, iterate through 4 seasons => 12 iterations. In the inner loop, a new JS object literal, with fruitname given from the outer loop, y=count, key of x has season name scaled through x ordinal scale to get number on number line.
  /*D3 is all about binding data to elements and rendering these elements as required*/
//Convert informative keys into values. By creating fruisConsumed array with 3 literal object {fruitname, consumedCount}, add it to each data point in DUMMY_DATA and adding totalFruit count variable
let DUMMY_DATA = [ //4 JS literal objects in an array
  {"season":"spring", "apple":1, "kiwi":4, "grape":1},
  {"season":"summer", "apple":2, "kiwi":1, "grape":2},
  {"season":"fall", "apple":3, "kiwi":3, "grape":1},
  {"season":"winter", "apple":2, "kiwi":2, "grape":2}];

var seasonNames = DUMMY_DATA.map(function(d) {return d.season;});
var fruitNames = d3.keys(DUMMY_DATA[0]).filter(function(key) {return key !== "season";});

DUMMY_DATA.forEach(function(d) {
  d.fruitsConsumed = fruitNames.map(function(name) {
    return {"fruitName": name,
            "consumedCount": d[name] };
  });
  d.totalFruit = d3.sum(d.fruitsConsumed, function(d){return d.consumedCount;});
});

//Define chart variable:
var margin = {top: 80, right: 30, bottom:30, left:30},
    width = 300 - margin.left - margin.right,
    height = 300 - margin.top - margin.bottom;

//define x coordinate:
var x = d3.scale.ordinal()
          .domain(seasonNames)
          .rangeRoundBands([0, width], 0.1)

var y = d3.scale.linear()
          .domain([0, d3.max(DUMMY_DATA, function(d) { //y.domain() = [0, 7]
            return d.totalFruit;})])
          .range([height, 0]); //y.range() = [190, 0] (190 bc y axis is inverted)

var color = d3.scale.ordinal()
              .domain(fruitNames) //color.domain() ['apple', 'kiwi', 'grape']
              .range(["#05386B", "#5CDB95", "#EDF5E1"]); //color.range() ['#05386B', '#5CDB95', '#EDF5E1'

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")

var svgViewport = d3.select("#visualization").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + ", " + margin.top + ")");

svgViewport.append("g")
  .attr("class", "x axis")
  .attr("transform", "translate(0," + height + ")")
  .call(xAxis);

svgViewport.append("g")
  .attr("class", "y axis")
  .call(yAxis)


var layers = fruitNames.map(function(fruitName) {
  return DUMMY_DATA.map(function(d){
    return {"x": x(d.season), "y": d[fruitName], "fruitName": fruitName};
  });
})

var stack = d3.layout.stack();

stack(layers);

var svgLayer = svgViewport.selectAll(".layer")
  .data(layers)
  .enter()
  .append("g")
    .attr("class", "layer");

var rect = svgLayer.selectAll("rect")
  .data(function(d) {return d;})
  .enter()
  .append("rect")
    .attr("x", function(d) {return d.x;})
    .attr("y", function(d) {return y(d.y + d.y0); })
    .attr("width", x.rangeBand())
    .attr("height", function(d, i) {return height - y(d.y); })
    .style("fill", function(d, i) {return color(d.fruitName);});

var legend = d3.select("svg").selectAll(".legend")
  .data(color.domain().slice().reverse())
  .enter()
  .append("g")
  .attr("class", "legend")
  .attr("transform", function(d, i) {return "translate(0," + i*20 + ")";});

legend.append("rect")
  .attr("x", width + margin.left - 18)
  .attr("width", 18)
  .attr("height", 18)
  .style("fill", color);

legend.append("text")
  .attr("x", width + margin.left - 24)
  .attr("y", 9)
  .attr("dy", ".35em")
  .style("text-anchor", "end")
  .text(function(d) {return d;});
