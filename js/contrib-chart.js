// "stacking" data for stacked bar chart
const stackGoals = d3.stack().keys(["no", "small", "mod", "sig"])
const stackGoalsAm = d3.stack().keys(["am.no", "am.sm", "am.mod", "am.sig"])
const stackGoalsEU = d3.stack().keys(["eu.no", "eu.sm", "eu.mod", "eu.sig"])

const stacked_goals = stackGoals(goals_data)
const stacked_goals_am = stackGoalsAm(goals_data)
const stacked_goals_eu = stackGoalsEU(goals_data)

// set some attributes of svg
d3.select("#contrib_chart")
  .attr("height", "500px")
  .attr("width", "100%")

const update_contrib = function(data) {

  d3.select("#contrib_chart").selectAll("g").remove()

  // set the dimensions and margins of the graph
  var margin = {top: 5, right: 50, bottom: 30, left: 370},
    width = d3.select("#contrib_chart").node().getBoundingClientRect().width - margin.left - margin.right,
    height = d3.select("#contrib_chart").node().getBoundingClientRect().height - margin.top - margin.bottom;

  // make new x scale, so it can have different domain
  var contrib_x = d3.scaleLinear()
                  .range([0, width]);

  var contrib_y = d3.scaleBand()
                  .range([height, 0])
                  .padding(0.1);

  // append the svg object to the body of the page
  // append a 'group' element to 'svg'
  // moves the 'group' element to the top left margin
  var contrib_svg = d3.select("#contrib_chart")
              .attr("width", width + margin.left + margin.right)
              .attr("height", height + margin.top + margin.bottom)
              .append("g")
              .attr("transform",
                "translate(" + margin.left + "," + margin.top + ")");

  // Scale the range of the data in the domains
  contrib_x.domain([0, 100])
  contrib_y.domain(goals_data.map(function(d) { return d.goal; }));

  // bar and text groups
  var bars = contrib_svg.append("g").attr("class", "contrib_desc")
     .selectAll("g")
     // Enter in the stack data = loop key per key = group per group
     .data(data)
     .enter().append("g")

  // append the rectangles for the bar chart
  bars
     .attr("fill", (d, i) => contrib_color(d.key))
     .attr("opacity", (d, i) => [1, 0.7, 0.7, 1][i])
     .selectAll("rect")
     .data(d => d)
     .enter().append("rect")
     .attr("y", d => { return contrib_y(d.data.goal); })
     .attr("x", d => contrib_x(d[0]))
     .attr("stroke", "white")
     .attr("stroke-width", 2)
     .attr("height", contrib_y.bandwidth())
     .attr("width", d => {
       // hard-coding 'solution' to rounding problem
       if (d[1] < 97) {
         return(contrib_x(d[1]) - contrib_x(d[0]))
       } else {
         return(contrib_x(100) - contrib_x(d[0]))
       }
     })
     .on("mouseover", function(d, i) {

       // highlight current bar and text
       var barUnderMouse = this;
       d3.select("#contrib_chart").selectAll('rect').transition("opacity")
         .style('opacity', function() {
         return (this === barUnderMouse) ? 1.0 : 0.5;
         })
         // .attr("fill", function() {
         // return (this === barUnderMouse) ? {} : "grey";
         // })

       d3.select("#contrib_chart").selectAll('rect').transition("opacity").style('opacity', function() {
         return (this === barUnderMouse) ? 1.0 : 0.2;
       })

       bars.append("text")
           .data(i)
           .text(i[1] - i[0] + "%")
           .attr("fill", "black")
           .attr("x", contrib_x(100) + 2)
           .attr("y", contrib_y(i.data.goal) + contrib_y.bandwidth() - 3)

       d3.select("#contrib_chart").selectAll(".yAxis text").transition("opacity").attr("font-weight", d => {
         return (d === i.data.goal) ? "bold" : "normal"
       })

     })
     .on("mouseout", (d, i) => {
       d3.select("#contrib_chart").selectAll('rect').transition("opacity").style('opacity', 1);
       d3.select("#contrib_chart").select(".contrib_desc").selectAll('text').transition("opacity").style('opacity', 0)
       d3.select("#contrib_chart").selectAll(".yAxis text").transition("opacity").attr("font-weight", "normal");
       bars.selectAll('text').remove()
     })

  // add the x Axis
  contrib_svg.append("g")
     .attr("class", "xAxis")
     .attr("transform", "translate(0," + height + ")")
     .call(
       d3.axisBottom(contrib_x)
          .tickFormat((d) => { return d + "%" })
          .tickSize(-height)
      )

  d3.selectAll(".domain")
    .attr("opacity", 0)

  d3.selectAll(".tick line")
    .attr("opacity", 0.6)
    .style("")

  // add the y Axis
  contrib_svg.append("g")
     .attr("class", "yAxis")
     .call(d3.axisLeft(contrib_y));

  d3.selectAll(".tick text")
   .attr("font-size","1.5em")
   .attr("font-family", "sans-serif")
}

update_contrib(stacked_goals)

// legend
legend_svg = d3.select("#contrib_legend")
  .attr("width", "100%")
  .attr("height", "50px")
  .selectAll("g")
  .data([0,1,2,3])
  .enter()

var width = d3.select("#contrib_legend").node().getBoundingClientRect().width,
  height = d3.select("#contrib_legend").node().getBoundingClientRect().height;

var legend_locs = [0.9*width/7, 3*width/7, 4*width/7, 5*width/7, 6*width/7]
// rectangles
legend_svg
  .append("rect")
  .attr("y", 20)
  .attr("x", d => legend_locs[d+1])
  .attr("width", 20)
  .attr("height", 20)
  .attr("fill", d => contrib_color((contrib_color.domain()[d])))
  .attr("opacity", d => [1, 0.7, 0.7, 1][d])

// text
legend_svg
  .append("text")
  .text(d => ["none", "small", "moderate", "significant"][d])
  .attr("text-anchor", "end")
  .attr("y", 35)
  .attr("x", d => legend_locs[d+1] - 2)

// legend title
d3.select("#contrib_legend")
  //.append("p")
  .append("text")
  .text("Perceived contribution:")
  .attr("y", 35)
  .attr("x", legend_locs[0])
  .attr("font-weight", "bold")
