//var url="http://127.0.0.1:5000/api";

function buildPlot(){
  d3.json('/api').then (function (data){
    country =[];
    corruption =[];
    GDP_per_capita=[];
    happiness_score=[];
    
    for (var i=0; i<data.length; i++){
      country.push(data[i].country);
      corruption.push(data[i],corruption);
      GDP_per_capita.push(data[i].life_expectency);
      happiness_score.push(data[i].happiness_score);
    };

data.forEach(function(data) {
      data.happiness_score = +data.happiness_score;
      data.corruption = +data.corruption;
      data.GDP_per_capita=+data.GDP_per_capita;  

    });

//svg and margin

var Width = 1500;
var Height =1500;
   
var margin = {
      top: 10,
      right: 20,
      bottom: 30,
      left: 500
};
    
var minBubblesSize = 5 , maxBubbleSize =50;

// var happiness_score = data.map(function(d){ return d.happiness_score});
// var corruption = data.map(function(d){ return d.corruption});
// var life_expectency = data.map(function(d){ return d.life_expectency});

//scaling 

var xScale = d3.scaleLinear()
      .domain([d3.min(happiness_score) , d3.max(happiness_score)])
      .range([0 ,Width]);

var yScale= d3.scaleLinear()
      .domain([d3.min(corruption) , d3.max(corruption)])
      .range([0 , Height]);

var color = d3.scaleOrdinal(d3.schemeCategory10);

var happiness_score = d3.scaleLinear()
      .domain(d3.extent(happiness_score))
      .range([minBubblesSize, maxBubbleSize]);

var corruption= d3.set(corruption).values();

var GDP_per_capita = d3.set(GDP_per_capita).values();
var happiness_score = d3.scaleOrdinal()
      .domain(happiness_score)
      .range(color.range());


var xAxis = d3.axisBottom(xScale);

var yAxis = d3.axisLeft(yScale);

// Create an SVG wrapper, append an SVG group that will hold our chart,
// and shift the latter by left and top margins.
var svg = d3.select("body")
  .append("svg")
  .attr("width", Width )
  .attr("height", Height)
.append("g")
  .attr("transform", "translate(0,0)");


var radiusScale = d3.scaleSqrt().domain([1 , 10]).range([10, 50])

//simulation is the collection of forces
//about where we want our circles to go
//and how we want our circles to interact
//creating the force ie forceX and forceY
//STEP 1:get them to the middle
//STEP2: don't have them collide!!
var forceX = d3.forceX(function(data){
  if(data.happiness_score > 2 && data.happiness_score < 5){
    return 300
  }else{
    return 1100
  }
}).strength(0.05)

var forceCollide=d3.forceCollide(function(d){
  return radiusScale(d.happiness_score)+2;
})



//simulation

var simulation = d3.forceSimulation()
  .force('x',forceX )  //.force('force name', definetheforce)
  .force('y', d3.forceY(Height/2).strength(0.05)) 
  .force('collide',forceCollide)



xScale.domain(d3.extent(data, function(d) { return d.corruption; })).nice();
yScale.domain(d3.extent(data, function(d) { return d.GDP_per_capita; })).nice();

console.log(data)


var circles=svg.selectAll(".data")
  .data(data)
  .enter().append("circle")
  .attr("class", "circle")
  .attr("r", function(d){
    return radiusScale(d.happiness_score)
  })
  .attr("cx", function(d) { return xScale(d.corruption); })
  .attr("cy", function(d) { return yScale(d.GDP_per_capita); })
  .style("fill", function(d) { return color(d.happiness_score); })
  .on('click',function(d){
    console.log(d)
  })



  // var text = svg.selectAll("text")
  //                       .data(data)
  //                       .enter()
  //                       .append("text");

  
  // var textLabels = text
  //                .attr("x", function(d) { return  xScale(d.corruption); })
  //                .attr("y", function(d) { return yScale(d.GDP_per_capita); })
  //                .text( function (d) { return d.country; })
  //                .attr("font-family", "sans-serif")
  //                .attr("font-size", "20px")
  //                .attr("fill", "red");
  

var toolTip = d3.tip()
  .attr("class", "tooltip")
  .offset([80, -60])
  .html(function(d) {
    return (`${d.country}${d.corruption}<br>GDP_per_capita: ${d.GDP_per_capita}<br>happiness_score: ${d.happiness_score}`);
  });
svg.call(toolTip);

 // Step 8: Create event listeners to display and hide the tooltip
    // ==============================
  circles.on("mouseenter", function(data) {
      toolTip.show(data, this);
    })
      // onmouseout event
      .on("mouseout", function(data, index) {
        toolTip.hide(data);
      });




      

d3.select('#corruption').on('click',function(){
  simulation
    .force('x', forceX)
    .alphaTarget(0.2)
    .restart()
  //console.log('You Clicked me')
})




d3.select('#combine').on('click',function(){
  simulation
    .force('x', d3.forceX(Width/2).strength(0.05))
    .alphaTarget(0.2)
    .restart()
  //console.log('combine')
})




simulation.nodes(data)
  .on('tick',ticked)

function ticked(){
  circles
    .attr('cx',function(d){
      return d.x
    })
    .attr('cy',function(d){
      return d.y
    })
}



  });
};

buildPlot()

