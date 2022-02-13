// set some attributes of svg
d3.select("#goal_chart")
  .attr("height", "500px")
  .attr("width", "100%")

// set the dimensions and margins of the graph
var margin = {top: 20, right: 50, bottom: 30, left: 370},
  width = d3.select("#goal_chart").node().getBoundingClientRect().width - margin.left - margin.right,
  height = d3.select("#goal_chart").node().getBoundingClientRect().height - margin.top - margin.bottom;

// set the ranges
var goals_y = d3.scaleBand()
                .range([height, 0])
                .padding(0.1);

var goals_x = d3.scaleLinear()
                .range([0, width]);

// append the svg object to the body of the page
// append a 'group' element to 'svg'
// moves the 'group' element to the top left margin
var goals_svg = d3.select("#goal_chart")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform",
              "translate(" + margin.left + "," + margin.top + ")");

// Scale the range of the data in the domains
goals_x.domain([0, 80])
goals_y.domain(goals_data.map(function(d) { return d.goal; }));

// append the rectangles for the bar chart
goals_svg.selectAll("rect")
   .data(goals_data)
   .enter()
   .append("rect")
   .attr("fill", "#31ab91")
   .attr("y", function(d) { return goals_y(d.goal); })
   .attr("height", goals_y.bandwidth())
   .attr("width", 0)
   .on("mouseover", function(d, i) {

     // highlight current bar and text
     var barUnderMouse = this;
     d3.select("#goal_chart").selectAll('rect').transition("opacity").style('opacity', function() {
       return (this === barUnderMouse) ? 1.0 : 0.5;
     });

     d3.select("#goal_chart").select(".goals_desc").selectAll('text').transition("opacity").style('opacity', function(d) {
       return (d.goal === i.goal) ? 1.0 : 0;
     })

     d3.select("#goal_chart").selectAll(".yAxis text").transition("opacity").attr("font-weight", d => {
       return (d === i.goal) ? "bold" : "normal"
     })
   })

   .on("mouseout", ()=> {
     d3.select("#goal_chart").selectAll('rect').transition("opacity").style('opacity', 1);
     d3.select("#goal_chart").select(".goals_desc").selectAll('text').transition("opacity").style('opacity', 0);
     d3.select("#goal_chart").selectAll(".yAxis text").transition("opacity").attr("font-weight", "normal");
   })

// add the x Axis
goals_svg.append("g")
   .attr("class", "xAxis")
   .attr("transform", "translate(0," + height + ")")
   .call(
     d3.axisBottom(goals_x)
        .tickFormat((d) => { return d + "%" })
        .tickSize(-height)
    )

d3.selectAll(".domain")
  .attr("opacity", 0)

d3.selectAll(".tick line")
  .attr("opacity", 0.6)
  .style("")

// add the y Axis
goals_svg.append("g")
   .attr("class", "yAxis")
   .call(d3.axisLeft(goals_y));

d3.selectAll(".tick text")
 .attr("font-size","1.5em")
 .attr("font-family", "sans-serif")

 // percentage labels
 var goals_desc = d3.select("#goal_chart")
                    .select("g")
                    .append("g")
                    .attr("class", "goals_desc")
                    .selectAll("p")
                    .data(goals_data)
                    .enter()
                    .append("text")
                    .attr("opacity", 0)
                    .attr("x", 0)
                    .attr("y", d => {return goals_y(d.goal) + goals_y.bandwidth() - 3})

// animate bars from 0 to data value
const update_goal_chart = function(user_select) {

  goals_svg.selectAll("rect")
     //.attr("width", 0)
     .transition("grow")
     .duration(800)
     // /.attr("width", function(d) {return 0;})
     .attr("width", function(d) {
       if (user_select == 5) {
         return goals_x(d.top_5);
       } else {
         return goals_x(d.top_1);
       }
     })
     .delay(function(d,i){return(i*50)})

  if (user_select == 5) {
    goals_desc.text((d) => d.top_5 + "%")
              .transition("label-move")
              .duration(800)
              .attr("x", d => {return goals_x(d.top_5) + 6})
              .delay(function(d,i){return(i*50)})
  } else {
    goals_desc.text((d) => d.top_1 + "%")
              .transition("label-move")
              .duration(800)
              .attr("x", d => {return goals_x(d.top_1) + 6})
              .delay(function(d,i){return(i*50)})
  }
}

// initialise as showing top five percentages
update_goal_chart(5)
