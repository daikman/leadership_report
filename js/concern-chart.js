// "stacking" data for stacked bar chart
const stackConcern = d3.stack().keys(["extreme", "some", "none"])
const stackConcernAm = d3.stack().keys(["e.am", "s.am", "n.am"])
const stackConcernEU = d3.stack().keys(["e.eu", "s.eu", "n.eu"])

const stacked_concern = stackConcern(concern_data)
const stacked_concern_am = stackConcernAm(concern_data)
const stacked_concern_eu = stackConcernEU(concern_data)

// set some attributes of svg
d3.select("#concern_chart")
  .attr("height", "300px")
  .attr("width", "100%")

const update_concern = function(data) {

  d3.select("#concern_chart").selectAll("g").remove()

  // set the dimensions and margins of the graph
  var margin = {top: 5, right: 50, bottom: 30, left: 370},
    width = d3.select("#concern_chart").node().getBoundingClientRect().width - margin.left - margin.right,
    height = d3.select("#concern_chart").node().getBoundingClientRect().height - margin.top - margin.bottom;

  // make new x scale, so it can have different domain
  // var contrib_x = d3.scaleLinear()
  //                 .range([0, width]);
  //
  var concern_y = d3.scaleBand()
                    .range([height, 0])
                    .padding(0.1);

  var concern_x = d3.scaleLinear()
                  .range([0, width]);

  // append the svg object to the body of the page
  // append a 'group' element to 'svg'
  // moves the 'group' element to the top left margin
  var concern_svg = d3.select("#concern_chart")
              .attr("width", width + margin.left + margin.right)
              .attr("height", height + margin.top + margin.bottom)
              .append("g")
              .attr("transform",
                "translate(" + margin.left + "," + margin.top + ")");

  // Scale the range of the data in the domains
  //contrib_x.domain([0, 100])
  concern_y.domain(concern_data.map(function(d) { return d.barrier; }));
  concern_x.domain([0, 100])

  // bar and text groups
  var concern_bars = concern_svg.append("g").attr("class", "contrib_desc")
     .selectAll("g")
     // Enter in the stack data = loop key per key = group per group
     .data(data)
     .enter().append("g")

  // append the rectangles for the bar chart
  concern_bars
     .attr("fill", (d, i) => ["#fe3298", "#fe3298", "#329799"][i])
     .attr("opacity", (d, i) => [1, 0.7, 0.7, 1][i])
     .selectAll("rect")
     .data(d => d)
     .enter().append("rect")
     .attr("y", d => { return concern_y(d.data.barrier); })
     .attr("stroke", "white")
     .attr("stroke-width", 2)
     .on("mouseover", function(d, i) {

       // highlight current bar and text
       var barUnderMouse = this;
       d3.select("#concern_chart").selectAll('rect').transition("opacity")
         .style('opacity', function() {
         return (this === barUnderMouse) ? 1.0 : 0.5;
         })
         // .attr("fill", function() {
         // return (this === barUnderMouse) ? {} : "grey";
         // })

       d3.select("#concern_chart").selectAll('rect').transition("opacity").style('opacity', function() {
         return (this === barUnderMouse) ? 1.0 : 0.2;
       })

       concern_bars.append("text")
           .data(i)
           .text(i[1] - i[0] + "%")
           .attr("fill", "black")
           .attr("x", concern_x(100) + 2)
           .attr("y", concern_y(i.data.barrier) + concern_y.bandwidth()/2 + 5)

       d3.select("#concern_chart").selectAll(".yAxis text").transition("opacity").attr("font-weight", d => {
         return (d === i.data.barrier) ? "bold" : "normal"
       })

     })
     .on("mouseout", (d, i) => {
       d3.select("#concern_chart").selectAll('rect').transition("opacity").style('opacity', 1);
       d3.select("#concern_chart").select(".contrib_desc").selectAll('text').transition("opacity").style('opacity', 0)
       d3.select("#concern_chart").selectAll(".yAxis text").transition("opacity").attr("font-weight", "normal");
       concern_bars.selectAll('text').remove()
     })
     .attr("height", concern_y.bandwidth())
     // .transition("enter")
     // .duration(1000)
     .attr("x", d => concern_x(d[0]))
     .attr("width", d => {
       // hard-coding 'solution' to rounding problem
       if (d[1] < 97) {
         return(concern_x(d[1]) - concern_x(d[0]))
       } else {
         return(concern_x(100) - concern_x(d[0]))
       }

     })

     // add the x Axis
     concern_svg.append("g")
        .attr("class", "xAxis")
        .attr("transform", "translate(0," + height + ")")
        .call(
          d3.axisBottom(concern_x)
             .tickFormat((d) => { return d + "%" })
             .tickSize(-height)
         )

     d3.selectAll(".domain")
       .attr("opacity", 0)

     d3.selectAll(".tick line")
       .attr("opacity", 0.6)
       .style("")

     // add the y Axis
     concern_svg.append("g")
        .attr("class", "yAxis")
        .call(d3.axisLeft(concern_y));

     d3.selectAll(".tick text")
      .attr("font-size","1.5em")
      .attr("font-family", "sans-serif")

}

update_concern(stacked_concern)

// legend
concern_legend_svg = d3.select("#concern_legend")
  .attr("width", "100%")
  .attr("height", "50px")
  .selectAll("g")
  .data([0,1,2])
  .enter()

var width = d3.select("#concern_legend").node().getBoundingClientRect().width,
height = d3.select("#concern_legend").node().getBoundingClientRect().height;

var legend_locs = [2*width/7, 4*width/7, 5*width/7, 6*width/7]

// rectangles
concern_legend_svg
  .append("rect")
  .attr("y", 20)
  .attr("x", d => legend_locs[d+1])
  .attr("width", 20)
  .attr("height", 20)
  .attr("fill", d => contrib_color((contrib_color.domain()[d])))
  .attr("opacity", d => [1, 0.7, 1][d])

// text
concern_legend_svg
  .append("text")
  .text(d => ["extreme", "some", "none"][d])
  .attr("text-anchor", "end")
  .attr("y", 35)
  .attr("x", d => legend_locs[d+1] - 3)

// legend title
d3.select("#concern_legend")
  //.append("p")
  .append("text")
  .text("Level of concern:")
  .attr("y", 35)
  .attr("x", legend_locs[0])
  .attr("font-weight", "bold")
