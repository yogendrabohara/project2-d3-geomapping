//var url="http://127.0.0.1:5000/api";

function buildPlot() {
    d3.json("/api").then(function(data) {
    
     // Grab values from the data json object to build the plots
     //console.log(data);
     happiness_score = [];
     //freedom=[];
     //family=[];
     //happiness_rank=[];
     //life_expectency=[];
     country=[];
     //dystopia_residual=[];
     //generosity=[];
     corruption=[];

     for(var i=0; i<data.length; i++){
         country.push(data[i].country);
         corruption.push(data[i].corruption);
         happiness_score.push(data[i].happiness_score);
         //family.push(data[i].family);
         //happiness_rank.push(data[i].happiness_rank);
         //life_expectency.push(data[i].life_expectency);
         //country.push(data[i].country);
         //dystopia_residual.push(data[i].dystopia_residual);
         //generosity.push(data[i].generosity);
         //corruption.push(data[i].corruption);
      }

      console.log(happiness_score)
      console.log(corruption)

      var margin = {top: 20, right: 60, bottom: 100, left: 100},
    width = 1200;
    height = 800;

var x = d3.scaleLinear()
    .range([0, width]);

var y = d3.scaleLinear()
    .range([height, 0]);

var color = d3.scaleOrdinal(d3.schemeCategory10);

var xAxis = d3.axisBottom(x);

var yAxis = d3.axisLeft(y);

var svg = d3.select("body")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var radiusScale = d3.scaleSqrt().domain([1 , 10]).range([10, 50])

  data.forEach(function(d) {
    d.happiness_score = +d.happiness_score;
    d.corruption = +d.corruption;
  });

  x.domain(d3.extent(data, function(d) { return d.corruption; })).nice();
  y.domain(d3.extent(data, function(d) { return d.happiness_score; })).nice();

  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
      .append("text")
      .attr("class", "label")
      .attr("x", width)
      .attr("y", -6)
      .style("text-anchor", "end")
      .text("Sepal Width (cm)");

  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("class", "label")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Sepal Length (cm)")

  svg.selectAll(".dot")
      .data(data)
    .enter().append("circle")
      .attr("class", "dot")
      .attr("r", function(d){
        return 1.5*radiusScale(d.GDP_per_capita)
        
      })
      .attr("cx", function(d) { return x(d.corruption); })
      .attr("cy", function(d) { return y(d.happiness_score); })
      .style("fill", function(d) { return color(d.country); })
      .attr("opacity","0.5");

  var toolTip = d3.tip()
      .attr("class", "tooltip")
      .offset([40, 100])
      .html(function(data) {
        return (`country:${d.country}<br>happiness_score: ${d.happiness_score}<br>corruption: ${d.corruption}`);
      });
  svg.call(toolTip);
    
     // Step 8: Create event listeners to display and hide the tooltip
        // ==============================
  svg.on("mouseover", function(data) {
          toolTip.show(data, this);
        })
          // onmouseout event
  .on("mouseout", function(data, index) {
            toolTip.hide(data);
          });




  
  svg.append("text")
    .attr("transform", `translate(${width / 2}, ${height + margin.top + 20})`)
    .attr("text-anchor", "middle")
    .attr("font-size", "40px")
    .attr("fill", "black")
    .text("Corruption ");
  

    svg.append('g')
    .attr('class', 'y axis')
    .call(yAxis)
    .append('text')
    .attr('transform', 'rotate(-90)')
    .attr('y', 15)
    .attr('dy', '-5.1em')
    .attr('x', '-200')
    .attr('text-anchor', 'end')
    .attr('stroke', 'black')
    .text('Happiness Score')
    .attr("font-size",'20px');

// text label for the y axis
 svg.append("text")
   .attr("transform", `translate(${height / 2}, ${height + margin.top + 40})`)
   .attr("y", function(d) { return y(d.happiness_score);})
   .attr("x",function(d) { return x(d.corruption); })
   .attr("font-size",'40px')
   .attr("dy", "1em")
   .style("text-anchor", "middle")
   .text("Happiness Score");      

  var legend = svg.selectAll(".legend")
      .data(color.domain())
    .enter().append("g")
      .attr("class", "legend")
      .attr("transform", function(d, i) { return "translate(10," + i * 20 + ")"; });

  legend.append("rect")
      .attr("x", width - 18)
      .attr("width", 18)
      .attr("height", 18)
      .style("fill", color);

  legend.append("text")
      .attr("x", width - 24)
      .attr("y", 9)
      .attr("dy", ".35em")
      .style("text-anchor", "end")
      .text(function(d) { return d; });


});

};


buildPlot()
     
  







































/*
var scale = d3.scaleLinear()
    .domain([-maxExtent, maxExtent])
    .range([0, graphWidth]);*/

//adding horizontal gridlines and vertical gridlines
/*
var yGridlinesAxis = svg.axis().scale(scale).orient('left');
var yGridlinesNodes = svg.append('g')
    .attr('transform','translate('+(margin.left + graphWidth)
                      +','+margin.top + ')')
    .call(yGridlinesAxis
          .tickSize(graphWidth + axisPadding , 0 ,0)
          .tickFormat(""));
styleGridlineNodes(yGridlinesNodes);

var xGridlinesAxis = svg.axis().scale(scale).orient('bottom');
var xGridlinesNodes = svg.append('g')
    .attr('transform','translate('+ margin.left + ',' +
          (totalHeight - margin.bottom +axisPadding)+ ')')
                      
    .call(yGridlinesAxis
          .tickSize(-graphWidth - axisPadding , 0 ,0)
          .tickFormat(""));
styleGridlineNodes(xGridlinesNodes);*/

//performing styling on the axis
/*
function styleGridlineNodes(axisNodes){
  axisNodes.selectAll('.domain')
      .attr({
        fill: 'none',
        stroke: 'none'
      });
  axisNodes.selectAll('.tick line')
  .attr({
    fill:'none',
    'stroke-width':1,
    stroke : 'lightgray'

  })
}*/
