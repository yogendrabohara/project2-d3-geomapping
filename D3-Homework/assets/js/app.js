// The code for the chart is wrapped inside a function
// that automatically resizes the chart
function makeResponsive() 
{
  // if the SVG area isn't empty when the browser loads, remove it
  // and replace it with a resized version of the chart
  let svgArea = d3.select("body").select("svg");
  if (!svgArea.empty()) 
  {
    svgArea.remove();
  }

  // Define SVG area dimensions
  let svgWidth = 1200;
  let svgHeight = 600;

  // Define the chart's margins as an object
  let margin = 
  {
    top: 50,
    right: 50,
    bottom: 50,
    left: 50
  };

  // Define dimensions of the chart area
  let height = svgHeight - margin.top - margin.bottom;
  let width = svgWidth - margin.left - margin.right;

  // Select scatter, append SVG area to it, and set the dimensions
  let svg = d3.select("#scatter")
  .append("svg")
  .attr("height", svgHeight)
  .attr("width", svgWidth);

  // Append a group to the SVG area and shift ('translate') it to the right and to the bottom
  let chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

  // Load data from data.csv
  d3.csv("data.csv", function(error, data) 
  {
    if (error) throw error;

    // Cast the poverty and health insurance values to a number for each piece of data
    data.forEach(function(d) 
    {
      d.poverty = +d.poverty;
      d.noHealthInsurance = +d.noHealthInsurance;
    });

    // Configure a band scale for the horizontal axis with a padding of 0.5 (50%)
    let xBandScale = d3.scaleLinear()
    .domain([d3.min(data, d => d.poverty) - 1, d3.max(data, d => d.poverty + 1)])
    .range([0, width]);

    // Create a linear scale for the vertical axis.
    let yLinearScale = d3.scaleLinear()
    .domain([d3.min(data, d => d.noHealthInsurance) - 1, d3.max(data, d => d.noHealthInsurance) + 1])
    .range([height, 0]);

    // Create two new functions passing our scales in as arguments
    // These will be used to create the chart's axes
    let bottomAxis = d3.axisBottom(xBandScale).ticks(8);
    let leftAxis = d3.axisLeft(yLinearScale).ticks(12);

    // Cast the age value to a number for each piece of data
    data.forEach(function(d) 
    {
      d.poverty = +d.poverty;
      d.noHealthInsurance = +d.noHealthInsurance;
    });

    // x-axis
    chartGroup.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(bottomAxis)
    .append("text")
    .attr("y", height - 465)
    .attr("x", width / 2)
    .attr("text-anchor", "end")
    .attr("stroke", "black")
    .text("In Poverty (%)");

    // y-axis
    chartGroup.append("g")
    .attr("class", "y axis")
    .call(leftAxis)
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 15)
    .attr("dy", "-5.1em")
    .attr("x", "-200")
    .attr("text-anchor", "end")
    .attr("stroke", "black")
    .text("Lacks Healthcare (%)");

    // draw dots
    chartGroup.selectAll(".dot")
    .data(data)
    .enter().append("circle")
    .attr("class", "dot")
    .attr("r", 10.5)
    .transition()
    .duration(1000)
    .attr("cx", d => xBandScale(d.poverty))
    .attr("cy", d => yLinearScale(d.noHealthInsurance));
    
    // add labels
    chartGroup.selectAll(".text")
    .data(data)
    .enter().append("text")
    .transition()
    .duration(1000)
    .attr("x", d => xBandScale(d.poverty) - 7)
    .attr("y", d => yLinearScale(d.noHealthInsurance) + 3)
    .text(function(d) { return d.abbr; })
    .attr("font-size", "10px");

    // chartGroup.selectAll(".dot")
    // .data(data)
    // .on('mouseover', function(d) 
    // {
    //   tip.html(d["state"] + "<br/>" + "Poverty: " + d.poverty + "%"
    //   + "<br/>" + "No Healthcare: " + d.noHealthInsurance + "%");
    // })
    // .on("mouseover", tip.show)
    // .on('mouseout', tip.hide);

    let toolTip = d3.select("body").append("div").attr("class", "tooltip");
    chartGroup.on("mouseover", function(d, i) 
    {
      toolTip.style("display", "block");
      // toolTip.html(`Pizzas eaten: <strong>yup</strong>`)
      //   .style("left", d3.event.pageX + "px")
      //   .style("top", d3.event.pageY + "px");
      console.log("yo");
    })
    // Step 3: Add an onmouseout event to make the tooltip invisible
    .on("mouseout", function() 
    {
      toolTip.style("display", "none");
    });
  });
}

// When the browser loads, makeResponsive() is called.
makeResponsive();

// When the browser window is resized, responsify() is called.
d3.select(window).on("resize", makeResponsive);