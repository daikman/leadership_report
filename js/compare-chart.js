// set the dimensions and margins of the graph
const compare_svg =  d3.select("#compare_chart")
                       .attr("width", "100%")
                       .attr("height", 300)
                       .append("g")
                       .attr("transform", "translate(0,20)")

var margin = {top: 20, right: 50, bottom: 30, left: 100},
    width = d3.select("#compare_chart").node().getBoundingClientRect().width - margin.left - margin.right,
    height = d3.select("#compare_chart").node().getBoundingClientRect().height - margin.top - margin.bottom;

compare_svg.append("text")
           .attr("id", "selected_goal_compare_chart")
           .text("Innovation and business growth")
           .attr("x", width/2.4 + width*0.07)
           .attr("y", 3)
           .attr("font-size", 32)
           .attr("text-decoration", "underline")

// OPTIONS
const goal_options_svg = compare_svg.append("g")
                                    .attr("class", "goal_options")

// set default choice
var user_choice = compare_data[0];

// text
goal_options_svg.selectAll("text")
                .data(compare_data)
                .enter()
                .append("text")
                .attr("x", 5)
                .attr("y", (d, i) => margin.top + i*height/compare_data.length)
                .attr("font-weight", function(d, i) {
                  if (i == 0) {
                    return("bold")
                  } else {
                    return("normal")
                  }
                })
                .attr("font-size", function(d, i) {
                  if (i == 0) {
                    return("1.1em")
                  } else {
                    return("1em")
                  }
                })
                .html(d => "\u27A4 " + d.goal)
                .on("click", function(d, i) {
                  goal_options_svg.selectAll("text").attr("font-weight", "normal")
                  goal_options_svg.selectAll("text").attr("font-size", "1em")
                  d3.select(this).attr("font-weight", "bold")
                  d3.select(this).attr("font-size", "1.1em")
                  set_new_rank_data(i)
                })
                .style("cursor", "pointer");

// divided line
compare_svg.append("line")
           .attr("x1", width/2.4 + width*0.05)
           .attr("y1", 0)
           .attr("x2", width/2.4 + width*0.05)
           .attr("y1", height)
           .attr("stroke", "#31ab91")

// RANKS
const goal_ranks_svg = compare_svg.append("g")
                                  .attr("class", "goal_ranks")
                                  .attr("transform", "translate(" + width/2.4 + "," + margin.top + ")")

goal_ranks_svg.append("text")
              .attr("y", height/3)
              .attr("x", 0.07*width)
              .attr("font-weight", "bold")
              .attr("font-size", 24)
              .text("Leader priority rank*")
// ranks
goal_ranks_svg.append("text")
              .attr("id", "leader_rank_text")
              .attr("x", 0.12*width)
              .attr("y", margin.top + height/2)
              .attr("font-size", 54)
              .text(user_choice.leader)
              .attr("fill", "#31ab91")
// line surround
goal_ranks_svg.append("line")
               .attr("x1", 0.07*width)
               .attr("x2", 0.3*width)
               .attr("y1", margin.top + height/1.85)
               .attr("y2", margin.top + height/1.85)
               .attr("stroke","black")
goal_ranks_svg.append("line")
              .attr("x1", 0.07*width)
              .attr("x2", 0.3*width)
              .attr("y1", margin.top + height/3.2)
              .attr("y2", margin.top + height/3.2)
              .attr("stroke","black")

// PERCENTAGES
const perc = compare_svg.append("g")
                        .attr("transform", "translate(" + (2*width/2.7 + 10) + "," + margin.top + ")")
perc.append("text")
    .html("Percentage of L&D success&#8224;")
    .attr("font-weight", "bold")
    .attr("font-size", 24)
    .attr("y", 20)

// PERCENTAGE GAUGE TOP
const fill_t = perc.append("g")
           .attr("transform", "translate(0," + (margin.top + 15 + (height-margin.top)/2) +")")
           .attr("height", 250)
           .attr("width", 250)

fill_t.append("text")
      .attr("y", 10)
      .attr("font-size", 24)
      .text("Top performers' average")

fill_t.append("rect")
      .attr("transform", "translate(0, 30)")
       .attr("height", 50)
       .attr("width", 150)
       .attr("fill", "#f0f0f0")

fill_t.append("rect")
       .attr("transform", "translate(0, 30)")
       .attr("id", "fill_rect_tp")
       .attr("fill", "#31ab91")
       .attr("height", 50)
       .attr("width", user_choice.tp*1.5)

fill_t.append("rect")
      .attr("transform", "translate(0, 30)")
      .attr("x", 150)
      .attr("y", -5)
      .attr("width", 2)
      .attr("height", 60)

// text
fill_t.append("text")
      .attr("id", "tween_percent_tp")
      .attr("transform", "translate(0, 30)")
      .attr("x", 170)
      .attr("y", 40)
      .attr("font-size", 50)
      .text(user_choice.tp)

fill_t.append("text")
      .attr("transform", "translate(0, 30)")
      .attr("x", 230)
      .attr("y", 40)
      .attr("font-size", 50)
      //.attr("fill", "grey")
      .text("%")

// PERCENTAGE GAUGE AVERAGE
const fill_g = perc.append("g")
           .attr("transform", "translate( 0," + (margin.top + 25) +")")
           .attr("height", 250)
           .attr("width", 250)

fill_g.append("text")
      .attr("y", 10)
      .attr("font-size", 24)
      .text("2021 average")

fill_g.append("rect")
      .attr("transform", "translate(0, 30)")
       .attr("height", 50)
       .attr("width", 150)
       .attr("fill", "#f0f0f0")

fill_g.append("rect")
       .attr("transform", "translate(0, 30)")
       .attr("id", "fill_rect_avg")
       .attr("fill", "#31ab91")
       .attr("height", 50)
       .attr("width", user_choice.ld_ach*1.5)

fill_g.append("rect")
      .attr("transform", "translate(0, 30)")
      .attr("x", 150)
      .attr("y", -5)
      .attr("width", 2)
      .attr("height", 60)

// text
fill_g.append("text")
      .attr("id", "tween_percent_avg")
      .attr("transform", "translate(0, 30)")
      .attr("x", 170)
      .attr("y", 40)
      .attr("font-size", 50)
      .text(user_choice.ld_ach)

fill_g.append("text")
      .attr("transform", "translate(0, 30)")
      .attr("x", 230)
      .attr("y", 40)
      .attr("font-size", 50)
      //.attr("fill", "grey")
      .text("%")


// FUNCTION
const set_new_rank_data = function(choice) {
  d3.select(leader_rank_text).text(choice.leader)
  //d3.select(ld_rank_text).text(choice.ld_rank)

  d3.select("#fill_rect_avg").transition("fill_up_rect_avg").duration(1000).attr("width", choice.ld_ach*1.5)
  d3.select("#tween_percent_avg").transition()
      .tween("text", function() {
        var selection = d3.select(this);    // selection of node being transitioned
        var start = d3.select(this).text(); // start value prior to transition
        var end = choice.ld_ach;                     // specified end value
        var interpolator = d3.interpolateNumber(start,end); // d3 interpolator

        return function(t) { selection.text(Math.round(interpolator(t))) };  // return value

      }).duration(1000);

  d3.select("#fill_rect_tp").transition("fill_up_rect_tp").duration(1000).attr("width", choice.tp*1.5)
  d3.select("#tween_percent_tp").transition()
      .tween("text", function() {
        var selection = d3.select(this);    // selection of node being transitioned
        var start = d3.select(this).text(); // start value prior to transition
        var end = choice.tp;                     // specified end value
        var interpolator = d3.interpolateNumber(start,end); // d3 interpolator

        return function(t) { selection.text(Math.round(interpolator(t))) };  // return value

      }).duration(1000);

  d3.select("#selected_goal_compare_chart").text(choice.goal)
}
