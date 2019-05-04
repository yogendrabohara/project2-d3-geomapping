

function buildPlot() {
    d3.json("/api").then(function(data) {
    
     // Grab values from the data json object to build the plots
     //console.log(data);
     happiness_score = [];
     freedom=[];
     family=[];
     happiness_rank=[];
     life_expectency=[];
     country=[];
     dystopia_residual=[];
     generosity=[];
     corruption=[];
     

     for(var i=0; i<data.length; i++){
         happiness_score.push(data[i].happiness_score);
         freedom.push(data[i].freedom);
         family.push(data[i].family);
         happiness_rank.push(data[i].happiness_rank);
         life_expectency.push(data[i].life_expectency);
         country.push(data[i].country);
         dystopia_residual.push(data[i].dystopia_residual);
         generosity.push(data[i].generosity);
         corruption.push(data[i].corruption);
         
         


     };
console.log(happiness_score);
console.log(freedom);
console.log(family);
console.log(happiness_rank);
console.log(life_expectency);
console.log(country);
console.log(dystopia_residual);
console.log(generosity);
console.log(corruption);

var trace1 = {
       type: "scatter",
       mode: "markers",
       name: name,
       x: data.map(row => row.happiness_rank),
       y: data.map(row =>row.happiness_score),
       line: {
         color: "#17BECF",
         symbol:"hexagram"
       }
     };

var trace2 = {
      type: "scatter",
      mode: "markers",
      type:"scatter",
      name: "life_expectency",
      x: data.map(row => row.happiness_rank),
      y: data.map(row =>row.life_expectency),
      marker: {
        color: "orange",
        symbol:"diamond-x"
      }
    };


    
     var data = [trace1,trace2];
    
     var layout = {
       title: `Happiness Rank Vs Happiness_score`,
       xaxis: {
         type:"linear",
         title:"Happiness Rank",
         autorange: true,
       },
       yaxis: {
         title:"Life Expectency",
         autorange: true,
         type: "linear"
       }
     };
    
      Plotly.newPlot("plot", data, layout);
    
    });
    }


    
buildPlot();



